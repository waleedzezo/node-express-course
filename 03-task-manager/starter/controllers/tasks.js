const getAllTasks = (req,resp)=>{
    resp.send("all tasks");
}

const createTask = (req,resp) =>{
    resp.json(req.body);
}

const getTask = (req,resp) =>{
    resp.json(req.params.id);
}

const updateTask = (req,resp) =>{
    resp.send('create task');
}

const deleteTask = (req,resp) =>{
    resp.send('create task');
}



module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}