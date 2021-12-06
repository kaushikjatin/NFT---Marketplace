const mongoose=require('mongoose');
const notesSchema={
    cid1:String,
    count:Number,
}
const Note=mongoose.model('Note',notesSchema);
module.exports=Note;