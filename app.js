require('dotenv').config();
// require('./routes/products');
require('express-async-errors');

const express = require('express');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

console.log('in App js')
// async errors 

const app = express();
const port = process.env.PORT || 3000;
//  middleware 

app.use(express.json());

// routes 
app.get('/', (req, res) => {
  res.send('<h1>Hello, Express!<a href="/api/v1/product"> click here</a></h1>')
});

// set up router
app.use('/api/v1/products', productsRouter);

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
app.use(errorHandlerMiddleware);

start();