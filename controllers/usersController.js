const { User } = require('../models');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users
        if (users.length === 0) {
            return res.status(204).json({ message: 'No users content' }); // No content
        }
        res.json(users); // Return the list of users
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' }); // Internal server error
    }
};


module.exports = {
    getAllUsers,

}