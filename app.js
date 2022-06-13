// init express and port; 
const express = require('express');
const bodyparser = require('body-parser'); 
const fs = require('fs'); 
const port = 3000; 

// Config express 
const app = express(); 
app.use(express.json()); 

// body-parser 
app.use(bodyparser.urlencoded()); 

// src local languages 
app.use(express.static(__dirname + "/public")); 

//bank 
let bankData = [ ]; 

// fs read
fs.readFile("cadastrosdeusuarios.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err); 
    } else {
        bankData = JSON.parse(data); 
    }
})

// rotas 
app.get('/home', (req, res) => {
    res.sendFile(__dirname + "/public/home.html")
})

app.post('/cadastro', (req, res) => {
    const {Nome, Sobrenome, Email} = req.body; 

    const cadastro = {
        Nome, 
        Sobrenome, 
        Email
    }

    bankData.push(cadastro); 

    fs.writeFile("cadastrosdeusuarios.json", JSON.stringify(bankData), (err) => {
        if (err) {
            console.log(err); 
        } else {
            console.log('Dados salvos com sucesso!');
        }
    })

    res.send('Dados enviados com sucesso!')
})

app.listen(port, () => {
    console.log('Sever running...')  
})