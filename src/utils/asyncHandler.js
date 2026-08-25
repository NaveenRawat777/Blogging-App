const asyncHandler = (fn) => (req, res, next) => {
  console.log("asyncHandler: handling", req.method, req.path);
  return Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error("asyncHandler caught:", err.message);
    next(err);
  });
};

export default asyncHandler;
