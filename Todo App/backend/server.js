const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoute = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydb' , {useNewUrlParser:true});
const connection = mongoose.connection;

connection.once('open' , function(){
    console.log("MongoDb Database Connection Succesefully");
})

todoRoute.route('/').get(function(req , res){
    Todo.find(function(err , todos){
        if(err){
            console.log(err)
        }else{
            res.json(todos);
        }
    });
});

todoRoute.route('/:id').get(function(req ,res){
    let id = req.params.id;
    Todo.findById(id ,function(err , todo){
        res.json(todo);
    });
});

todoRoute.route('/add').post(function(req ,res){
    let todo = new Todo(req.body);
    todo.save()
        .then(todo =>{
            res.statusMessage(200).json({'todo':'todo added succesfully'});

        })
        .catch(err=>{
            res.statusMessage(400).send('adding new todo failed')
        });
});

todoRoute.route('/update/:id').post(function(req ,res){
    Todo.findById(req.params.id , function(err , todo){
        if(!todo){
            res.status(404).send('data is not found');
        }else{
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo =>{
                res.json('Todo Update');
            })
            .catch(err =>{
                res.status(400).send("Update Not Posible");
            });
        }
    });
});



app.use('/todos' , todoRoute);

app.listen(PORT , function(){
    console.log("Server is running Port :" + PORT);
});
