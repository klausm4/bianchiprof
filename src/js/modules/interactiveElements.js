function interactiveElements() {

    window.addEventListener('scroll', e => {
        const navbarClassList = document.querySelector('#navbar').classList;
        const logo1ClassList = document.querySelector('#logo1').classList;
        const sidepanelClassList = document.querySelector('.sidepanel__wrapper').classList;
        
        const active_class_navbar = 'navbar-transform';
        const active_class_sidepanel = 'sidepanel-transform';
        const active_class_logo1 = 'logo1-transform';
        
        if (scrollY > 100) {
            navbarClassList.add(active_class_navbar);
        } else {
            navbarClassList.remove(active_class_navbar);
        };

        if (window.pageYOffset < 1) {
            console.log(window.pageYOffset);
            logo1ClassList.add(active_class_logo1);
            setTimeout(() => {
                logo1ClassList.remove(active_class_logo1);
            }, 500);
        };

        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 400) {
            sidepanelClassList.add(active_class_sidepanel);
        } else {
            sidepanelClassList.remove(active_class_sidepanel);
        }
    })
};

export default interactiveElements;
