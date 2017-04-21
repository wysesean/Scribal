let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

//--------------
//MODELS
//--------------
let User = require('../db/schema.js').User
let Enrollment = require('../db/schema.js').Enrollment
let Category = require('../db/schema.js').Category
let Course = require('../db/schema.js').Course
let Lecture = require('../db/schema.js').Lecture
let Clips = require('../db/schema.js').Clips
let Transcription = require('../db/schema.js').Transcription

let UTIL = require('./UTIL.js')
//-----------------------------------
// USER ROUTES
//-----------------------------------
apiRouter
  .get('/users', function(req, res){
    User.find(req.query , "-password", function(err, results){
      if(err) return res.json(err) 
      res.json(results)
    })
  })

  .get('/users/:_id', function(req, res){
    User.findById(req.params._id, "-password", function(err, record){
      if(err || !record ) return res.json(err) 
      res.json(record)
    }).populate({path:'coursesSelected'})
  })
  .put('/users/:_id', function(req, res){
    User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
        if (err) {
          res.json(err)
        }
        else if (!record) {
          res.status(400).send('no record found with that id')
        }
        else {
          res.json(Object.assign({},req.body,record))
        }
    })
  })

  .delete('/users/:_id', function(req, res){
    User.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })  
  })

//-----------------------------------
//ENROLLMENT ROUTES
//-----------------------------------
apiRouter
  .post('/users/enrollment', function(req, res){
    Enrollment.find({userInfo:req.body.userInfo,courseInfo:req.body.courseInfo}, function(err, results){
    	console.log(results)
      if(err||results.length>0) return res.status(500).json('User already enrolled in course')      
      
      let newEnrolled = new Enrollment(req.body)
      newEnrolled.save((err, enrollmentRecord)=>{
        if(err) return res.status(500).json('Problem adding enrollment to database')
        res.json(enrollmentRecord)
      })
    })
  })
  //Logs videos watched by user
  .put('/users/:_userId/lecture/:_lectureId/watched', function(req, res){
		Lecture.findById(req.params._lectureId, function(err, lectureResults){
			if(err||!lectureResults) return res.json(err)

			Enrollment.find({userInfo:req.params._userId,courseInfo:lectureResults.courseInfo}, function(err, results){
				if(err||!results) return res.status(500).json('Error finding user')
				results[0].lecturesWatched.push(req.params._lectureId)
				results[0].save((err, record)=>{
					if(err) return res.status(500).json('Problem saving watched record')
					res.json(record)
				})
			})
		})
  })

  .delete('/users/:_userId/enrollment/:_courseId', function(req, res){
    Enrollment.remove({userInfo:req.params._userId, courseInfo:req.params._courseId}, (err)=>{
      if(err) return res.json(err)
      res.json({
        msg: `user: ${req.params._userId} successfully unenrolled from ${req.params._courseId}`,
      })
    })
  })

  .get('/users/:_id/enrollment', function(req, res){
    Enrollment
      .find({userInfo:req.params._id},'-password', function(err, results){
        if(err||!results) return res.json(err)
      })
      .populate('courseInfo')
      .populate('userInfo')
      .populate(
        {
          path:'lecturesWatched',
          model:'Lecture'     
      })
      .exec((err, result)=>{
        res.json(result)
      })
  })

  
//-----------------------------------
//CATEGORY ROUTES
//-----------------------------------
apiRouter
  .post('/category', function(req, res){
    let newCategory = new Category(req.body)
    newCategory.save((err, categoryRecord)=>{
      if(err) return res.status(500).json(`Problem adding category to database`)
      res.json(categoryRecord)
    })
  })

  .get('/category', function(req, res){
    Category.find(req.query, function(err, results){
      if(err) return res.json(err) 
      res.json(results)
    })
  })

  .get('/category/:_id', function(req, res){
    Category.findById(req.params._id, function(err, results){
      if(err || !results) return res.json(err)
      res.json(results)
    })
  })

  .get('/category/:_categoryId/course', function(req, res){
    Course.find({categoryInfo:req.params._categoryId}, function(err, results){
      if(err || !results) return res.json(err)
      res.json(results)
    }).populate('categoryInfo')
  })

  .put('/category/:_id', function(req, res){
    Category.findByIdAndUpdate(req.params._id, req.body, function(err, record){
      if (err) {
        res.status(500).send(err)
      }
      else if (!record) {
        res.status(400).send('no category record found with that id')
      }
      else {
        res.json(Object.assign({},req.body,record))
      }

    })
  })

  //TO DO OVERHAUL THIS
  .delete('/category/:_id', function(req, res){
    Category.remove({_id:req.params._id}, (err)=>{
      if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
    })
  })

//-----------------------------------
//COURSE ROUTES
//-----------------------------------

apiRouter
  .post('/course', function(req, res){
    
    Category.findById(req.body.categoryId, function(err, results){
      if(err) return res.json(err)

      let newCourse = new Course(req.body)
      newCourse.save((err, courseRecord)=>{
        if(err) return res.status(500).json(`Problem adding course to database`)
        res.json(courseRecord)
      })
    })
  })

  .get('/course', function(req, res){
    Course.find(req.query, function(err, results){
      if(err) return res.json(err) 
      res.json(results)
    }).populate('categoryInfo')
  })

  .get('/course/:_courseId/lecture', function(req, res){
    Lecture.find({courseInfo:req.params._courseId}, function(err, results){
      if(err || !results) return res.json(err)
      res.json(results)
    }).populate('courseInfo')
  })

  .put('/course/:_id', function(req, res){
    Course.findByIdAndUpdate(req.params._id, req.body, function(err, record){
      if (err) {
        res.status(500).send(err)
      }
      else if (!record) {
        res.status(400).send('no course record found with that id')
      }
      else {
        res.json(Object.assign({},req.body,record))
      }

    })
  })
  
  //TO DO, OVER HAUL THIS
  .delete('/course/:_id', function(req, res){
    Course.remove({_id:req.params._id}, (err)=>{
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })
  })

//-----------------------------------
//VIDEO ROUTES
//-----------------------------------

//Posting a lecture also uploads it to cloudinary then 
//Posting lectures also creates 7second segmented clips of the lecture with a matching set that is at a 2 second offset
apiRouter
  .post('/lecture', function(req, res){
    let segmentLength = 7,
        segmentOffset = 2,
        newLecture = new Lecture(req.body)
    
    //Creates clips for a video
    for(let i=0; i<newLecture.videoLength; i+=segmentLength){
      let newClip = new Clips({
        set1:{
          startingOffset: i,
          endingOffset: i+segmentLength,
        },
        set2:{
          startingOffset: i+segmentOffset,
          endingOffset: i+segmentLength+segmentOffset,
        },
        clipIndex: i/segmentLength,
        lectureInfo: newLecture._id
      })
      newClip.save((err, clipRecord)=>{
        if(err) return res.status(500).json(`Problem creating and adding clips to database`)
      })
    }
    newLecture.save((err, lectureRecord)=>{
      if(err) return res.status(500).json(`Problem adding lecture to database`)
      res.json(lectureRecord)
    })

  })

  .get('/lecture', function(req, res){
    Lecture.find(req.query, function(err, results){
      if(err) return res.json(err) 
      res.json(results)
    })
  })

  .get('/lecture/:_id', function(req, res){
    Lecture.findById(req.params._id, function(err, results){
      if(err || !results) return res.json(err)
      res.json(results)
    }).populate('courseInfo')
  })
  

  //TO DO
  .get('/lecture/:_id/getTranscription', function(req, res){
    Clips
        .find({lectureInfo:req.params._id}, function(err, results){
            if(err || !results) return res.json(err)
        })
        .sort({clipIndex:'asc'})
        .exec(function(err,results){
            if (err) return res.json(err)
            let transcription = {
                lectureID: Clips.lectureInfo,
                transcriptionCollection:[],
                //TO DO
                //percentComplete: %
                //confidence: %
            }
            results.forEach((singleElement)=>{
                let str1Best = UTIL.lowestDistance(singleElement.set1.transcriptionCollection),
                    str2Best = UTIL.lowestDistance(singleElement.set2.transcriptionCollection),
                    joined = UTIL.stringJoiner(str1Best, str2Best),
                    confidence = (UTIL.averageSimilarity(singleElement.set1.transcriptionCollection, str1Best)+
                                  UTIL.averageSimilarity(singleElement.set2.transcriptionCollection, str2Best))/2
                    if(!confidence){
                      confidence = 0
                    }
                    transcription.transcriptionCollection.push({
                        transcriptionIndex: singleElement.clipIndex,
                        startingOffset: singleElement.set1.startingOffset,
                        endingOffset: singleElement.set1.endingOffset,
                        transcription: joined,
                        clipConfidence: confidence
                    })
            })
            let totalConfidence = 0
            let completion = 0
            transcription.transcriptionCollection.forEach((el)=>{
              totalConfidence += el.clipConfidence
              if(el.transcription){
                ++completion
              }
            })
            transcription.confidence = totalConfidence/transcription.transcriptionCollection.length
            transcription.completion = completion/transcription.transcriptionCollection.length
            res.json(transcription)
        })
  })

  .put('/lecture/:_id', function(req, res){
    Lecture.findByIdAndUpdate(req.params._id, req.body, function(err, record){
      if (err) {
        res.status(500).send(err)
      }
      else if (!record) {
        res.status(400).send('no lecture record found with that id')
      }
      else {
        res.json(Object.assign({},req.body,record))
      }

    })
  })
  //TO DO OVERHAUL THIS
  .delete('/lecture/:_id', function(req, res){
    Lecture.remove({_id:req.params._id}, (err)=>{
      if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
    })
  })

//-----------------------------------
//CLIPS ROUTES
//-----------------------------------

//getRandomClip, counts the amount of clips that are available, selects a random one of those clips.
apiRouter
  .get('/clips/getRandomClip', function(req, res){
    Clips.count().exec(function(err, count){

      var random = Math.floor(Math.random() * count)

      Clips
        .findOne()
        .skip(random)
        .populate('lectureInfo')
        .exec(
            function (err, result) {
                if(err) return res.json(err) 
                res.json(result)
            }
        )
    })
  })

  .get('/clips/:_id', function(req, res){
    Clips.findById(req.params._id, function(err, results){
      if(err || !results) return res.json(err)
      res.json(results)
    }).populate('lectureInfo')
  })

  .put('/clips/:_id', function(req, res){
    Clips.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no category record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
    })
  })



module.exports = apiRouter