const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

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
const burgerIcon = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

burgerIcon.addEventListener('click', () => sidebar.classList.toggle('hide'));
