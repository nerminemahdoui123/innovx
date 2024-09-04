const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Get all blogs
router.get('/', (req, res) => {
    const query = 'SELECT * FROM blogs';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(results);
    });
});

// Get a single blog by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM blogs WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    });
});

// Create a new blog
router.post('/', (req, res) => {
    const { title, date, image, content } = req.body;
    const query = 'INSERT INTO blogs (title, date, image, content) VALUES (?, ?, ?, ?)';
    db.query(query, [title, date, image, content], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: 'Blog created successfully', id: result.insertId });
    });
});

// Update an existing blog
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, date, image, content } = req.body;
    const query = 'UPDATE blogs SET title = ?, date = ?, image = ?, content = ? WHERE id = ?';
    db.query(query, [title, date, image, content, id], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Blog updated successfully' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    });
});

// Delete a blog
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM blogs WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Blog deleted successfully' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    });
});

module.exports = router;
