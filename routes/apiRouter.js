let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

//--------------
//MODELS
//--------------
let User = require('../db/schema.js').User
let Category = require('../db/schema.js').Category
let Course = require('../db/schema.js').Course
let Lecture = require('../db/schema.js').Lecture
let Clips = require('../db/schema.js').Clips

let UTIL = require('./UTIL.js')
let vtt = require('./vtt.js')
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
    })
  })
  .put('/users/:_id', function(req, res){

    User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
        if (err) {
          res.status(500).send(err)
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

  .get('/category/:_categoryId/course/', function(req, res){
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
  .post('/course/', function(req, res){
    
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

  .get('/course/:_courseId/lecture/', function(req, res){
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

//Posting a lecture also uploads the lecture to cloudinary. 
//A refrence is 
//Posting lectures also creates 15second segmented clips of the lecture

apiRouter
  .post('/lecture', function(req, res){
    console.log('posting lecture')
    let segmentLength = 7,
        segmentOffset = 2,
        newLecture = new Lecture(req.body)
    
    //Creates clips for a video
    for(let i=0; i<newLecture.videoLength; i+=segmentLength){
      console.log('creating clip')
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
  .get('/lecture/:_id/transcription', function(req, res){
    Clips
        .find({lectureInfo:req.params._id}, function(err, results){
            if(err || !results) return res.json(err)
        })
        .sort({clipIndex:'asc'})
        .exec(function(err,results){
            if (err) return res.json(err)
           

            //Inserts a new line at 30 length segments, doesn't break strings
            function overFlowString(str){
                let strArr = str.split(' '),
                    counter = 0,
                    segmentLength = 30
                    
                for(let i=0; i<strArr.length; i++){
                    if(counter < segmentLength){
                        counter += strArr[i].length
                    }
                    else{
                        //adds a new line to the beginning of the word
                        strArr[i] = strArr[i].replace(/^/,'\r\n')
                        counter = 0
                    }
                }
                return strArr.join(' ')
            }

            //Pads numbers with 0s to fit webvtt format if needed
            function pad(num){
                num = num < 10 ? '0' + num : num
                return num
            }

            //Converts seconds to 00:00:00.000 format
            function secondsToTime(sec){
                var seconds = (sec%60).toFixed(3),
                    minutes = Math.floor(sec / 60) % 60,
                    hours = Math.floor(sec / 60 / 60)   
                return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
            }

            //Generates a string that can be used in a vtt file
            function vtt(){
                var counter = 0,
                    content = 'WEBVTT\r\n'
                this.add = (startingOffset, endingOffset, line)=>{
                    ++counter
                    content += `\n\r${counter}\r\n${secondsToTime(startingOffset)} --> ${secondsToTime(endingOffset)} \r\n${overFlowString(line)}`
                }
                this.toString = function(){
                    return content
                }
            }
            
            var v = new vtt()

            results.forEach((singleElement)=>{
                let str1Best = UTIL.lowestDistance(singleElement.set1.transcriptionCollection),
                    str2Best = UTIL.lowestDistance(singleElement.set2.transcriptionCollection),
                    joined = UTIL.stringJoiner(str1Best, str2Best)
                v.add(singleElement.set1.startingOffset, singleElement.set1.endingOffset, joined)
            })
            console.log()
            res.json(v.toString())
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

  .put('/clips/:_id/', function(req, res){
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