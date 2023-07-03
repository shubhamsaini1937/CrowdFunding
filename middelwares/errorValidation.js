const errorValidation = (error, req, res, next) => {
  console.log(error);
  const defaultErrors = {
    statusCode: 500,
    message: error,
  };

  if (error.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
  }
  if (error.code && error.code === 11000) {
    (defaultErrors.statusCode = 400),
      (defaultErrors.message = `${Object.keys(
        error.keyValue
      )} Field has to be Unique`);
  }
  res.status(defaultErrors.statusCode).send({ defaultErrors });
};
export default errorValidation;
