$(document).ready(function () { 
    loadKamar();
    $(document).ready(function() {
        $('.container').on('click', function() {
            window.location.href = '../pages/detail-kamar.html'; // Ganti dengan nama file tujuan
        });
    });
});

function loadKamar() {
    for(let i = 4; i > 0; i--) {
        // Gunakan string interpolasi untuk memasukkan nilai 'i' ke dalam teks
        $("#col").append(`<h3>Lantai ${i}</h3>`);
        $("#col").append(`<div class='row' id='row${i}'></div>`);
        $(`#row${i}`).append(`<div class='grid' id='lantai${i}-row1'></div>`);
        $(`#row${i}`).append(`<div class="sizedbox-row"></div>`);
        $(`#row${i}`).append(`<div class='grid' id='lantai${i}-row2'></div>`); 
        $("#col").append(`<div class="sizedbox-col"></div>`);
    }
    
    for(let i = 4; i > 0; i--) { // Loop untuk lantai dari 4 sampai 1
        for(let j = 1; j <= 12; j++) { // Loop untuk menambahkan 12 container di setiap lantai
            if(j % 4 == 0){
                $(`#lantai${i}-row1`).append(`<div class='container' style="background-color:grey">${100 * i + j}</div>`); // Menambahkan container dengan nilai 100*i + j
            } else {
                $(`#lantai${i}-row1`).append(`<div class='container'>${100 * i + j}</div>`);
            }
        }
        for(let j = 13; j <= 24; j++) { // Loop untuk menambahkan 12 container di setiap lantai
            if(j % 4 == 0){
                $(`#lantai${i}-row2`).append(`<div class='container' style="background-color:grey">${100 * i + j}</div>`); // Menambahkan container dengan nilai 100*i + j
            } else {
                $(`#lantai${i}-row2`).append(`<div class='container'>${100 * i + j}</div>`);
            }
        }
    }    
    
}