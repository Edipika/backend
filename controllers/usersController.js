const { User } = require('../models');

const getAdmins = async (req, res) => {
    console.log('Inside getUsers function');
    try {
        const admins = await User.findAll({
            where: {
                role: 2
            }
        }); // Fetch all admins
        if (admins.length === 0) {
            return res.status(204).json({ message: 'No admins content' }); // No content
        }
        res.json(admins); // Return the list of admins
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Internal server error' }); // Internal server error
    }
};

const getUsers = async (req, res) => {
    console.log('Inside getUsers function');
    try {
        const users = await User.findAll({
            where: {
                role: 3
            }
        }); // Fetch all users
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
    getUsers, getAdmins
}