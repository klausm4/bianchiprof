function calc() {

    let coffeMachine = 'calcBianchiGaia'; //По умолчанию активна первая кофемашина

    function initLocalSettings(selector, activeClass) { //активизируем на сайте нужные элементы
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === coffeMachine) {
                elem.classList.add(activeClass);
            }

            // if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            //     elem.classList.add(activeClass);
            // }

        });
    };

    initLocalSettings('.btn-outline-success', 'calc_item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        let id;
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => { 
                // if (e.target.getAttribute('data-ratio')) { 
                //     ratio = +e.target.getAttribute('data-ratio');//получаем коэффициент по выбранной активности
                //     localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); //сохраняем значение в локал сторедж
                // } else {
                //     sex = e.target.getAttribute('id');
                //     localStorage.setItem('sex', e.target.getAttribute('id'));
                //     console.log(e.target.getAttribute('id'));
                // }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);//устанавливаем класс активности нужному элементу
                id = e.target.getAttribute('id');//получаем id для дальнейшего отображения нужных рецептов
                showReceipts(id);
                //calcTotal();
            });
        });
    };

    function showReceipts(Id) {
        const elements = document.querySelectorAll('.calc_receipts');
        elements.forEach(elem => {
            const elemId = elem.getAttribute('id');
            elem.classList.remove('show');
            if (Id === "calcBianchiGaia" && elemId === 'accordionBianchiGaia' 
             || Id === "calcBianchiTalia" && elemId === 'accordionBianchiTalia'
             || Id === "calcNectaCoro" && elemId === 'accordionBianchiCoro') {
                elem.classList.add('show');
            } 
            // elem.addEventListener('click', (e) => { 

                // if (e.target.getAttribute('data-ratio')) { 
                //     ratio = +e.target.getAttribute('data-ratio');//получаем коэффициент по выбранной активности
                //     localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); //сохраняем значение в локал сторедж
                // } else {
                //     sex = e.target.getAttribute('id');
                //     localStorage.setItem('sex', e.target.getAttribute('id'));
                //     console.log(e.target.getAttribute('id'));
                // }
                // elements.forEach(elem => {
                //     elem.classList.remove(activeClass);
                // });

                // e.target.classList.add(activeClass);//устанавливаем класс активности нужному элементу
                // showReceipts(activeClass);
                //calcTotal();
            // });
        });
    };

    getStaticInformation('.btn-outline-success', 'calc_item_active');
}

export default calc;