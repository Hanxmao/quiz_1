const express = require("express")
const app = express()
const path = require("path")
const knex = require("./db/client")

//set view engine& views directory
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

//--------------set up middleware------------
//morgan
const logger = require('morgan')
app.use(logger('dev'))

//urlencoded & methodOverride
app.use(express.urlencoded({extended:true}))
const methodOverride = require('method-override')
app.use(methodOverride((req,res)=>{
    if(req.body&&req.body._method){
        const method = req.body._method
        return method
    }
}))

//static assets
app.use(express.static(path.join(__dirname, 'public')))

//cookieParser
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use((req,res,next)=>{
    const username = req.cookies.username
    res.locals.username = username
    next()
})

//---------------routers----------------
app.post('/sign_in',(req,res)=>{
    
    res.render('sign_in')
})

app.get('/', (req,res)=>{
    knex('clucks')
    .orderBy('created_at','desc')
    .then((clucks)=>{
        res.render('clucks/index',{clucks: clucks})
    })
})


app.post('/login',(req,res)=>{
    const username = req.body.username
    res.cookie('username', username)
    res.redirect('/')
})



app.post('/logout', (req,res)=>{
    res.clearCookie('username')
    res.redirect('/')
})


//--------------clucks Router()------
const clucksRouter = require('./routes/clucksRouter')
app.use('/clucks',clucksRouter)






//---------------start server------------
const PORT = 8080
const DOMAIN = 'localhost'
app.listen(PORT,DOMAIN,()=>{
    console.log(`Listening on ${DOMAIN}:${PORT}`);
})