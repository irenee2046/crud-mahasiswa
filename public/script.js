let halaman = 1;

async function loadData() {
    const cari = document.getElementById("cari").value;
    const res = await fetch(`/api/mahasiswa?halaman=${halaman}&cari=${cari}`);
    const data = await res.json();

    document.getElementById("halaman").innerText =
        `Halaman ${data.halaman} / ${data.halaman_total}`;

    let html = "";
    data.data.forEach(m => {
        html += `
            <tr>
                <td>${m.nama}</td>
                <td>${m.nim}</td>
                <td>${m.jurusan}</td>
                <td>${m.alamat}</td>
                <td>
                    <button class="btn btn-warning" onclick="editData(${m.id})">Edit</button>
                    <button class="btn btn-danger" onclick="hapusData(${m.id})">Hapus</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("tabelData").innerHTML = html;
}

function nextPage() {
    halaman++;
    loadData();
}

function prevPage() {
    if (halaman > 1) halaman--;
    loadData();
}

function cariData() {
    halaman = 1;
    loadData();
}

async function simpanData() {
    const data = {
        nama: document.getElementById("nama").value,
        nim: document.getElementById("nim").value,
        jurusan: document.getElementById("jurusan").value,
        alamat: document.getElementById("alamat").value
    };

    await fetch('/api/mahasiswa', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    loadData();
}

async function editData(id) {
    const res = await fetch(`/api/mahasiswa/${id}`);
    const m = await res.json();

    document.getElementById("nama").value = m.nama;
    document.getElementById("nim").value = m.nim;
    document.getElementById("jurusan").value = m.jurusan;
    document.getElementById("alamat").value = m.alamat;

    document.querySelector(".btn-primary").innerText = "Update";
    document.querySelector(".btn-primary").onclick = () => updateData(id);
}

async function updateData(id) {
    const data = {
        nama: document.getElementById("nama").value,
        nim: document.getElementById("nim").value,
        jurusan: document.getElementById("jurusan").value,
        alamat: document.getElementById("alamat").value
    };

    await fetch(`/api/mahasiswa/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    document.querySelector(".btn-primary").innerText = "Simpan";
    document.querySelector(".btn-primary").onclick = simpanData;

    loadData();
}

async function hapusData(id) {
    if (!confirm("Yakin ingin menghapus?")) return;

    await fetch(`/api/mahasiswa/${id}`, { method: "DELETE" });
    loadData();
}

loadData();
