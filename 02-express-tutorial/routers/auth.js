const express = require("express");
const router = express.Router();


router.post("/login",(req,resp)=>{
    const {name} = req.body;
    if(name)
    {
        return resp.status(200).send(`Welcome Ya ${name}`)
    }
    resp.status(401).send("Please provide correct name...");
})

module.exports = router;