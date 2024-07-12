const errorHandlerMiddleware = (error, req, res, next) => {
  console.error('Error:', error.message);
  res.status(500).send({ message: 'Something went wrong, please try again later.' });
}