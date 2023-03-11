const logger = (req,resp,next)=>{
    const url = req.url;
    const method = req.method;
    const time = new Date().getFullYear();
    console.log(url,method,time);
    console.log(url,method,time);
     next()
}

module.exports = logger;