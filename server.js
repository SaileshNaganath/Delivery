const express = require ("express");
const mongoose = require ("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const Order = require('./models/order.models');
const app = express();
const database_URL = 'mongodb://localhost:27017/test'; // replace with your actual MongoDB URL
const server_URL = 3000; // replace with your desired port number

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToMongo = async () => {
  try {
    await mongoose.connect(database_URL);
    console.log("Connected to MongoDB");
    init();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

connectToMongo();

mongoose.set('strictQuery', true);
async function init(){
    try{
        await Order.deleteMany();
        const data=[
            {
                orderID: 'ORD123',
                sender: {
                  name: 'John Doe',
                  address: '123 Main St, Kyiv, Ukraine',
                  contact: '+380123456789'
                },
                recipient: {
                  name: 'Jane Smith',
                  address: '456 Maple Ave, Delhi, India',
                  contact: '+911234567890'
                },
                items: [
                  { itemName: 'Book', quantity: 2, description: 'Programming books' },
                  { itemName: 'Clothes', quantity: 5 }
                ],
                status: 'Pending'
              },
              {
                orderID: 'ORD124',
                sender: {
                  name: 'Alice Johnson',
                  address: '789 Oak St, Lviv, Ukraine',
                  contact: '+380987654321'
                },
                recipient: {
                  name: 'Bob Brown',
                  address: '789 Elm St, Mumbai, India',
                  contact: '+912345678901'
                },
                items: [
                  { itemName: 'Medical Supplies', quantity: 10, description: 'First aid kits' },
                  { itemName: 'Food', quantity: 20, description: 'Non-perishable food items' }
                ],
                status: 'Pending'
              }
            ];
        await Order.insertMany(data);
        console.log("Seeding is successfully"); 
    }
    catch(e){
        console.log(e.message);
        console.log("Application is crashed");  
    }
}


require('./routes/order.routes')(app);

app.listen(server_URL, () => {
  console.log('Application is working fine!');
});
