const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;

var Tasks = require("../models/Tasks");

//create a task

router.post("/",async (req,res,next)=>{
    try{
        let task = await Tasks.create({
            title: req.body.title,
            description: req.body.description
        });
        res.json(task);
    }
    catch(e){
        console.log("error in post of task",e.message, e.toString());
        req.json({message:"error", error:e.message});
    }
})

//update a task

router.put("/:id",async (req, res, next)=>{
    try{
        let task = await Tasks.findOneAndUpdate({_id:Object(req.params.id)},{
            title: req.body.title,
            description: req.body.description
        }, {upsert:false,new:true})
        res.json(task)
    }
    catch(e){
        console.log("error in port of task", e.message, e.toString());
        req.json({message: "error", error:e.message});

    }
})

//Read Tasks

router.get("/", async (req, res, next)=>{
    let tasks = await Tasks.find();
    res.json(tasks);
})

//Delete

router.delete("/:id", async (req, res, next)=>{
    try{
        let task = await Tasks.deleteOne({_id: ObjectId(req.params.id) });
        res.json(task);
    }
    catch(e){
        console.log("error in port of task", e.message, e.toString());
        req.json({message: "error", error:e.message});

    }
});

module.exports = router;