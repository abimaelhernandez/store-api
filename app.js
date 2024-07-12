require('dotenv').config();
require('./routes/products');

const express = require('express');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
// const productControllers = require('./controllers/products');
const productsRouter = require('./routes/products');

console.log('in App js')
// async errors 

const app = express();
const port = process.env.PORT || 3000;
//  middleware 
app.use(express.json());
// app.use(errorHandlerMiddleware);

// routes 
app.get('/', (req, res) => {
  res.send('<h1>Hello, Express!<a href="/api/v1/product"> click here</a></h1>')
});

app.use('/api/v1/product', (req, res) => {
  console.log('in products router')
  app.send('route working properly');
});

const start = async () => {
  try {
    // connnext db
    const dbURI = process.env.MONGO_URI;
    await connectDB(dbURI);
    app.listen(port, console.log(`Server listening on port ${port} ...`));
  } catch (error) {
    console.error('Error conn3cting to db and starting the server', error);
  }
}

app.use(notFoundMiddleware);
start();