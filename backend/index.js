const express = require('express')
const cors = require('cors');
const app = express()
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


const port = 8081
app.use(express.json())
app.use(cors());

const secret = 'alliwantforchristmasisyou'
const checkjwt = expressJwt({secret: secretKey})

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'lakoo',
    port: '3306'
})

app.get('/', (re, res) => {
    res.send("YO WHATS POPPING ITS ME MR BACKEND")
})

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hash],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json ({error: "Error registering user"});
            } else {
                res.json({ success: true })
            }
        }
    )
})

app.get('/products', (req, res) => {
    const q = "SELECT * FROM products";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    })
})

app.get('/products', (req, res) => {
    const q = "SELECT * FROM products";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    })
})


app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
