const express = require('express');
const app = express();
const { createTodo, updateTodo } = require('./types');
const { Todo } = require('./db');
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello World"
    });
})

app.get("/todos", async (req, res) => {
    // Do something

    const todos = await Todo.find({});

    res.json({
        todos
    });

});

app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        });
        return;
    }

    try{
        const newTodo = await Todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        res.status(200).json({
            msg: "New todo created successfully",
            id: newTodo._id
        });
    }
    catch(err){
        res.status(400).json({
            msg: err
        });
    }


});

app.put("/completed", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = updateTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong input"
        });
        return;
    }

    try{
        await Todo.updateOne({
            _id: createPayload.id
        }, {
            completed: true
        });
        res.json({
            msg: "Todo marked as completed"
        });
    }
    catch(err){
        res.status(400).json({
            msg: err.message
        });
    }
});

app.delete("/remove-todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = updateTodo.safeParse(createPayload);
    console.log(createPayload.id);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong input"
        });
        return;
    }

    try{
        const todo = await Todo.findOneAndDelete({
            _id: createPayload.id
        });

        if(todo){
            res.status(200).json({
                msg: "Todo deleted",
                id: todo._id
            });
        }
        else{
            res.status(400).json({
                msg: "Cannot find a todo with given id"
            });
        }
    } catch(error){
        console.log(error);
        res.json({
            msg: error.message
        });
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, function(){
    console.log("Server is running on port: ", PORT);
});

