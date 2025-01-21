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

const deleteUsers = async (req, res) => {
    console.log('Inside deleteUsers function');
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // 404: Not Found
        }

        await user.destroy();

        res.status(200).json({ message: `Account deleted successfully!` });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' }); // 500: Internal Server Error
    }
};


module.exports = {
    getUsers, getAdmins, deleteUsers
}