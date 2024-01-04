require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const port = 8081
app.use(express.json())
app.use(cors());

const checkAdmin = (req, res, next) => {
    // Assuming you store user information in req.user after authentication
    const userRole = req.user.role;
  
    if (userRole === 'admin') {
      // User is an admin, allow access to the next middleware/route handler
      next();
    } else {
      // User is not an admin, return a forbidden response
      res.status(403).json({ error: 'Permission denied' });
    }
  };

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

app.get('/users', (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.json(data)
    })
})


app.post('/users', async (req, res) => {
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

app.post('/users/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            const user = results[0];
            try {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET)

                    res.json({ success: true, message: 'Login successful', token });
                } else {
                    res.status(401).json({ error: 'Invalid password' });
                }
            } catch (bcryptError) {
                console.error(bcryptError);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

app.post('/registeradmin', async (req, res) => {
    const { username, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
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

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]  
    if (token == null) return res.status(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403)
        req.user = user
        next()
    })   
}

app.post('/products', authenticateToken, (req, res) => {
    const { user_id, name, quality, size } = req.body;
    console.log(req.body)
    const userId = req.user && req.user.id; // Assuming user information is stored in req.user

    const q = 'INSERT INTO products (user_id, name, quality, size) VALUES (?, ?, ?, ?)';
    db.query(q, [user_id, name, quality, size], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error creating product' });
        } else {
            res.json({ success: true, productId: result.insertId });
        }
    });
});

app.get('/products', authenticateToken, (req, res) => {
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

