/* eslint no-unused-vars: off */

const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).send(err.message);
  } else next();
};
const notFound = (req, res) => {
  console.log(`Not found ====> ${req.originalUrl}`.blue);
  res.status(404).json({
    code: 404,
    data: 'Sorry, the requested ressource was not found',
  });
};

module.exports = { errorHandler, notFound };
