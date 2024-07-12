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
  console.log('get all productsz STATIC ');
  const products = await Product.find({});
  res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
  const {featured, company, name} = req.query;
  const queryObj = {};
  
  if (featured) queryObj.featured = featured === 'true' ? true : false;
  
  if (company) {
    queryObj.company = company
  }

  if (name) {
    queryObj.name = {$regex : name, $options: 'i' }
  }

  const products = await Product.find(queryObj);
  res.status(200).json({ products, nbHits: products.length });
}



module.exports = {
  getAllProducts,
  getAllProductsStatic,
}