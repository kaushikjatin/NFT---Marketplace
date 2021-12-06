const { assert } = require('console'); 
const express = require('express');
const router=express.Router();
const Note=require('../models/notemodel');
const User=require('../models/users');

router.route("/card").post((req,res)=>{
    const cid2=req.body.cid1; 
    const count2=req.body.count;
    Note.findOneAndUpdate({cid1:cid2},{$set:{count:count2}},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
       
    })
    
    
})


router.route("/upload").post((req,res)=>{
    const cid1=req.body.cid1;
    const count=req.body.count;
    const newNote=new Note({
        cid1,
        count
    });
    newNote.save();
})

router.route("/note").get((req,res)=>{
    Note.find().then((foundnotes)=>{
    
    res.json(foundnotes);
}
    )
})

router.route('/user').post(async (req,res)=>{
    const {address,designation,username}=req.body;
   
    User.find({id:address}).then( async user=>{
        if(user.length==0)
        {
            const user=new User({id:address,designation:designation,username:username})
            user.save()
            .then(new_user=>{
                res.status(201).json({
                    designation:new_user.designation,
                    address:new_user.address,
                    username:new_user.username
                })
            })
        }
        else 
        {
            await User.findOneAndUpdate({id:address},{id:address,designation:designation,username:username})
            const updated_user=await User.findOne({id:address})

            res.status(201).json({
                    designation:updated_user.designation,
                    address:updated_user.address,
                    username:updated_user.username
            })
        }
    })
})

router.route('/users').get((req,res)=>{
    User.find({}).then(users=>{
        res.status(201).json({
            users:users
        })
    })
})





module.exports=router;