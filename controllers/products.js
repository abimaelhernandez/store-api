const Product = require('../models/product');

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
  res.status(200).json({msg: 'get all products'});
}



module.exports = {
  getAllProducts,
  getAllProductsStatic,
}