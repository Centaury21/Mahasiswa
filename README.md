# Aplikasi CRUD Mahasiswa (Firebase Native JAMstack)

Ini adalah aplikasi web CRUD (Create, Read, Update, Delete) sederhana untuk mengelola data mahasiswa. Proyek ini dibangun menggunakan arsitektur "native" JAMstack (Client-Side Rendering), di mana *frontend* (HTML/JS statis) berkomunikasi langsung dengan API *backend* yang disediakan oleh Firebase (Firestore).

Proyek ini memenuhi semua kriteria *submission*, termasuk *deployment* ke *platform* yang disarankan (Firebase).

##  Deployment Link

Aplikasi ini sudah di-deploy menggunakan Firebase Hosting dan dapat diakses secara online di:

**[https://mahasiswa-46dcc.web.app/](https://mahasiswa-46dcc.web.app/)** *(Ganti dengan URL Firebase kamu jika beda)*

---

##  Fitur (Features)

* **Create:** Menambah data mahasiswa baru melalui *input form*.
* **Read:** Menampilkan daftar semua mahasiswa dari database Firestore secara *real-time*.
* **Update:** Mengedit data mahasiswa yang sudah ada di halaman terpisah.
* **Delete:** Menghapus data mahasiswa dari database dengan konfirmasi.
* **Dynamic UI:** Tampilan tabel diperbarui secara dinamis setelah aksi C, U, atau D tanpa perlu *refresh* halaman.
* **API-driven:** Data disimpan dan diambil langsung melalui Firebase SDK (API), memenuhi syarat "Data saved via API".
* **Multi-Page:** Aplikasi memiliki 3 *views* (List, Input Form, Edit Form).

---

##  Teknologi yang Digunakan

* **Frontend:** HTML5, Tailwind CSS (via CDN)
* **JavaScript:** Vanilla JavaScript (ES6 Modules) untuk *logic* *client-side*.
* **Backend & Database:** Firebase (Firestore Database) sebagai *Backend-as-a-Service* (BaaS).
* **Hosting:** Firebase Hosting.

---

## Setup Instruksi (Lokal)

Untuk menjalankan proyek ini di komputer lokal:

1.  **Clone repositori:**
    ```bash
    git clone [https://github.com/Centaury21/Mahasiswa.git](https://github.com/Centaury21/Mahasiswa.git)
    cd Mahasiswa
    ```

2.  **Buat Proyek Firebase:**
    * Pergi ke [Firebase Console](https://console.firebase.google.com/) dan buat proyek baru.
    * Aktifkan **Firestore Database** dan mulai dalam **Test Mode** (atau atur *Rules* secara manual).
    * Buat *collection* (koleksi) dengan nama **`mahasiswa`** (wajib huruf kecil).

3.  **Setup Kunci API:**
    * Di pengaturan proyek Firebase, dapatkan objek `firebaseConfig`.
    * Di *folder* lokal, buat *file* baru: `public/js/config.js`.
    * Isi `config.js` dengan kode ini (ganti dengan kunci kamu):
        ```javascript
        export const firebaseConfig = {
          apiKey: "AIza...",
          authDomain: "...",
          projectId: "...",
          // ...dst
        };
        ```
    * *(File ini sudah ada di `.gitignore` agar kunci rahasia tidak ter-upload ke GitHub)*.

4.  **Jalankan Proyek:**
    * Karena ini proyek *native* (statis), kamu tidak perlu `npm start`.
    * Cukup instal *extension* **Live Server** di VS Code.
    * Klik kanan pada `public/index.html` dan pilih **"Open with Live Server"**.

---

## Penjelasan Dukungan AI (AI Support Explanation)

Pengembangan proyek ini dibantu secara ekstensif oleh AI (Gemini) untuk mempercepat, melakukan *refactor*, dan mendokumentasikan proses pengembangan kode.

AI tidak disertakan dalam produk akhir, melainkan hanya digunakan selama fase pengembangan:

1.  **Pivot Arsitektur:**
    * Awalnya, proyek ini dibangun menggunakan Node.js/Express/EJS (Server-Side Rendering).
    * AI membantu mengidentifikasi bahwa arsitektur ini **tidak kompatibel** dengan instruksi *deployment* (Vercel/Firebase).
    * AI memandu proses ***refactor* total** (penulisan ulang) ke arsitektur JAMstack (Native HTML + JS Client-Side + Firebase API) agar *native* dan kompatibel dengan Firebase Hosting.

2.  **Debugging Kritis:**
    * AI sangat krusial dalam men-debug *error* *environment* lokal yang kompleks (`npm error could not determine executable`) yang menghalangi instalasi Tailwind.
    * AI membantu men-debug *error* *SyntaxError* (`export const firebaseConfig`) dan *logic error* struktur data Firestore (`dbMahasiswa` vs `mahasiswa`).

3.  **Generasi Kode & Dokumentasi:**
    * AI membantu membuat kerangka kode *client-side* `js/app.js` untuk *logic* CRUD menggunakan Firebase SDK.
    * AI membantu membuat kerangka *template* HTML dengan kelas Tailwind (yang kemudian dimodifikasi untuk CDN).
    * AI membantu menyusun kerangka `README.md` ini.
