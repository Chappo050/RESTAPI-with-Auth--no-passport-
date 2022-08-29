const { verify } = require("crypto");
const express = require("express");
const jwt = require('jsonwebtoken')

const router = express.Router();
const uuid = require("uuid");
const { user } = require(".");

//GET
router.get("/", (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get("/:messageId", (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

//POST
router.post("/", (req, res) => {
  const id = uuid.v4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

//Protected route
router.post("/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: "Post created..." });
      req.context;
      authData;
    }
  });
});

//DELETE
router.delete("/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } =
    req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

//Middleware functions

//FORMAT OF TOKEN
//AUTHORIZATION: Bearer <access_token>

//Verify token
function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers["authorization"];
  //Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    //split at the space
    const bearer = bearerHeader.split(" ");
    //Get token from array;
    const bearerToken = bearer[1];
    //Set the token
    req.token = bearerToken;
    //Next middleware
    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
