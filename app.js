require('dotenv').config(); // Load the .env file before anything else
const express = require('express');
const cors = require('cors');
const app = express();
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/user-routes');
const registerRouter = require('./routes/register');
const authRouter = require('./routes/authRoutes');
const refreshRouter = require('./routes/refresh');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cartRoutes');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');


const corsOptions = {
  origin: 'http://localhost:3000', // Allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow sending credentials (cookies, Authorization header)
};

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/cart',verifyJWT, cartRoutes);
app.use('/api',verifyJWT, userRoutes);

app.post('/logout', (req, res) => {
  console.error('logged out');
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
  res.sendStatus(200); 
});


app.use('/', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh',verifyJWT, refreshRouter);


// app.use(verifyJWT);
app.use('/users', require('./routes/users'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





