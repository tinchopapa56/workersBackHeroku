import Express from "express";
import Mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

// App config

const app = Express();
const port = process.env.PORT || 8001;

//Mongo connection
const pass = "Workers-hub1234";
const connectionUrl = `mongodb+srv://Workers-hub:${pass}@workers-hub.iiibfun.mongodb.net/?retryWrites=true&w=majority`

// Middlewares
    app.use(Express.json());
    app.use(Cors());

//DB config
 Mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
 })

// API Endpoints
app.get("/", (req, res) => {
    res.status(200).send("Server created bien!")
})
app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err,data)=>{
        if(err){ res.status(500).send(err) }
        else{ res.status(201).send(data) }
    })
})

app.get("/tinder/cards", (req, res) => {
    Cards.find( (err,data) => {
        if(err){ 
            res.status(500).send(err)
        }else{ 
            res.status(200).send(data)
        }
    })
})


// Listener
app.listen(port, ()=> {`Listening on port ${port}`})
console.log("bro! running on port " + port)

