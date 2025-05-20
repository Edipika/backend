const { Product } = require("../models");
const db = require("../models");
const { Op } = require("sequelize");

const search = async (req, res) => {
  try {
    const query = req.query.query;
console.error(query);
    // Validate input
    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid query parameter." });
    }

    //STUDY ABOUT MATCH AGAINST
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`, //Equivalent to `LIKE` in SQL
        },
      },
      order: [["name", "ASC"]], // Order by name in ascending order
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
