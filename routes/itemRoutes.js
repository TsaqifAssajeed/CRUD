const express = require('express');
const router = express.Router();
const db = require('../database/database');

//Tambah item (CREATE)
router.post('/', (req, res) => {
    const { name, description, price } = req.body;
    db.run(
        `INSERT INTO items (name, description, price) VALUES (?, ?, ?)`,
        [name, description, price],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
});

// Lihat semua item (READ)
router.get('/', (req, res) => {
    db.all(`SELECT * FROM items`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
});

// Lihat detail item (READ by ID)
router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.get(`SELECT * FROM items WHERE id = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Item tidak ditemukan' });
        res.status(200).json(row);
    });
});

// Update item (UPDATE)
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const { name, description, price } = req.body;
    db.run(
        `UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?`,
        [name, description, price, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Item tidak ditemukan' });
            res.status(200).json({ message: 'Item berhasil diupdate' });
        }
    );
});

// Hapus item (DELETE)
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.run(`DELETE FROM items WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Item tidak ditemukan' });
        res.status(200).json({ message: 'Item berhasil dihapus' });
    });
});
            
module.exports = router;