const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    id:{type:String,required:true , unique:true},
    username:{type:String},
    designation:{type:String}
});  

module.exports=mongoose.model('User',UserSchema);