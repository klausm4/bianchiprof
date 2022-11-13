function calc() {

    let coffeMachine = 'calcBianchiGaia'; //По умолчанию активна первая кофемашина

    function initLocalSettings(selector, activeClass) { //активизируем на сайте нужные элементы
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === coffeMachine) {
                elem.classList.add(activeClass);
            };
        });
    };

    initLocalSettings('.btn-outline-success', 'calc_item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
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
                const id = e.target.getAttribute('id');//получаем id для дальнейшего отображения нужных рецептов
                showReceipts(id);//отображаем рецепты согласно выбранной модели КМ
                //calcTotal();
            });
        });
    };
    getStaticInformation('.btn-outline-success', 'calc_item_active');

    function getDynamicInformation(selector){
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.addEventListener('input', () => {
                calculateCost(getActiveModel());
            });
        });
    };
    getDynamicInformation('.price-item');

    function getActiveModel(){
        const activeModel = document.querySelector('.calc_item_active').id;
        return activeModel;
    };

    function showReceipts(modelId) {
        const elements = document.querySelectorAll('.calc_receipts');
        elements.forEach(e => {
            const receiptId = e.getAttribute('id');
            e.classList.remove('show');
            if (modelId === "calcBianchiGaia" && receiptId === 'accordionBianchiGaia'
                || modelId === "calcBianchiTalia" && receiptId === 'accordionBianchiTalia'
                || modelId === "calcNectaCoro" && receiptId === 'accordionBianchiCoro') {
                e.classList.add('show');
            };
        });
        calculateCost(modelId);
    };

    function calculateCost(modelId) {
        const price = getPrice();
        const receipts = getReceipts(modelId);
        
        const drinks = Object.keys(receipts);
        drinks.forEach(key => {
            let cost = 0;
            const receipt = receipts[key]; //напитки
            // console.log(key)//напиток
            const ingredients = Object.keys(receipt);
            ingredients.forEach(ingredient => { //ингредиенты
                const ingredientPrice = +price[ingredient];
                const weight = +receipt[ingredient];
                cost += ingredientPrice * weight;
            })
            // console.log(Math.floor(cost*100) / 100)
            const drinkElements = document.querySelectorAll('.'+ key);
            drinkElements.forEach(e => {
                //console.log(e)
                e.innerHTML = (Math.round(cost*100) / 100).toFixed(2) + ' грн.';
            })
        });
    };

    function getReceipts(model){
        const receiptsBianchiGaia = {
            espresso: {
                coffee: 0.0077,
                sugar: 0.004,
                cup180: 1
            },
            americano: {
                coffee:  0.0077,
                sugar: 0.008,
                cup180: 1
            },
            maxiLate: {
                coffee:  0.0077,
                milk: 0.018,
                sugar: 0.012,
                cup340: 1
            },
            cappuccino: {
                coffee:  0.0077,
                milk: 0.01,
                sugar: 0.008,
                cup180: 1
            },
            irishWhiskey: {
                irish: 0.02,
                cup180: 1
            },
            late: {
                coffee:  0.0077,
                milk: 0.012,
                sugar: 0.008,
                cup180: 1
            },
            maxiIrish: {
                irish: 0.03,
                cup340: 1
            },
            irishLate: {
                irish: 0.02,
                milk: 0.01,
                cup180: 1
            }
        };
        if (model === 'calcBianchiGaia') {
            return receiptsBianchiGaia;
        } else if (model === 'calcBianchiTalia') {
            return receiptsBianchiGaia;
        } else if (model === 'calcNectaCoro') {
            return receiptsBianchiGaia;
        };
    };

    function getPrice() {
        const ingredients = ['coffee', 'milk', 'irish', 'sugar', 'cup180', 'cup340'];
        const price = {};
        ingredients.forEach(e => {
            price[e] = document.getElementById(e).value;
        })
        return price;
    };

}

export default calc;