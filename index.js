const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });

const {
  registerUser,
  loginUser,
  getUserCredentials,
  logoutUser,
} = require('./controllers/auth');
const {
  createPost,
  getAllPosts,
  getSingleBlogPost,
  editPost,
  deletePost,
} = require('./controllers/post');

dotenv.config();
const app = express();

// app.use(cors());
app.use(cors({ credentials: true, origin: process.env.SERVER_URL })); //if we're using credentials, we specify more information
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads')); //to display our images stored in the uploads folder on the frontend
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/profile', getUserCredentials);
app.post('/logout', logoutUser);
app.post('/post', uploadMiddleware.single('file'), createPost); //file is what we saved our image file property name in our frontend
app.get('/post', getAllPosts);
app.get('/post/:id', getSingleBlogPost);
app.put('/post/:id', uploadMiddleware.single('file'), editPost);
app.delete('/post/:id', deletePost);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
