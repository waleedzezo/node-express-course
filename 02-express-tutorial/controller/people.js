let {people} = require('../data.js');
const {products} = require('../data.js');

const getProducts = (req,resp)=>{

    const newProducts = products.map((product)=>{
        const {id,name,image} = product;
        return {id,name,image}
    })
       resp.json(newProducts);
   }

const getProductId = (req,resp)=>{
    const {prodId} = req.params;
    console.log(prodId);
    const singleProduct = products.find((product)=>product.id===Number(prodId))
if(!singleProduct)
{
    return resp.status(404).send('product doesnt exist');
}

       resp.json(singleProduct);
   }

const deletePeople = (req,resp)=>{

    const {id} = req.params;


        const newPeople = people.filter((person)=>person.id !== Number(id));
        if(newPeople)
            return resp.status(200).json({success:true,data:newPeople});
        
            console.log(newPeople);         

 }

 const getEmployeeByName= (req,resp)=>{
    const {name} = req.body;
    console.log(`${name}`);
    if(!name)
    {
        return resp.status(400).json({success:false,data:"please provide a vlue"})
    }

    resp.status(201).json({success:true,data: [...people,{"id":5,"name":name}]});
 }

const updatePeople = (req,resp)=>{
    const {id} = req.params;
    const {name} = req.body;
    console.log(id,name);
    
    if(name)
    {
        let update = 0;
        const newPeople = people.map((person)=>{

            if(person.id === Number(id))
            {
                person.name = name;
                update = 1;
            }
           return person; 
        })
        if(update===1)
             return resp.status(200).json({sucess:true,flag:1,data:newPeople});
        else
             return resp.status(404).json({sucess:false,flag:0});
    }
 }


 module.exports = {
    getProducts,
    getProductId,
    deletePeople,
    getEmployeeByName,
    updatePeople
 }