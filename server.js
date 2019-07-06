const express = require('express');
const app = express();
const { syncAndSeed, models } = require('./db')
const { Product } = models

const port = process.env.PORT || 3000;

syncAndSeed();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/products', async (req, res, next) => {
  try {
    const newProduct = await Product.create({
    name: req.body.name
  });
  res.send(newProduct)
  }
  catch (ex) {
    next(ex)
  }
})

app.delete('/api/products/:id', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
  }
  catch (ex) {
    next(ex)
  }
})

app.get('*', async (req, res, next) => {
  try {const products = await Product.findAll()
  res.send(products)
  }
  catch (ex) {
    next(ex)
  }
})

app.listen(port, () => console.log(`listening on port ${port}`));
