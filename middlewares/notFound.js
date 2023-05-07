const notFound = async (req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
};

// Falta un next en alguno de los dos

module.exports = notFound;
