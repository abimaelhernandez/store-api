const Product = require('../models/product');
const { options } = require('../routes/products');

/* 
- CONTROLLERS
- get all products
- get a single product by id
- create a new product
- update a product by id
- delete a product by id
*/ 

const getAllProductsStatic = async (req, res) => {
  // throw new Error('Not implemented yet');
  console.log('Testing with static ...');
  
  const products = await Product.find({}).sort('-name price');

  res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
  const {featured, company, name, sort} = req.query;
  const queryObj = {};
  
  if (featured) queryObj.featured = featured === 'true' ? true : false;
  
  if (company) {
    queryObj.company = company
  }

  if (name) {
    queryObj.name = {$regex : name, $options: 'i' }
  }

  
  let result  = Product.find(queryObj);
  
  if (sort) {
    // products = products.sort();
    console.log('Sorting ...', sort);
    const sortOrder = sort.split(',').join(' ')
    result = result.sort(sortOrder);
  } else {
    result = result.sort('createdAt');
  }

  const products = await result
  res.status(200).json({ products, nbHits: products.length });
}



module.exports = {
  getAllProducts,
  getAllProductsStatic,
}