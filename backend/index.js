require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const path = require('path');


const port = 8081
app.use(express.json())
app.use(cors());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://lakoo:m11qtMGGNQfipd61@cluster0.v8z4dqx.mongodb.net/?retryWrites=true&w=majority";

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


// ------------ SERVICES ------------
const db = client.db("lakoo");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
 
var upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send("YO WHATS POPPING ITS ME MR BACKEND")
})



app.get('/users', authenticateAdminToken, async (req, res) => {
    try {
        const users = await db.collection("users").find({}).toArray();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/users',  async (req, res) => {
    const { username, password, address, number, firstname, lastname, city, state, zip } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
        await db.collection("users").insertOne({ username, password: hash, address, number, firstname, lastname, city, state, zip });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering admin' });
    }
});

app.post('/users/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ username });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
                const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

                // Store the refresh token in a secure way (e.g., HttpOnly cookie)
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000, // 1 day
                });

                res.json({ success: true, message: 'Login successful', accessToken, refreshToken });
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

app.post('/users/refresh-token', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Unauthorized: Refresh token missing' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ error: 'Forbidden: Invalid refresh token' });
        }

        const accessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
        res.json({ success: true, accessToken });
    });
});

app.post('/admins', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
        await db.collection("admins").insertOne({ username, password: hash });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error registering admin' });
    }
});

app.get('/admins', async (req, res) => {
    try {
        const users = await db.collection("admins").find({}).toArray();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/admins/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.collection("admins").findOne({ username });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
                const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

                // Store the refresh token in a secure way (e.g., HttpOnly cookie)
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000, // 1 day
                });

                res.json({ success: true, message: 'Login successful', accessToken, refreshToken });
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

app.post('/admin/refresh-token', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Unauthorized: Refresh token missing' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ error: 'Forbidden: Invalid refresh token' });
        }

        const accessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
        res.json({ success: true, accessToken });
    });
});

app.delete('/users/:userId', authenticateToken, async (req, res) => {
    const userIdToDelete = req.params.userId;

    try {
        const authenticatedUser = await db.collection("users").findOne({ _id: new ObjectId(req.user.userId) });
        if (authenticatedUser) {
            const result = await db.collection("users").deleteOne({ _id: new ObjectId(userIdToDelete) });

            if (result.deletedCount === 1) {
                res.json({ success: true, message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/products', authenticateToken, upload.single('image'), async (req, res) => {
    console.log('Request Body:', req.body);
    // console.log('Request File:', req.file);

    const { name, description, category, brand, condition, style, price, status, image } = req.body;
    // const img = req.file.filename;
    const userId = new ObjectId(req.user.userId); 
    const createdAt = new Date(); 


    // if (!req.file) {
    //     return res.status(400).json({ error: 'No file uploaded' });
    // }

    try {
        const result = await db.collection("products").insertOne({
            name,
            description,
            category,
            brand,
            condition,
            style,
            price,
            status,
            image, 
            userId, 
            createdAt, 
        });

        if (result.acknowledged && result.acknowledged === true) {
            console.log('Product inserted successfully');
            res.json({ success: true, message: 'Product inserted successfully' });
        } else {
            console.error('Failed to insert product', result);
            res.status(500).json({ error: 'Failed to insert product' });
        }
    } catch (err) {
        console.error('Error inserting product:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});


app.get('/products', authenticateAdminToken, async (req, res) => {
    try {
        const products = await db.collection("products").find({}).toArray();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products-2', authenticateAdminToken, async (req, res) => {
    console.log(res)
    console.log(req)
    const createdAt = new Date(); 

    try {
        const productsWithUsernames = await db.collection("products")
            .aggregate([
                {
                    $lookup: {
                        from: "users", // collection to join
                        localField: "userId", // field from the products collection
                        foreignField: "_id", // field from the users collection
                        as: "userDetails" // output array
                    }
                },
                {
                    $unwind: {
                        path: "$userDetails",
                        preserveNullAndEmptyArrays: true // To keep products even if no user is found
                    }
                },
                {
                    $project: {
                        name: 1,
                        description: 1,
                        category: 1,
                        brand: 1,
                        condition: 1,
                        style: 1,
                        price: 1,
                        image: 1,
                        userId: 1,
                        username: "$userDetails.username", // include username
                        number:"$userDetails.number",
                        address:"$userDetails.address",
                        city:"$userDetails.city",
                        state:"$userDetails.state",
                        zip:"$userDetails.zip",
                        firstname:"$userDetails.firstname",
                        lastname:"$userDetails.lastname",
                        createdAt: 1,
                        status: 1,
                    }
                }
            ]).toArray();

        res.json(productsWithUsernames);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.put('/products/edit/status/:productId', authenticateAdminToken, async (req, res) => {
    const { productId } = req.params;
    const { status } = req.body;

    try {
        // Update the product status in the database
        await db.collection("products").updateOne(
            { _id: new ObjectId(productId) },
            { $set: { status: status } }
        );

        res.json({ message: 'Status updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.get('/products/:productId', authenticateAdminToken, async (req, res) => {
    const productIdToFind = req.params.productId;

    try {
        const product = await db.collection("products").findOne({ _id: new ObjectId(productIdToFind) });

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.delete('/products/:productId', authenticateAdminToken, async (req, res) => {
    const productIdToDelete = req.params.productId;

    try {
        const authenticatedAdmin = await db.collection("admins").findOne({ _id: new ObjectId(req.user.userId) });

        if (authenticatedAdmin) {
            const result = await db.collection("products").deleteOne({ _id: new ObjectId(productIdToDelete) });

            if (result.deletedCount === 1) {
                res.json({ success: true, message: 'Product deleted successfully' });
            } else {
                res.status(404).json({ error: 'Product not found or you do not have permission to delete it' });
            }
        } else {
            res.status(403).json({ error: 'Forbidden: You do not have permission to delete this product' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//-------------------- AUTHENTICATION STUFF -------------------- 
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

function authenticateAdminToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.error('Authentication error: Token missing');
        return res.status(401).send('Unauthorized: Token missing');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            console.error('Authentication error:', err);
            return res.status(403).send('Forbidden: Invalid token');
        }

        try {
            const admin = await db.collection("admins").findOne({ _id: new ObjectId(user.userId) });

            if (admin) {
                req.user = user;
                next();
            } else {
                console.error('Authentication error: User is not an admin');
                res.status(403).send('Forbidden: User is not an admin');
            }
        } catch (error) {
            console.error('Error fetching admin:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
function generateAcessToken(req, res, next) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'})
}

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})