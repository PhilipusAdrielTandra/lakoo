require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const multer = require('multer');

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

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lakoo:m11qtMGGNQfipd61@cluster0.v8z4dqx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}
});

async function run() {
try {
    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
}
}
run().catch(console.dir);

const db = client.db("lakoo");
const productsCollection = db.collection("products");
const adminsCollection = db.collection("admins");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.get('/', (req, res) => {
    res.send("YO WHATS POPPING ITS ME MR BACKEND")
})

app.get('/users', async (req, res) => {
    try {
        const users = await db.collection("users").find({}).toArray();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/users', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
        await db.collection("users").insertOne({ username, password: hash });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/users/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ username });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
                res.json({ success: true, message: 'Login successful', token });
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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

// app.post('/products', authenticateToken, upload.single('image'), (req, res) => {
//     const { user_id, name, quality, size } = req.body;
//     const userId = req.user && req.user.id; // Assuming user information is stored in req.user
//     if (!req.file) {
//         return res.status(400).json({error: "Image required"});
//     }
//     const image = req.file.buffer
//     const q = 'INSERT INTO products (user_id, name, quality, size, image) VALUES (?, ?, ?, ?, ?)';
//     db.query(q, [user_id, name, quality, size, image], (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Error creating product' });
//         } else {
//             res.json({ success: true, productId: result.insertId });
//         }
//     });
// });

// app.get('/products', authenticateToken, (req, res) => {
//     const q = "SELECT * FROM products";
//     db.query(q, (err, data) => {
//         if (err) {
//             console.log(err);
//             return res.json(err);
//         }
//         return res.json(data);
//     })
// })

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})

