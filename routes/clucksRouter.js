const express = require('express')
const router = express.Router()
const knex = require('../db/client')

router.get('/',(req,res)=>{
    knex('clucks')
    .orderBy('created_at','desc')
    .then((clucks)=>{
        res.render('clucks/index',{clucks: clucks})
    })
})

router.get('/index',(req,res)=>{
    knex('clucks')
    .orderBy('created_at','desc')
    .then((clucks)=>{
        res.render('clucks/index',{clucks: clucks})
    })
})


router.post('/new',(req,res)=>{
    res.render("clucks/new")
})

router.post('/',(req,res)=>{
    knex('clucks')
    .insert({
        username: req.cookies.username,
        content: req.body.content,
        image_url: req.body.image_url
    })
    .then(()=>{
        res.redirect('/')
    })
})




module.exports = router