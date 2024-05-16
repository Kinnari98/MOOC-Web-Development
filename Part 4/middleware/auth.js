const jwt = require("jsonwebtoken");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  try {
    request.user = request.token
      ? jwt.verify(request.token, process.env.SECRET)
      : null;
    next();
  } catch {
    next();
  }
};

module.exports = { tokenExtractor, userExtractor };
