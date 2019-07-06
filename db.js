const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/AcmeProducts-ReduxStyle", { logging: false });

const Product = conn.define('product', {
  name: Sequelize.STRING
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const products = ['Ice Cream', 'Fruit Loops', 'Coffee'];
  await Promise.all(products.map(name => Product.create({ name })));
}


module.exports = {
  syncAndSeed,
  models: {
    Product
  }
};
