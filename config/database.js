// const { Sequelize } = require('sequelize');

// // // Create a new Sequelize instance
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD || '', {
//   host: process.env.DB_HOST,
//   dialect: 'mysql', // Specify the dialect (MySQL in this case)
// });

// // // Test the connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected successfully!');
//   })
//   .catch(err => {
//     console.error('Database connection error:', err); // Log detailed error message
//     throw err;
//   });

// module.exports = sequelize;
