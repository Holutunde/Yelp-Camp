var express = require('express'),
  router = express.Router({ mergeParams: true }),
  Campground = require('../models/campground'),
  Comment = require('../models/comment')

//COMMENTS ROUTE

//Comments New
router.get('/new', isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', { campground: campground })
    }
  })
})

//Comments Create
router.post('/', isLoggedIn, function (req, res) {
  //lookup campground using id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      var author = {
        id: req.user._id,
        username: req.user.username,
      }
      var comment = req.body.comment
      var newDetails = { author: author, comment: comment }
      Comment.create(newDetails, function (err, comment) {
        if (err) {
          console.log(err)
        } else {
          //Add username and id to comment
          // comment.author.id = req.user._id
          // comment.author.username = req.user.username
          //save comment
          // comment.save()
          campground.comments.push(comment)
          campground.save()
          res.redirect('/campgrounds/' + campground._id)
        }
      })
    }
  })
})

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login')
  }
}

module.exports = router
