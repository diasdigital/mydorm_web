$(document).ready(function () {
    loadTasks();
    loadLog();
    loadPelanggaran();
});


function loadTasks() {
    $.getJSON('../../data/dataMahasiswa.json', function (data) {
        if (data) {
            displayDataMahasiswa(data);
        }
    });
}


function loadPelanggaran(){
    $.getJSON('../../data/dataPelanggarankamar.json', function (data) {
        if (data) {
            displayDataPelanggaranKamar(data);
        }
    });
   
}

function loadLog(){
    $.getJSON('../data/dataLog.json', function (data) {
        const logs = data.logs;
        const tableBody = $('#tabel-log');

        console.log(logs);
        $.each(logs, function (index, log) {
            
            const row = `
                <tr>
                    <td>${log.namaDormitizen}</td>
                    <td>${log.namaPenerima}</td>
                    <td>${log.waktu}</td>
                    <td><button class="activity-${log.aktivitas.toLowerCase()}">${
                log.aktivitas
            }</button></td>
                    <td>
                        <div class="single-log-actions">
                            <button class="single-action" id="edit">✏️</button>
                            <button class="single-action" id="delete">🗑️</button>
                        </div>
                    </td>
                </tr>
            `;
            if(log.kamar == 413){
                tableBody.append(row);
            }
            
        });

        // Update info data
        $('#data-info').text(
            `Menampilkan data kamar 413`
        );
    }).fail(function () {
        console.error('Error fetching data.');
    });
}

function displayDataPelanggaranKamar(data) {
    var container = $('#col-id');
    container.empty();

    data.forEach(function (item) {
        container.append('<h3>' + item.nama + '</h3>');

        if (item.pelanggaran.length > 0) {
            var table = $(
                '<table class="detail">' +
                    '<thead>' +
                        '<tr>' +
                            '<th>No</th>' +
                            '<th>Jenis</th>' +
                            '<th>Tanggal</th>' +
                            '<th>Bukti</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '</tbody>' +
                '</table>'
            );

            item.pelanggaran.forEach(function (pelanggaran, index) {
                let row = $('<tr></tr>');
                row.append($('<td></td>').text(index + 1));
                row.append($('<td></td>').text(pelanggaran.jenis));
                row.append($('<td></td>').text(pelanggaran.tanggal));
                row.append(
                    $('<td></td>').html(
                        '<img src="/assets/images/' + pelanggaran.bukti + '" alt="Bukti" width="50", height="50">'
                    )
                );

                table.find('tbody').append(row);
            });

            container.append(table);
            container.append('<div style="height:40px;"></div>');
        } else {
            container.append('<div style="height:10px;"></div>');
            container.append('<p>Tidak ada pelanggaran</p>');
            container.append('<div style="height:30px;"></div>');
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
        if(data.kamar == 413){
            tableDetail.append(row);
        }
    });
}


function openTab(event, tabName) {
    // Sembunyikan semua konten tab
    $('.tab-content').hide();

    // Hapus kelas "active" dari semua link tab
    $('.tab-link').removeClass('active');

    // Tampilkan konten tab yang dipilih dan tambahkan kelas "active" ke tab link yang diklik
    $('#' + tabName).show();
    $(event.currentTarget).addClass('active');
}