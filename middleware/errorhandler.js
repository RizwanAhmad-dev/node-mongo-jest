const errorHandler = (err, req, res) => {
  if (err) {
    return res.status(500).json({ err });
  }
};

module.exports = errorHandler;
