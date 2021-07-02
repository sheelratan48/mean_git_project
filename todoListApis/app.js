var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var app = express();
var port = 3000;
mongoose.connect("mongodb://localhost:27017/todolist");
mongoose.connection.on("connected",()=>{
    console.log("I am connected to database");
});

app.use(cors());
app.use(bodyparser.json());

//get, port, put, delete, methods, options

// Curd C => create , U => Update, R=> Read, D=>Delete
app.use("/tasks",require("./routes/tasks"))

app.get("/",(req, res)=>{
    console.log("$someone have made get call");
    res.send("welcome to todo list");

})
app.listen(port,()=>{
    console.log(" i am running on port :: ",port);
})