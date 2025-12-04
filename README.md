# CRUD Mahasiswa

Project ini adalah aplikasi web sederhana untuk melakukan pengolahan data mahasiswa menggunakan operasi CRUD (Create, Read, Update, Delete). Aplikasi ini dibuat menggunakan Node.js dan Express sebagai backend, PostgreSQL sebagai database, serta HTML, CSS, dan JavaScript murni (tanpa library) pada bagian frontend. Seluruh proses pengelolaan data dilakukan menggunakan REST API dan seluruh interaksi halaman seperti pengambilan data tabel, pencarian, penambahan, pengeditan, dan penghapusan dilakukan secara asynchronous menggunakan AJAX (fetch API), sehingga halaman tidak perlu direfresh.

Aplikasi ini dapat menampilkan data mahasiswa dalam bentuk tabel yang dilengkapi fitur pagination, sehingga data tidak ditampilkan sekaligus dan dapat dinavigasi dengan tombol Next dan Previous. Selain itu, terdapat fitur pencarian real-time (live search), di mana pengguna dapat mencari mahasiswa berdasarkan nama secara langsung tanpa harus menekan tombol apapun. Saat pengguna mengetik, frontend akan mengirim request ke backend dan menampilkan hasil pencarian secara otomatis.

Struktur data mahasiswa terdiri dari: nama, NIM, jurusan, dan alamat. Semua proses penambahan, pengeditan, dan penghapusan data dilakukan melalui endpoint REST API yang terhubung langsung ke PostgreSQL.

Struktur folder project ini adalah sebagai berikut:

crud-mahasiswa/
│ server.js -> server utama Express + routing API
│ db.js -> konfigurasi koneksi PostgreSQL
│ package.json -> informasi project & dependencies
│
└── public/ -> file yang diakses browser
├── index.html -> tampilan utama
├── style.css -> styling tampilan
└── script.js -> logika frontend & AJAX


Untuk menjalankan project ini, pertama install dependensi menggunakan `npm install`, lalu buat database PostgreSQL dengan tabel mahasiswa dan sesuaikan konfigurasi koneksi pada file `db.js`. Setelah itu jalankan server menggunakan `npm start` dan akses aplikasi melalui `http://localhost:3000`.

Project ini dibuat sebagai tugas perbaikan dengan ketentuan: CRUD satu entitas, pagination, live search, REST API backend, serta AJAX menggunakan JavaScript murni tanpa bantuan library.
