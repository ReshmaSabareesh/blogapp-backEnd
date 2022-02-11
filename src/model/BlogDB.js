const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://reshmaer:Reshma1992@cluster0.fywmm.mongodb.net/article_details?retryWrites=true&w=majority');
const Schema = mongoose.Schema;


var articleSchema = new Schema({
    name:String,
    title:String,
    description:String,
    username : String,
    upvotes : Number,
    comments : Array
})

var ArticleInfo = mongoose.model('articles', articleSchema);

module.exports = ArticleInfo;