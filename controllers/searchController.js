const { Product } = require("../models");
const db = require("../models");
const { Op } = require("sequelize");

const search = async (req, res) => {
  try {
    const query = req.query.query;

    // Validate input
    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid query parameter." });
    }

    // const products = await db.sequelize.query(
    //     `SELECT * FROM products WHERE name LIKE ? ORDER BY name ASC LIMIT 20`,
    //     {
    //         replacements: [`%${query}%`],  // Array of values for `?`
    //         type: db.sequelize.QueryTypes.SELECT
    //     }
    // );
    //STUDY ABOUT MATCH AGAINST
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`, // Equivalent to `LIKE` in SQL
        },
      },
      order: [["name", "ASC"]], // Order by name in ascending order
      limit: 20, // Limit to 20 results
    });

    if (!products.length) {
      return res.status(404).json({ message: "No products found." });
    }

    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  search,
};

// const products = await db.Product.findAll({
//   where: {
//     [db.Sequelize.Op.or]: [
//       { name: { [db.Sequelize.Op.like]: `%${query}%` } },
//       db.Sequelize.literal(
//         `MATCH(name) AGAINST('${query}' IN BOOLEAN MODE)`
//       ),
//     ],
//   },
//   order: [["name", "ASC"]],
//   limit: 20, // Limit results for performance
// });

// const products = await db.sequelize.query(
//     `SELECT * FROM products WHERE MATCH(name) AGAINST(? IN BOOLEAN MODE) ORDER BY name ASC LIMIT 20`,
//     {
//         replacements: [query],
//         type: db.sequelize.QueryTypes.SELECT
//     }
// );
