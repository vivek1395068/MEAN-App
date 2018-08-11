var express=require('express');
var router = express.Router();
var mongojs= require("mongojs");
var db = mongojs("mongodb://Vivek:Vivek108#@ds235239.mlab.com:35239/vivek",["HK"])


// Get All Tasks
router.get('/tasks',(req,res,next)=>{
    db.HK.find((err,tasks)=>{
        if(err){
            res.send(err);
        }
        res.json(tasks);

    })
});

// Get Single Task
router.get('/task/:id',(req,res,next)=>{
    db.HK.findOne({_id:mongojs.ObjectId(req.params.id)},(err,task)=>{
        if(err){
            res.send(err);
        }
        res.json(task);

    })
});

// Save Task
router.post('/task',function(req,res,next){
    var task = req.body;
    if(!task.title || (task.tookPrasad +'')){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else{
        db.HK.save(task,function(err,task){
            if(err){
                res.send(err);
            }
            res.json(task);
        })
    }
});

// Delete Task
router.delete('/task/:id',(req,res,next)=>{
    db.HK.remove({_id:mongojs.ObjectId(req.params.id)},(err,task)=>{
        if(err){
            res.send(err);
        }
        res.json(task);

    })
});

// Update Task
router.put('/task/:id',(req,res,next)=>{
    var task = req.body;
    var updTask={};

    if(task.tookPrasad){
        updTask.tookPrasad=task.tookPrasad;
    }

    if(task.title){
        updTask.title=task.title;
    }
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        })
    } else{
        db.HK.update({_id:mongojs.ObjectId(req.params.id)},updTask,{},(err,task)=>{
            if(err){
                res.send(err);
            }
            res.json(task);
    
        })
    }
});

module.exports = router;