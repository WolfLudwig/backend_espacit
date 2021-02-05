const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'});
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const relationRoutes = require('./routes/relation.routes');
const categoryRoutes = require('./routes/category.routes');
const ressourceTypeRoutes = require('./routes/ressourceType.routes');
const commentRoutes = require('./routes/comment.routes');

const mongoose = require('mongoose');
const {checkUser, requireAuth} = require('./controllers/verifyToken.controller');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//JWT
app.get('*', requireAuth);
app.post('*', requireAuth);
app.patch('*', requireAuth);


app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/relation', relationRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/ressourceType', ressourceTypeRoutes);
app.use('/api/comment', commentRoutes);
// app.get('/jwtid/:token', requireAuth, (req, res) => {
//     console.log("dans le requireAuth")
//   });

//Routes





mongoose.connect('mongodb+srv://Admin_1:theBoys123@cluster0.pqby2.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



module.exports = app;