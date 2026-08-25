class customError extends Error {
  constructor(statusCode, message = "Something went wrong") {
    super(message);
    this.statusCode = statusCode;
    // this.success = false;

    // this.errors = stack;
    // if (stack) {
    //   this.stack = this.stack;
    // } else {
    //   error.captureStackTrace(this, this.constructor);
    // }
  }
}

export default customError;
