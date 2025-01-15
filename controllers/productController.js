const { Product, Category, ProductImage } = require('../models');
const fs = require('fs');
const path = require('path');
const { where } = require('sequelize');

const addProduct = async (req, res) => {
    try {
        const { categoryId, name, description, price } = req.body
        // Validations
        if (!categoryId || categoryId.trim() === '') {
            return res.status(400).json({
                error: 'The product must belong to a valid category.',
            });
        }

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({
                error: 'The name of the product is required and must be a valid string.',
            });
        }

        if (!description || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({
                error: 'The description of the product is required and must be a valid string.',
            });
        }

        if (!price || typeof price !== 'number' || price <= 0) {
            return res.status(400).json({
                error: 'The price of the product is required and must be a positive integer.',
            });
        }

        if (!req.file) {
            return res.status(400).json({
                error: 'A product image is required.',
            });
        }
        // Validation Ends

        const category = await Category.findByPk(categoryId)
        if (!category) {
            return res.status(400).json({
                error: 'The product category is invalid or missing.',
            });
        }
        const product = await Product.create({
            category_id: categoryId,
            name: name,
            description: description,
            price: price,
        });

        //adding image to uploads folder
        const imageDir = `uploads/products/${product.id}`;
        fs.mkdirSync(imageDir, { recursive: true });
        fs.renameSync(req.file.path, path.join(imageDir, req.file.filename));

        const imagePath = `uploads/products/${product.id}/${req.file.filename}`
        await ProductImage.create({
            product_id: product.id,
            image_path: imagePath,
        });

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {

    const { productId, categoryId, name, description, price } = req.body;
    // Validations
    if (!productId || productId.trim() === '') {
        return res.status(400).json({
            error: 'The product must be a valid product.',
        });
    }
    if (!categoryId || categoryId.trim() === '') {
        return res.status(400).json({
            error: 'The product must belong to a valid category.',
        });
    }

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            error: 'The name of the product is required and must be a valid string.',
        });
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({
            error: 'The description of the product is required and must be a valid string.',
        });
    }

    if (!price || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({
            error: 'The price of the product is required and must be a positive integer.',
        });
    }
    //validation ends here
    try {
        const product = await Product.findByPk(productId);
        const category = await Category.findByPk(categoryId);
        if (!category || !product) {
            return res.status(400).json({
                error: 'Product is Invalid',
            });
        }
        if (req.file) {
            const productDir = path.join(__dirname, '..', `uploads/products/${productId}`);
            if (fs.existsSync(productDir)) {
                fs.rmSync(productDir, { recursive: true, force: true });
            }
            const imageDir = `uploads/products/${productId}`;
            fs.mkdirSync(imageDir, { recursive: true });
            fs.renameSync(req.file.path, path.join(imageDir, req.file.filename));

            await ProductImage.update({
                image_path: imagePath,
            }, { where: { product_id: productId } });
        }
        // update product without image
        await Product.update({
            category_id: categoryId,
            name: name,
            description: description,
            price: price,
        }, { where: { id: productId } });



    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(400).json({ message: 'Product is required' });
        }
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete image from uploads folder
        const productDir = path.join(__dirname, '..', `uploads/products/${productId}`);
        if (fs.existsSync(productDir)) {
            fs.rmSync(productDir, { recursive: true, force: true });
        }

        // Delete product and its metadata from database
        await product.destroy();
        const metaData = await ProductImage.findOne({ where: { product_id: productId } })
        await metaData.destroy();

    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });  // Internal server error
    }
};

const showproducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        const metaData = await ProductImage.findAll();
        res.json({
            data: {
                products,
                metaData,
            },
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });  // Internal server error
    }
};

module.exports = {
    addProduct, UpdateProduct, deleteProduct, showproducts
};