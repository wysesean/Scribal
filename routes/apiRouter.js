let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Category = require('../db/schema.js').Category
let Course = require('../db/schema.js').Course
let Lecture = require('../db/schema.js').Lecture
let Clips = require('../db/schema.js').Clips

let UTIL = require('./UTIL.js').UTIL
  
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
    let segmentLength = 10
    let newLecture = new Lecture(req.body)
    
    for(let i=0; i<newLecture.videoLength; i+=segmentLength){
      console.log('creating clip')
      let newClip = new Clips({
        startingOffset: i,
        endingOffset: i+segmentLength,
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
  
  .get('/lecture/:_id/transcription', function(req, res){

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

      Clips.findOne().skip(random).populate('lectureInfo').exec(
        function (err, result) {
        if(err) return res.json(err) 
        res.json(result)
      })
    })
  })

  .get('/clips/:_id', function(req, res){
    Clips.findById(req.params._id, function(err, results){
      if(err || !results) return res.json(err)
      res.json(results)
    }).populate('lectureInfo')
  })

  .put('/clips/:_id/', function(req, res){
    console.log(req.params._id)
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