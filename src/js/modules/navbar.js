function navbar() {

    window.addEventListener('scroll', e => {
        const navbarClassList = document.querySelector('#navbar').classList;
        const active_class = 'navbar-opacity';
        if (scrollY > 100) {
            navbarClassList.add(active_class);
        } else {
            navbarClassList.remove(active_class);
        };
    })
};

export default navbar;
