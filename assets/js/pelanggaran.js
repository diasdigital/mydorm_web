// Load data from JSON and display in the table
document.addEventListener("DOMContentLoaded", function () {
    fetch('../data/dataPelanggaran.json')
        .then(response => response.json())
        .then(data => {
            const dataTable = document.getElementById("dataTable");
            data.forEach(item => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${item.kamar}</td>
                    <td>${item.nama}</td>
                    <td class="progress-container">
                        ${item.pelanggaran}/${item.maxPelanggaran} 
                        <meter value="${item.pelanggaran}" max="${item.maxPelanggaran}"></meter>
                    </td>
                    <td><button class="detail-btn">Detail</button></td>
                `;

                dataTable.appendChild(row);
            });
        });
});
