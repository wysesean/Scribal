let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Category = require('../db/schema.js').Category
let Course = require('../db/schema.js').Course
let Video = require('../db/schema.js').Video
let Clips = require('../db/schema.js').Clips

  
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
  .post('/course/addToCategory/:_categoryId', function(req, res){
    
    Category.findById(req.params._categoryId, function(err, results){
      if(err) return res.json(err)

      let newCourse = new Course(req.body)
      newCourse.categoryInfo = results._id

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

  .get('/course/:_id', function(req, res){
    console.log(req.params._id)
    Course.findById(req.params._id, function(err, results){
      if(err || !results) return res.json(err)
      res.json(results)
    }).populate('categoryInfo')
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

//Posting a video also uploads the video to cloudinary. 
//A refrence is 
//Posting videos also creates 15second segmented clips of the video
apiRouter
  .post('/video', function(req, res){
    let newVideo = new Video(req.body)

    //TO DO, SEGMENT TO CLIPS



    newVideo.save((err, videoRecord)=>{
      if(err) return res.status(500).json(`Problem adding video to database`)
      res.json(videoRecord)
    })
  })

  .get('/video', function(req, res){
    Video.find(req.query, function(err, results){
      if(err) return res.json(err) 
      res.json(results)
    })
  })

  .put('/video/:_id', function(req, res){
    Video.findByIdAndUpdate(req.params._id, req.body, function(err, record){
      if (err) {
        res.status(500).send(err)
      }
      else if (!record) {
        res.status(400).send('no video record found with that id')
      }
      else {
        res.json(Object.assign({},req.body,record))
      }

    })
  })

  .delete('/video/:_id', function(req, res){
    Video.remove({_id:req.params._id}, (err)=>{
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

      Model.findOne().skip(random).exec(
        function (err, result) {
        if(err) return res.json(err) 
        res.json(result)
      }).populate('videoId')
    })
  })



module.exports = apiRouter