const connectDB = require('./db/connect');

const express = require('express');

const app = express();
const tasks = require('./routers/tasks');

require('dotenv').config();

const port =3000;

app.use(express.json());

app.use('/api/v1/tasks',tasks);

const start = async() =>{
    try{
      await connectDB(process.env.MONGO_URI);
      app.listen(port,console.log("server is listening to 3000"));
    }catch(err){
       console.log(err);
    }
}

start();


