// Task1: initiate app and run server at 3000

const express = require('express')
const app = express()


app.use(express.json()) // json related
app.use(express.urlencoded({extended: true})) // files related

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 


const mongoose = require('mongoose')

const EMPLOYEE_DATA = require('./models/employee');
const { find } = require('../MongoDB L/models/Student');
const EmployeeData = require('./models/employee');



// setParameter:
//     diagnosticDataCollectionEnabled: true 



mongoose.connect('mongodb+srv://Amal2910:Learn123@cluster0.sccoifa.mongodb.net/CaseStudy?retryWrites=true&w=majority')
.then(()=>{
    console.log("My MongoDB is connected successfully!!!")
})
.catch(error=>{
    console.log('Connection error' + error)
})


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', (req,res)=>{

    try {
        EmployeeData.find().then(function(data){   
        res.send(data)
    })}
    
    catch (error) {
        console.log(error)
    
    }

    })

    


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', (req,res)=>{

    try {
        
        EmployeeData.findOne({"_id":req.params.id}).then(function(data){   
        res.send(data);
    })}
    
    catch (error) {
        console.log(error)
    
    }

    })




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req,res)=>{
    try {
        let item = req.body;
        console.log('data : ',item)
        const user = new EMPLOYEE_DATA(item)
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        console.log(error)
    
    }
    
    })






//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', (req,res)=>{

    try {
        
        EmployeeData.findByIdAndDelete({"_id":req.params.id}).then(function(data){   
        res.send(data);
    })}
    
    catch (error) {
        console.log(error)
    
    }

    })



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',(req,res)=>{

    try {

        EmployeeData.findByIdAndUpdate(req.body._id, {$set:req.body}).then(function(data){   
        res.send(data);
    })}
    
    catch (error) {
        console.log(error)
    
    }

    })

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000,()=>{
    console.log('Server is connected!')
})


