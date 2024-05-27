import jwt from "jsonwebtoken";

// validate the jwt token
const validateToken = async (request, response, next) => {
  let token;
  let authHeader =
    request.headers.Authorization || request.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        response.status(401).send("not authorized");
      }

      if (decoded) {
        request.user = decoded.user;
        next();
      }
    });
  } else {
    return response.status(401);
  }
};

export default validateToken;
