const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')



  //GET
  router.get("/", (req, res) => {
    return res.json(Object.values(req.context.models.users));
  });
  
  router.get("/:userId", (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
  });
  
  //login and get a token for protection
  router.post('/login', (req, res) => {
    jwt.sign({user: req.context},'secretkey',{expiresIn: '30s'}, (err, token) => {
      res.json({
        token
      });
    });
  })
  
    //PUT
    router.put("/:userId", (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
  });
  
    //DELETE
    router.delete("/:userId", (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
  });


module.exports = router;