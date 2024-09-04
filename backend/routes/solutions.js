const express = require('express');
const router = express.Router();
const db = require('../db');

// Route pour créer une solution
router.post('/', (req, res) => {
    const { title, description, icon, image } = req.body;

    if (!title || !description || !icon || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO solutions (title, description, icon, image) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, icon, image], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: 'Solution created successfully', id: result.insertId });
    });
});

// Route pour obtenir toutes les solutions
router.get('/', (req, res) => {
    const query = 'SELECT * FROM solutions';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(results);
    });
});

// Route pour obtenir une solution par ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM solutions WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Solution not found' });
        }
    });
});

// Route pour mettre à jour une solution
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, icon, image } = req.body;

    const query = 'UPDATE solutions SET title = ?, description = ?, icon = ?, image = ? WHERE id = ?';
    db.query(query, [title, description, icon, image, id], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Solution updated successfully' });
        } else {
            res.status(404).json({ message: 'Solution not found' });
        }
    });
});

// Route pour supprimer une solution
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM solutions WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Solution deleted successfully' });
        } else {
            res.status(404).json({ message: 'Solution not found' });
        }
    });
});

module.exports = router;
