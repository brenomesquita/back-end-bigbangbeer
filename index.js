require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(function(_req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(cors());
app.get('/', (_req, res) => { res.status(200).send({deploy: 'deployed: heroku_d35758a6591c78f'})})
app.use('/login', routes.loginRoute);
app.use('/register', routes.registerRoute);
app.use('/profile', routes.profileRoute);
app.use('/products', routes.productsRoute);
app.use('/sales', routes.salesRoute);
app.use('/individualProduct', routes.individualProductRoute);
app.use('/images', express.static('images'));

app.use((error, _req, res, _next) => {
  const { message, status } = error;
  if (status < 500) {
    return res.status(status).json(message);
  }
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`listen on port: ${PORT}`));
