const express = require('express')
const cors = require('cors');
const app = express()
const mysql = require("mysql");
const bcrypt = require('bcrypt');


const port = 8081
app.use(express.json())
app.use(cors());

const secret = 'alliwantforchristmasisyou'

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'lakoo',
    port: '3306'
})

app.get('/', (req, res) => {
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

app.post('/registeradmin', async (req, res) => {
    const { username, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
  
    // If no role is provided, use 'user' as the default
    const userRole = role || 'admin';
  
    db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hash, userRole],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error registering admin' });
        } else {
          res.json({ success: true });
        }
      }
    );
  });


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
