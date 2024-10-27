$(document).ready(function () {
    $.getJSON('../data/dataLog.json', function (data) {
        const logs = data.logs;
        const tableBody = $('table');

        console.log(logs);
        $.each(logs, function (index, log) {
            const row = `
                <tr>
                    <td>${log.namaDormitizen}</td>
                    <td>${log.namaPenerima}</td>
                    <td>${log.kamar}</td>
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
            tableBody.append(row);
        });

        // Update info data
        $('#data-info').text(
            `Menampilkan data 1 sampai ${logs.length} dari ${logs.length} data`
        );
    }).fail(function () {
        console.error('Error fetching data.');
    });
});
