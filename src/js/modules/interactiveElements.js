function interactiveElements() {

    window.addEventListener('scroll', e => {
        const navbarClassList = document.querySelector('#navbar').classList;
        const logoClassList = document.querySelector('#logo1').classList;
        const sidepanelClassList = document.querySelector('.sidepanel__wrapper').classList;
        
        const active_class_navbar = 'navbar-transform';
        const active_class_sidepanel = 'sidepanel-transform';
        const active_class_logo = 'logo1-transform';
        
        if (scrollY > 100) { //делаем навбар полупрозрачным при прокрутке
            navbarClassList.add(active_class_navbar);
        } else {
            navbarClassList.remove(active_class_navbar);
        };

        if (window.pageYOffset < 1) { //анимируем логотип при прокрутке в начало страницы
            logoClassList.add(active_class_logo);
            setTimeout(() => {
                logoClassList.remove(active_class_logo);
            }, 500);
        };

        //прячем панель соцсетей при прокрутке в конец страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 320) { 
            sidepanelClassList.add(active_class_sidepanel);
        } else {
            sidepanelClassList.remove(active_class_sidepanel);
        };
    })
};

export default interactiveElements;
