function includeComponents() {
    const includeElements = document.querySelectorAll('#header, #sidebar');

    includeElements.forEach((elm) => {
        const file = elm.getAttribute('id') + '.html'; // cari nama file

        // fetch file nya
        fetch(`components/${file}`)
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Component tidak ada: ' + file);
                }
            })
            .then((data) => {
                elm.innerHTML = data; // Tambahkan kedalam div

                // Toggle tampilan sidebar
                const allSideMenu = document.querySelectorAll(
                    '#sidebar .side-menu.top li a'
                );

                allSideMenu.forEach((item) => {
                    const li = item.parentElement;

                    item.addEventListener('click', () => {
                        allSideMenu.forEach((i) => {
                            i.parentElement.classList.remove('active');
                        });

                        li.classList.add('active');
                    });
                });

                // Toggle sidebar
                const burgerIcon = document.querySelector('#header > i');
                const sidebar = document.getElementById('sidebar');
                burgerIcon.addEventListener('click', () => {
                    sidebar.classList.toggle('hide');
                });
            })
            .catch((error) => {
                console.error(error);
            });
    });
}

// Jalankan pas konten sudah di load
document.addEventListener('DOMContentLoaded', includeComponents);
