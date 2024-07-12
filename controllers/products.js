/* 
- CONTROLLERS
- get all products
- get a single product by id
- create a new product
- update a product by id
- delete a product by id
*/ 

const getAllProductsStatic = async (req, res) => {
  console.log('get all productsz STATIC ');
  res.status(200).json({msg: 'get products STATIC'});
}

const getAllProducts = async (req, res) => {
  res.status(200).send('get all products');
}



module.exports = {
  getAllProducts,
  getAllProductsStatic,
}