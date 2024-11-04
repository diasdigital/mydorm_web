function openTab(event, tabName) {
    // Sembunyikan semua konten tab
    $('.tab-content').hide();

    // Hapus kelas "active" dari semua link tab
    $('.tab-link').removeClass('active');

    // Tampilkan konten tab yang dipilih dan tambahkan kelas "active" ke tab link yang diklik
    $('#' + tabName).show();
    $(event.currentTarget).addClass('active');
}
