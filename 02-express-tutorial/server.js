

const express = require("express");
const path = require("path");
const logger = require('./logger');
//const auth = require('./authorize');
const app_express = express();
const {products} = require('./data.js');
const morgan = require("morgan");


const people = require('./routers/people');
const auth = require('./routers/auth');

app_express.use('/api/people',people);
app_express.use('/api/auth',auth);
//app.use(express.static('./public'));
app_express.use(express.static('./methods-public'));
//app_express.use('/api/',[logger]);
// parse form data
app_express.use(express.urlencoded({extended:false}));
app_express.use(morgan('short'));

app_express.use(express.json())



// request => middleware => response
app_express.get("/",(req,resp)=>{


   // resp.sendFile(path.resolve(__dirname,'./navbar-app/index.html'));
   resp.send('<h1>Home Page</h1><a href="/api/products">products</a>');
})




   app_express.get("/about/:id",(req,resp)=>{
    console.log(req.query);
    console.log(">>>>>>>>>>>>>>>>>");
    console.log(req.params);
    resp.status(200).send("About Page");
})

app_express.get("/v1/query",(req,resp)=>{
    const {search,limit} = req.query;
    let sortedProds = [...products];

    if(search)
    {
        sortedProds = sortedProds.filter((product)=>{
            return product.name.startsWith(search);
        })
    }

    if(limit)
    {
        sortedProds = sortedProds.slice(0,Number(limit));
    }

    if(sortedProds.length<1){
         return resp.status(200).json({success:true,data:[]})
    }
    resp.status(200).json(sortedProds);
})

app_express.all("*",(req,resp)=>{
    resp.status(404).send("<h1>resource not found</h1>");
})

app_express.listen(5000,()=>{
    console.log("server is listening on port 5000");
})

//app.get
//app.post
//app.put
//app.delete
//app.use
//app.all


