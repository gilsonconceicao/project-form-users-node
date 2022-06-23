const fs = require('fs'); 
const bodyParser = require('body-parser'); 
const port = 3000; 

const express = require('express');
const app = express();

// body parser 
app.use(bodyParser.urlencoded()); 

let bankDataUsers = []; 

// read data users
fs.readFile('datausers.json', 'utf-8', (error, data) => {
    if (error) {
        console.log(error)
    } else {
        bankDataUsers = JSON.parse(data); 
    }
})

// page router
app.use(express.static(__dirname + '/public')); 

app.get('/home', (res, req) => {
    req.sendFile(__dirname + '/public/home.html'); 
})

app.post('/cadastro', (req, res) => {
    const {nameuser, lastname, email} = req.body; 
    const createUser = {
        nameuser, lastname, email
    }

    fs.writeFile('datausers.json', JSON.stringify(createUser), (erro) => {
        if (erro) {
            console.log(erro); 
        } else {
            console.log('Data of form succes!'); 
        }
    })

    bankDataUsers.push(createUser); 

    console.log(createUser); 

    res.send('Succes!'); 
})

app.listen(port, () => {
    console.log('Server Running'); 
}); 