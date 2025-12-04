// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// =========================
// CREATE
// =========================
app.post('/api/mahasiswa', async (req, res) => {
  try {
    const { nama, nim, jurusan, alamat } = req.body;
    await pool.query(
      'INSERT INTO mahasiswa (nama, nim, jurusan, alamat) VALUES ($1, $2, $3, $4)',
      [nama, nim, jurusan, alamat]
    );
    res.json({ pesan: "Data berhasil ditambah" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// READ (Pagination + Search)
// =========================
app.get('/api/mahasiswa', async (req, res) => {
  try {
    const halaman = parseInt(req.query.halaman) || 1;
    const limit = 5; 
    const search = req.query.cari ? `%${req.query.cari}%` : '%%';
    const offset = (halaman - 1) * limit;

    const total = await pool.query(
      `SELECT COUNT(*) FROM mahasiswa 
       WHERE nama ILIKE $1 OR nim ILIKE $1`,
      [search]
    );

    const data = await pool.query(
      `SELECT * FROM mahasiswa 
       WHERE nama ILIKE $1 OR nim ILIKE $1
       ORDER BY id DESC
       LIMIT $2 OFFSET $3`,
      [search, limit, offset]
    );

    res.json({
      halaman,
      total: Number(total.rows[0].count),
      halaman_total: Math.ceil(total.rows[0].count / limit),
      data: data.rows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// GET ONE
// =========================
app.get('/api/mahasiswa/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      "SELECT * FROM mahasiswa WHERE id=$1",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// UPDATE
// =========================
app.put('/api/mahasiswa/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { nama, nim, jurusan, alamat } = req.body;

    await pool.query(
      `UPDATE mahasiswa SET nama=$1, nim=$2, jurusan=$3, alamat=$4 WHERE id=$5`,
      [nama, nim, jurusan, alamat, id]
    );

    res.json({ pesan: "Data berhasil diupdate" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// DELETE
// =========================
app.delete('/api/mahasiswa/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM mahasiswa WHERE id=$1", [id]);
    res.json({ pesan: "Data berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server berjalan di http://localhost:3000"));
