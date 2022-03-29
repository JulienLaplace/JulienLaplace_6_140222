// Importation
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connection à la base de donnée mongoose
mongoose.connect('mongodb+srv://P6:GN5xmqT564CI9RgN@cluster0.xm6ld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Parcage des objets json
app.use(express.json());

// Paramétrage des en-têtes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(bodyParser.json());

// Gestion des fichiers images
app.use('/images', express.static(path.join(__dirname,'images')));

// Routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// Exportation
module.exports = app;