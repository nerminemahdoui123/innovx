const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');




app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Définir le répertoire des fichiers statiques pour form application jobs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Configurer la connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Importer les routes
const blogRoutes = require('./routes/blogs');
const solutionRoutes = require('./routes/solutions');
const chatbotRoutes = require('./routes/chatbot');





// Utiliser les routes
app.use('/blogs', blogRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/chatbot', chatbotRoutes);



//api pour login d'admin
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    db.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length > 0) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

//Jobs api
// Créer une nouvelle offre d'emploi
app.post('/jobs', (req, res) => {
    const { title, description, location, type, company } = req.body;
    const query = 'INSERT INTO jobs (title, description, location, type, company) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, description, location, type, company], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: 'Job created successfully', id: result.insertId });
    });
});

// Obtenir toutes les offres d'emploi
app.get('/jobs', (req, res) => {
    const query = 'SELECT * FROM jobs';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(results);
    });
});

// Obtenir une offre d'emploi par ID
app.get('/jobs/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM jobs WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    });
});

// Mettre à jour une offre d'emploi
app.put('/jobs/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, location, type, company } = req.body;
    const query = 'UPDATE jobs SET title = ?, description = ?, location = ?, type = ?, company = ? WHERE id = ?';
    db.query(query, [title, description, location, type, company, id], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Job updated successfully' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    });
});;

// Supprimer une offre d'emploi
app.delete('/jobs/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM jobs WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Job deleted successfully' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    });
});


//api for email send

// pour l'email de job application
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });
  
 // Configurez le transporteur Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisez le service de votre choix (Gmail, Outlook, etc.)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  app.post('/send-application', upload.fields([{ name: 'cv' }, { name: 'coverLetter' }]), (req, res) => {
    const { firstName, lastName, email, phone, address, description, experience, dateAvailable, country, jobTitle } = req.body;
    const cv = req.files['cv'] ? req.files['cv'][0].filename : '';
    const coverLetter = req.files['coverLetter'] ? req.files['coverLetter'][0].filename : '';
  
    const mailOptions = {
      from: 'mahdoui.nermine@gmail.com',
      to: 'mahdoui.nermine@gmail.com',
      subject: `Application for ${jobTitle}`,
      html: `
        <h3>Candidature Details </h3>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Date Available:</strong> ${dateAvailable}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>CV:</strong> <a href="http://localhost:8081/uploads/${cv}">Download CV</a></p>
        <p><strong>Cover Letter:</strong> <a href="http://localhost:8081/uploads/${coverLetter}">Download Cover Letter</a></p>
      `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send('Error sending email');
      }
      res.status(200).send('Email sent successfully');
    });
   
      
  });
   //for contact
   app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;
  
    const mailOptions = {
      from: email,
      to: 'mahdoui.nermine@gmail.com',
      subject: 'Contact Form InnovX',
      html: `
        <h3>Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      }
      res.status(200).send('Email sent successfully');
    });
  });
  


// Lancer le serveur
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
