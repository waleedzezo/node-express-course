const authorized = (req,resp,next)=>{
  console.log('authorize');
    
    const {user} = req.query;
    if(user === 'waleed')
    {
       req.user = {id:'1',name: 'Waleed'}
       next();
    }else{
        resp.status(401).send('Unauthorized....');
    }
}

module.exports = authorized;