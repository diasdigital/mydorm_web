$(document).ready(function () {
    loadTasks();
});

function loadTasks() {
    $.getJSON('../../data/dataMahasiswa.json', function (data) {
        if (data) {
            displayDataMahasiswa(data);
        }
    });
}

function displayDataMahasiswa(data) {
    var tableDetail = $('#detail-mahasiswa');
    tableDetail.empty();

    tableDetail.append(
        '<tr>' +
            '<th>Nama Penghuni</th>' +
            '<th>NIM</th>' +
            '<th>Program Studi</th>' +
            '<th>Agama</th>' +
            '<th>No HP Penghuni</th>' +
            '<th>No HP Orang Tua</th>' +
            '<th>Alamat Orang Tua</th>' +
            ' </tr>'
    );

    data.forEach(function (data) {
        let row = $('<tr></tr>');
        row.append($('<td></td>').text(data.nama));
        row.append($('<td></td>').text(data.nim));
        row.append($('<td></td>').text(data.prodi));
        row.append($('<td></td>').text(data.agama));
        row.append($('<td></td>').text(data.noHpPenghuni));
        row.append($('<td></td>').text(data.noHpOrangTua));
        row.append($('<td></td>').text(data.alamatOrangTua));
        tableDetail.append(row);
    });
}
