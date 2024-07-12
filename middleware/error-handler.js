const errorHandlerMiddleware = (error, req, res, next) => {
  console.error('Error Middke ware:', error.message);
  res.status(500).send({ mesg: 'Something went wrong, please try again later.' });
}

module.exports = errorHandlerMiddleware;