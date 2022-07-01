// This is my first app using JavaScript

const mysql = require('mysql');
const express = require('express');
const cors=require("cors");
const bodyparser = require('body-parser');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'USERNAME_HERE',
    password: 'PASSWORD_HERE',
    database: 'Supermarket'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

app.use(bodyparser.json());

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.listen(5000, () => {
    console.log('Server started on port 5000');
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS Supermarket';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS ProdMaster(id int AUTO_INCREMENT, Product VARCHAR(20), Price DECIMAL(5,2), Description VARCHAR(50), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table created...');
    });
});

app.get('/read', (req, res) => {
    let sql = 'SELECT * FROM ProdMaster';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/create', (req, res) => {
    console.log(req.body);
    form = req.body;
    let sql = 'INSERT INTO ProdMaster(Product, Price, Description) VALUES ('${form.product}', '${form.price}', '${form.description}')';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Product added...');
    });
});

app.post('/update', (req, res) => {
    console.log(req.body);
    form = req.body;
    let sql = 'UPDATE ProdMaster SET Price = ' ${form.price} ' WHERE id = ' + ${form.id});
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Product Price updated...');
    });
});

app.post('/delete', (req, res) => {
    console.log(req.body);
    form = req.body;
    let sql = 'DELETE FROM ProdMaster WHERE id = ' + ${form.id});
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Product removed...');
    });
});