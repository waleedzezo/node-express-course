// const http = require('http');
// const {readFileSync} = require('fs');
// const server = http.createServer((req,resp) =>{

//     const homePage = readFileSync("./navbar-app/index.html");
//     const homeCss = readFileSync("./navbar-app/styles.css");
//     const homeJS = readFileSync("./navbar-app/browser-app.js");
//     const homeLogo = readFileSync("./navbar-app/logo.svg");


//     console.log(req.url);
//     const url =  req.url;
//     if(url ==='/')
//     {
//         resp.writeHead(200,{'content-type': 'text/html'})
//         resp.write(homePage);
//         resp.end();
//     }else if(url === '/styles.css'){
//         resp.writeHead(200,{'content-type': 'text/css'})
//         resp.write(homeCss);
//         resp.end();
//     }else if(url === '/browser-app.js'){
//         resp.writeHead(200,{'content-type': 'text/javascript'})
//         resp.write(homeJS);
//         resp.end();
//     }else if(url === '/logo.svg'){
//         resp.writeHead(200,{'content-type': 'image/svg+xml'})
//         resp.write(homeLogo);
//         resp.end();
//     }

   
// })

// server.listen(5000);

const express = require("express");
const path = require("path");
const app = express();
const {products} = require('./data.js');


app.use(express.static('./public'));

const logger = (req,resp,next)=>{
    const url = req.url;
    const method = req.method;
    const time = new Date().getFullYear();
    console.log(url,method,time);
     next()
}

// request => middleware => response
app.get("/",logger,(req,resp)=>{
   // resp.sendFile(path.resolve(__dirname,'./navbar-app/index.html'));
   resp.send('<h1>Home Page</h1><a href="/api/products">products</a>');
})

app.get("/api/products",(req,resp)=>{
 const newProducts = products.map((product)=>{
     const {id,name,image} = product;
     return {id,name,image}
 })
    resp.json(newProducts);
})

app.get("/api/products/:prodId",(req,resp)=>{
    const {prodId} = req.params;
    console.log(prodId);
    const singleProduct = products.find((product)=>product.id===Number(prodId))
if(!singleProduct)
{
    return resp.status(404).send('product doesnt exist');
}

       resp.json(singleProduct);
   })

app.get("/about/:id",(req,resp)=>{
    console.log(req.query);
    console.log(">>>>>>>>>>>>>>>>>");
    console.log(req.params);
    resp.status(200).send("About Page");
})

app.get("/v1/query",(req,resp)=>{
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

app.all("*",(req,resp)=>{
    resp.status(404).send("<h1>resource not found</h1>");
})

app.listen(3000,()=>{
    console.log("server is listening on port 3000.....");
})

//app.get
//app.post
//app.put
//app.delete
//app.use
//app.all


