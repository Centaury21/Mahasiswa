
import { firebaseConfig } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore, collection, getDocs, addDoc, doc,
    deleteDoc, getDoc, updateDoc, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const mahasiswaCollection = collection(db, "mahasiswa"); 

const path = window.location.pathname;


if (path === '/' || path.endsWith('/index.html')) {

    const tabelMahasiswa = document.getElementById('tabel-mahasiswa');
    const messageContainer = document.getElementById('message-container');

    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message) {
        messageContainer.innerHTML = `
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                ${message}
            </div>
        `;
    }

    const loadMahasiswa = async () => {
        tabelMahasiswa.innerHTML = '<tr><td colspan="4" class="p-4 text-center">Memuat data...</td></tr>';

        try {
            const q = query(mahasiswaCollection, orderBy("nim", "asc"));
            const querySnapshot = await getDocs(q);

            tabelMahasiswa.innerHTML = ''; 
            if (querySnapshot.empty) {
                tabelMahasiswa.innerHTML = '<tr><td colspan="4" class="p-4 text-center">Belum ada data.</td></tr>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const mhs = doc.data();
                const row = `
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-4">${mhs.nim}</td>
                        <td class="py-3 px-4">${mhs.nama}</td>
                        <td class="py-3 px-4">${mhs.jurusan}</td>
                        <td class="py-3 px-4 flex gap-2">
                            <a href="/edit.html?id=${doc.id}" class="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold py-1 px-3 rounded">Edit</a>
                            <button data-id="${doc.id}" class="btn-delete bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded">Hapus</button>
                        </td>
                    </tr>
                `;
                tabelMahasiswa.innerHTML += row;
            });
        } catch (err) {
            console.error(err);
            tabelMahasiswa.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-red-500">Gagal memuat data.</td></tr>';
        }
    };

    const handleDelete = async (e) => {
        if (e.target.classList.contains('btn-delete')) {
            const id = e.target.dataset.id;
            if (confirm('Yakin mau hapus data ini?')) {
                try {
                    await deleteDoc(doc(db, "mahasiswa", id));
                    loadMahasiswa(); // Muat ulang tabel
                } catch (err) {
                    console.error("Error menghapus: ", err);
                    alert('Gagal menghapus data');
                }
            }
        }
    };

    document.addEventListener('DOMContentLoaded', loadMahasiswa); 
    tabelMahasiswa.addEventListener('click', handleDelete); 
}

if (path.endsWith('/add.html')) {

    const formTambah = document.getElementById('form-tambah'); 

    const handleAdd = async (e) => {
        e.preventDefault(); 

        const data = {
            nim: formTambah.nim.value,
            nama: formTambah.nama.value,
            jurusan: formTambah.jurusan.value,
            email: formTambah.email.value,
            alamat: formTambah.alamat.value
        };

        try {
            await addDoc(mahasiswaCollection, data);

            window.location.href = '/index.html?message=Data Mahasiswa berhasil ditambahkan!';
        } catch (err) {
            console.error("Error menambah: ", err);
            alert('Gagal menambah data');
        }
    };

    formTambah.addEventListener('submit', handleAdd);
}

if (path.endsWith('/edit.html')) {

    const formEdit = document.getElementById('form-edit'); // Kita akan buat form ini

    // Ambil ID dari URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert('ID tidak ditemukan!');
        window.location.href = '/index.html';
    }

    const docRef = doc(db, "mahasiswa", id); // Referensi ke dokumen spesifik

    const loadDataForEdit = async () => {
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const mhs = docSnap.data();
                // Isi form dengan data yang ada
                formEdit.nim.value = mhs.nim;
                formEdit.nama.value = mhs.nama;
                formEdit.jurusan.value = mhs.jurusan;
                formEdit.email.value = mhs.email;
                formEdit.alamat.value = mhs.alamat;
                // Tampilkan nama di judul
                document.getElementById('nama-mahasiswa').innerText = mhs.nama;
            } else {
                alert('Data mahasiswa tidak ditemukan.');
                window.location.href = '/index.html';
            }
        } catch (err) {
            console.error("Error ambil data edit: ", err);
            alert('Gagal memuat data');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = {
            nim: formEdit.nim.value,
            nama: formEdit.nama.value,
            jurusan: formEdit.jurusan.value,
            email: formEdit.email.value,
            alamat: formEdit.alamat.value
        };

        try {
            await updateDoc(docRef, data);
            window.location.href = '/index.html?message=Data Mahasiswa berhasil diperbarui!';
        } catch (err) {
            console.error("Error update: ", err);
            alert('Gagal memperbarui data');
        }
    };

    document.addEventListener('DOMContentLoaded', loadDataForEdit);
    formEdit.addEventListener('submit', handleUpdate);
}