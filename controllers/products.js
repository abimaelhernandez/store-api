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
  
  const products = await Product.find({ price: { $gt: 30 } })
  // const products = await Product.find().sort('price');


  res.status(200).json({ products, nbHits: products.length , msg : 'Products fetched successfully' });
}

const getAllProducts = async (req, res) => {
  const {featured, company, name, sort, fields, numericFilters} = req.query;
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

  if (fields) {
    const fieldsArray = fields.split(',').join(' ');
    result = result.select(fieldsArray);
  }
  
  // pagination 
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  /**
   * 23 total 
   *  4 - 7 7 7 2
   */

  result = result.skip(skip).limit(limit);

   if(numericFilters) {
      const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      }
      const reg = /\b(>|>=|=|<|<=)\b/g;
      
      let filters = numericFilters.replace(reg, (match)=>`-${operatorMap[match]}-`);

      console.log('Filters ...', filters);
      const options = ['price', 'rating']

      filters = filters.split(',').forEach(item => {
        const [field, operator, value] = item.split('-');
        if(options.includes(field)) {
          queryObj[field] = { [operator] : Number(value)}
        }
      })
    }
    
    console.log('QueryObj ...', queryObj);

  const products = await result
  res.status(200).json({ products, nbHits: products.length });
}



module.exports = {
  getAllProducts,
  getAllProductsStatic,
}