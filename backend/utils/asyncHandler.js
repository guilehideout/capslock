/*
  Wraps an async request handler and catches any errors,
  forwarding them to the next() function (Express error middleware).
*/
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Convert the async function to a Promise and catch any errors
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };
