const express = require('express')
const app = express()
const port = process.env.POST || 5000;
const cors = require('cors');
require('dotenv').config()

//middelware
app.use(express.json());
app.use(cors());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.gphdl2n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const registerUser = client.db("quick-cash").collection("registerUser");




    app.post("/register-user", async (req, res) => {
        const info = req.body;
        const query = {email: info.email}
        const find = await registerUser.findOne(query);
        if(!find){
            const result = await registerUser.insertOne(info);
            return res.send(result);
        }
        else{
            return res.status(400).send({message: 'Email is already used.'})
        }
    })

    app.get('/register-user', async(req, res) => {
        const result = await registerUser.find().toArray();
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello, I am Quick Cash Server. Right Now I am all OKAY!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})