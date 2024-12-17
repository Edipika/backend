const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `public/uploads`;
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = file.originalname;
        cb(null, `${uniqueSuffix}`);
    },
});

// Initialize Multer middleware
const upload = multer({ storage: storage });
module.exports = upload;

