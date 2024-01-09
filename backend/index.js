require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const path = require('path');

const port = 8081
app.use(express.json())
app.use(cors());


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
    const { username, password, address, number, firstname, lastname } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
        await db.collection("users").insertOne({ username, password: hash, address, number, firstname, lastname});
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.delete('/users/:userId', authenticateToken, async (req, res) => {
    const userIdToDelete = req.params.userId;

    try {
        // Check if the authenticated user has the privilege to delete users (admin check)
        const authenticatedUser = await db.collection("users").findOne({ _id: ObjectId(req.user.userId) });
        if (authenticatedUser && authenticatedUser.isAdmin) {
            // Delete the user by their ID
            const result = await db.collection("users").deleteOne({ _id: ObjectId(userIdToDelete) });

            if (result.deletedCount === 1) {
                res.json({ success: true, message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } else {
            res.status(403).json({ error: 'Permission denied. Only admins can delete users.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
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

app.post('/products', authenticateToken, upload.array('images', 5), async (req, res) => {
    const { description, category, brand, condition, style, price, phoneNumber, address } = req.body;
    
    const images = req.files.map(file => {
      const filename = file.originalname;
      const filePath = path.join(__dirname, 'uploads', filename);
  
      // Save the image to your server's filesystem
      file.buffer // Assuming you are using memory storage in multer
        ? require('fs').writeFileSync(filePath, file.buffer)
        : file.mv(filePath);
  
      // Store the URL or path in the database
      return {
        filename: filename,
        url: `/uploads/${filename}`, // Adjust based on your setup
      };
    });
  
    try {
      const userId = req.user.userId;
  
      // Find the user by ID
      const user = await db.collection("users").findOne({ _id: ObjectId(userId) });
  
      // Add the new product to the user's products array
      user.products.push({ images, description, category, brand, condition, style, price, phoneNumber, address });
  
      // Save the updated user document
      await db.collection("users").updateOne({ _id: ObjectId(userId) }, { $set: { products: user.products } });
  
      res.json({ success: true, message: 'Product added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
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

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})