const express = require('express');
const cors = require('cors');
const ArticleInfo = require('./src/model/BlogDB');
const UserInfo  = require('./src/model/User');

const app = express();
app.use(cors());

// Post Method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const path = require('path')
app.use(express.static('./build/'));
// Basic Article Fetch Route
app.get('/api/article/:name', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try {
        const articleName = req.params.name;
        ArticleInfo.findOne({ name: articleName })
            .then(function (article) {
                res.status(200).json(article);
            })
    }
    catch (error) {
        res.status(500).json({ message: 'Error', eroor });
    }
});

// Upvotes Routing
app.post('/api/article/:name/upvotes', (req, res) => {
    const articleName = req.params.name;
    const filter = { name: articleName };
    const update = { $inc: { upvotes: 1 } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})

// Comments Routing
app.post('/api/article/:name/comments', (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;
    const filter = { name: articleName };
    const update = { $push: { comments: { username, text } } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})


app.post("/api/signup",async(req,res)=>{
    try{
        UserInfo.find({email:req.body.email},(err,data)=> {
        if(data.length==0){

        let user=new UserInfo({ username: req.body.username, 
        email: req.body.email,
        password: req.body.password })

        let result= user.save( (err,data)=>{
        if(err){
            res.json({status:'error happened'})
        }
        else{
            res.json({status:'success'})
        }
    })}
    else{
        res.json({status:'email id already exists'})
    }
})}
    catch(error)
    {
        res.json({status:'error'})
    }
})

//Login user check
app.post('/api/login', async (req, res) => {
        // const articleName = req.params.name;
        const user = await UserInfo.findOne({ username:req.body.username,
            password:req.body.password })
        const isadmin = req.body.admincheck;
            
        console.log(user);
        if (user){
            return res.json({user:true})
        }
        else{
            return res.json({user:false})
        }
});






app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'))
   });

//Port number
app.listen(process.env.PORT || 5000, ()=>{
    console.log("Listening on port 5000");
});
