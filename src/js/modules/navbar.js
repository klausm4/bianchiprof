function navbar() {

    window.addEventListener('scroll', e => {
        const navbar = document.getElementById('navbar').classList;
        const active_class = 'navbar-opacity';
        if (scrollY > 100) {
            navbar.add(active_class);
        } else {
            navbar.remove(active_class);
        };
    })
};

export default navbar;
