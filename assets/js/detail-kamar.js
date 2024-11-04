$(document).ready(function () {
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
});

function openTab(event, tabName) {
    // Sembunyikan semua konten tab
    $('.tab-content').hide();

    // Hapus kelas "active" dari semua link tab
    $('.tab-link').removeClass('active');

    // Tampilkan konten tab yang dipilih dan tambahkan kelas "active" ke tab link yang diklik
    $('#' + tabName).show();
    $(event.currentTarget).addClass('active');
}
