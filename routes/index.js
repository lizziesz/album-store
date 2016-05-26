var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('albums').then(function(albums){
    res.render('index', { albums: albums });
  })
});

router.post('/add-new-album', function(req, res, next){
  knex('albums').insert(req.body, 'id').then(function(data){
    res.redirect('/');
  });
})

router.get('/:id/edit', function(req, res, next){
  knex('albums').where('id', req.params.id).then(function(album){
    console.log(album);
    res.render('edit', {album: album[0]});
  })
});

router.post('/:id/edit', function(req, res, next){
  knex('albums').where('id', req.params.id).update(req.body).then(function(){
    res.redirect('/');
  });
});

router.get('/:id/delete', function(req, res, next){
  knex('albums').where('id', req.params.id).delete().then(function(){
    res.redirect('/');
  });
})


module.exports = router;
