export const errorHandler = (error, req, res, next) => {
  const { status = 500, message } = error;
  console.log(error);
  res.status(status).json({
   status,
		message: "Something went wrong",
    data: message,
  });
};