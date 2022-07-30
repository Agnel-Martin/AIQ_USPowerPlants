//    To Launch server, Type: node index OR npx nodemon index -- Server Port: 4300
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Middleware
app.use(cors());
app.use(express.json()); //req body

//----All Routes----//

//Get All Plant Data
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM uspp_1 WHERE \"PLNGENAN\" IS NOT NULL");
        res.json(allTodos.rows);
        //console.log(JSON.stringify(allTodos.rows));
    } catch (err) {
        console.error("Error Caught: "+ err.message);
    }
})

//Get All States
app.get("/todos/states", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT DISTINCT(\"PSTATABB\") FROM uspp_1 ORDER BY \"PSTATABB\"");
        res.json(allTodos.rows);
        //console.log(JSON.stringify(allTodos.rows));
    } catch (err) {
        console.error("Error Caught: "+ err.message);
    }
})

//Get Plant Data limited to Top(N) as per User
app.get("/todos/:num", async (req, res) => {
    try {
        //console.log(req.params)
        const { num } = req.params;
        //console.log(num);
        const allTodos = await pool.query(
            "SELECT * FROM uspp_1 WHERE \"PLNGENAN\" IS NOT NULL "+
                "ORDER BY \"PLNGENAN\" DESC LIMIT $1", [num]);
        
        res.json(allTodos.rows);
    } catch (err) {
        console.error("Error Caught: "+ err.message);
    }
})

//Get Plant Data as per required State Abbreviation
app.get("/todos/:abb/:num", async (req, res) => {
   try {
       //console.log(req.params)
       var { abb } = req.params;
       abb = '' + abb;
       const num  = req.params.num;
       const allTodos = await pool.query(
        "SELECT * FROM uspp_1 WHERE \"PLNGENAN\" IS NOT NULL AND \"PSTATABB\" LIKE $1"+
        " ORDER BY \"PLNGENAN\" DESC LIMIT $2", [abb, num]);
        
        res.json(allTodos.rows);
   } catch (err) {
       console.error("Error Caught: "+ err.message);
   }
})

//Create Plant Data
app.post("/todos", async (req, res) => {
    try {
        const {PNAME} = req.body;
        const newTodo = await pool.query("INSERT INTO uspp_1 (PNAME) VALUES ($1) RETURNING *", [PNAME]);
        
        res.json(newTodo.rows[0]);
    } catch (err){
        console.error("Error Caught: "+ err.message);
    }
})

//Update a Plant Data
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { state } = req.body;
        const updateTodo = await pool.query(
            "UPDATE uspp_1 SET \"PSTATABB\" = $1 WHERE \"SEQPLT20\" = $2", 
            [state, id]);

        res.json("Plant's State is updated!");
    } catch (err) {
        console.error("Error Caught: "+ err.message);
    }
})

//Delete a Plant Data
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM uspp_1 WHERE \"SEQPLT20\" = $1", [id]);

        res.json("Plant is deleted!");
    } catch (err) {
        console.error("Error Caught: "+ err.message);
    }
})

//Launching the Server @ Port No. 4300
app.listen(4300, () => {
    console.log("Server is up & running on PORT No. 4300 :)");
});

