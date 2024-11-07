let currentPage = 1; // Halaman saat ini
const itemsPerPage = 7; // Jumlah item per halaman
let totalPages = 0; // Total halaman
let data = []; // Menyimpan data

// Ambil data dari file JSON
$.getJSON('../data/dataPaket.json', function (fetchedData) {
    data = fetchedData; // Simpan data yang diambil
    totalPages = Math.ceil(data.length / itemsPerPage); // Hitung total halaman
    renderTable(); // Render tabel pertama kali
    updatePagination(); // Perbarui informasi pagination
});

// Fungsi untuk merender tabel dengan pagination
function renderTable() {
    $('#data-table tbody').empty(); // Kosongkan tabel sebelum merender
    const start = (currentPage - 1) * itemsPerPage; // Hitung index awal
    const end = start + itemsPerPage; // Hitung index akhir
    const paginatedItems = data.slice(start, end); // Ambil item untuk halaman ini

    $.each(paginatedItems, function (index, item) {
        const statusClass =
            item.status_pengembalian === 'Dikembalikan' ? 'Sudah' : 'Belum';
        const styleClass =
            item.status_pengembalian === 'Dikembalikan'
                ? 'label-sudah'
                : 'label-belum';

        // Memisahkan waktu dan tanggal untuk waktu_tiba
        const waktuArr_tiba = item.waktu_tiba.split(' ');
        const waktu_tiba = waktuArr_tiba[0]; // 09.10.23
        const tanggal_tiba = waktuArr_tiba[1] || ''; // 15/10/2024

        // Memisahkan waktu dan tanggal untuk waktu_diambil
        const waktuArr_diambil = item.waktu_diambil.split(' ');
        const waktu_diambil = waktuArr_diambil[0] || ''; // Tambahkan default jika undefined
        const tanggal_diambil = waktuArr_diambil[1] || '';

        $('#data-table tbody').append(`
            <tr>
                
                <td>
                    <div class="gambar">
                        <img src="/assets/images/paket.jpg " alt="Bukti" width="50", height="50">
                    </div>
                </td>
                <td>${item.nama_penerima}</td>
                <td>${item.pj_penerima}</td>
                <td>${item.pj_penyerahan}</td>
                <td>${item.kamar}</td>
                <td>${waktu_tiba}<br>${tanggal_tiba}</td>
                <td>${waktu_diambil}<br>${tanggal_diambil}</td>
                <td>
                    <button class="${styleClass}">
                        ${statusClass}
                    </button>
                </td>
                <td>
                    <a href="./editPaket.html">
                        <button class="edit-btn">Edit</button>
                    </a>
                    <button class="delete-btn">Hapus</button>
                </td>
            </tr>
        `);
    });
}

// Fungsi untuk memperbarui informasi pagination
function updatePagination() {
    $('.page-info').text(`Halaman ${currentPage} dari ${totalPages}`);
    $('.prev-page').prop('disabled', currentPage === 1); // Nonaktifkan tombol sebelumnya di halaman pertama
    $('.next-page').prop('disabled', currentPage === totalPages); // Nonaktifkan tombol berikutnya di halaman terakhir
}

// Event listener untuk tombol halaman
$('.prev-page').on('click', function () {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
        updatePagination();
    }
});

$('.next-page').on('click', function () {
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
        updatePagination();
    }
});

// Dropdown Logic
const dropdowns = $('.dropdown');

dropdowns.each(function () {
    const dropdown = $(this);
    const select = dropdown.find('.select');
    const caret = dropdown.find('.caret');
    const menu = dropdown.find('.menu');
    const options = dropdown.find('.menu li');
    const selected = dropdown.find('.selected');

    // Toggle menu saat select diklik
    select.on('click', function () {
        select.toggleClass('select-clicked');
        caret.toggleClass('caret-rotate');
        menu.toggleClass('menu-open');

        if (menu.hasClass('menu-open')) {
            const rect = select[0].getBoundingClientRect();
            menu.css({
                width: `${rect.width}px`, // Set lebar menu agar sama dengan select
                left: `${rect.left}px`, // Atur posisi kiri menu
                top: `${rect.bottom}px`, // Atur posisi atas menu di bawah select
            });
        }
    });

    // Menambahkan event listener pada setiap opsi
    options.on('click', function () {
        // Mengubah teks yang dipilih
        selected.text($(this).text());

        // Tutup menu dan reset class
        select.removeClass('select-clicked');
        caret.removeClass('caret-rotate');
        menu.removeClass('menu-open');

        // Menghapus kelas aktif dari semua opsi
        options.removeClass('active');

        // Menambahkan kelas aktif ke opsi yang dipilih
        $(this).addClass('active');
    });
});

// Event listener untuk menutup dropdown saat mengklik di luar elemen dropdown
$(document).on('click', function (event) {
    dropdowns.each(function () {
        const dropdown = $(this);
        const select = dropdown.find('.select');
        const caret = dropdown.find('.caret');
        const menu = dropdown.find('.menu');

        // Tutup menu jika klik berada di luar elemen select
        if (
            !dropdown.is(event.target) &&
            dropdown.has(event.target).length === 0
        ) {
            select.removeClass('select-clicked');
            caret.removeClass('caret-rotate');
            menu.removeClass('menu-open');
        }
    });
});
