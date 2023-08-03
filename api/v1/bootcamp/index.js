const express = require('express');
const router = express.Router();

const mongo = require('mongojs');
const db = mongo('mongodb+srv://sucimahfudy:SfoKglG6Nisr5YVm@techcamp.shlrys4.mongodb.net/CSR', ['todos']);

//READ DATA
router.get('/', function(req, res, next){
    let query = {};
    if (req.query.text) query.text = req.query.text;
    if (req.query.isCompleted) {
        if (req.query.isCompleted === 'true') query.isCompleted = true;
        else query.isCompleted = false;
    }
    console.log(query);
    db.todos
    .find(query,function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

//READ SPECIFIC DATA
router.get('/:id', function(req, res, next){

    let query = {
        _id: db.ObjectId(req.params.id)
    };

    db.todos
    .find(query, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

//CREATE DATA
router.post('/', function(req, res, next){

    let todo = req.body;

    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todos
        .save(todo, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });

    }
});

//UPDATE DATA BY ID
router.put('/:id', function(req, res, next){

    let todo = req.body;

    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todos
        .replaceOne({
            _id: db.ObjectId(req.params.id)
        }, todo, {}, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });

    }
});

//DELETE DATA BY ID
router.delete('/:id', function(req, res, next){ {
    db.todos
        .remove({
            _id: db.ObjectId(req.params.id)
        }, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });

    }
});


module.exports = router;
