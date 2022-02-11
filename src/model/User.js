const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://reshmaer:Reshma1992@cluster0.fywmm.mongodb.net/article_details?retryWrites=true&w=majority');
const Schema = mongoose.Schema;



var userSchema = new Schema({
    username:String,
    password:String,
    email:String,
    isadmin:Boolean
})

//create a model(collection, schema)
var UserInfo = mongoose.model('users', userSchema);

//export model
module.exports = UserInfo;