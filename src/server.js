const express = require("express");
const routes = require('./routes');
const models = require('./models');

const app = express();

const port = process.env.PORT || 3000;


//Import all middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    req.context ={
      models,
      me: models.users[1],
    } 
    next();
})

//ROUTES
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message)


//LISTENING

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
