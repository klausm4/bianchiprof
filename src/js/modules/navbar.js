function navbar() {

    window.addEventListener('scroll', e => {
        const navbarClasslist = document.querySelector('#navbar').classList;
        const active_class = 'navbar-opacity';
        if (scrollY > 100) {
            navbarClasslist.add(active_class);
        } else {
            navbarClasslist.remove(active_class);
        };
    })
};

export default navbar;
