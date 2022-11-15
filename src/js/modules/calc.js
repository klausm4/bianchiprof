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

    //initLocalSettings('.btn-outline-success', 'calc_item_active'); //временно не используем

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
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

    function getDynamicInformation(selector) {
        const max = 9999; //максимальная стоимость ингредиента
        //const min = 0;
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.addEventListener('input', () => {

                const value = elem.value;
                
                if (value > max) {
                    elem.value = max; //ограничиваем максимум в поле ввода
                // } else if (value < min) {
                //     elem.value = min;
                } else {
                    if (value.indexOf(".") != '-1') {
                        elem.value = +value.substring(0, value.indexOf(".") + 3); //отсекаем более 2х знаков после запятой
                      }
                };

                if (elem.value <= 0 || elem.value.trim() == '') { //проверяем на отрицательное или пустое значение
                    elem.classList.add('calc_alert'); //подсвечиваем рамкой неверные данные
                    resetCost(); //обнуляем расчеты при неверных данных
                } else {
                    elem.classList.remove('calc_alert');
                    calculateCost(getActiveModel()); //рассчитываем себестоимость
                };
            });
        });
    };
    getDynamicInformation('.price-item');

    function resetCost() {
        console.log('1');
        const elements = document.querySelectorAll('.text-end');
        elements.forEach(e => {
            console.log('2');
            e.innerHTML = '0,00 грн.';
        });
    };

    function getActiveModel() {
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
                || modelId === "calcNectaKoro" && receiptId === 'accordionNectaKoro') {
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
            const ingredients = Object.keys(receipt);
            ingredients.forEach(ingredient => { //ингредиенты
                const ingredientPrice = +price[ingredient];
                const weight = +receipt[ingredient];
                cost += ingredientPrice * weight;
            })
            const drinkElements = document.querySelectorAll('.' + key);
            drinkElements.forEach(e => {
                e.innerHTML = (Math.round(cost * 100) / 100).toFixed(2) + ' грн.';
            })
        });
    };

    function getReceipts(model) {
        const receiptsBianchiGaia = {
            espresso: {
                coffee: 0.0077,
                sugar: 0.004,
                cup180: 1
            },
            americano: {
                coffee: 0.0077,
                sugar: 0.008,
                cup180: 1
            },
            maxiLate: {
                coffee: 0.0077,
                milk: 0.018,
                sugar: 0.012,
                cup340: 1
            },
            cappuccino: {
                coffee: 0.0077,
                milk: 0.01,
                sugar: 0.008,
                cup180: 1
            },
            irishWhiskey: {
                irish: 0.02,
                cup180: 1
            },
            late: {
                coffee: 0.0077,
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

        const receiptsBianchiTalia = {
            espresso: {
                coffee: 0.0086,
                sugar: 0.004,
                cup180: 1
            },
            americano: {
                coffee: 0.0086,
                sugar: 0.008,
                cup180: 1
            },
            maxiLate: {
                coffee: 0.0086,
                milk: 0.018,
                sugar: 0.012,
                cup340: 1
            },
            cappuccino: {
                coffee: 0.0086,
                milk: 0.01,
                sugar: 0.008,
                cup180: 1
            },
            irishWhiskey: {
                irish: 0.02,
                cup180: 1
            },
            late: {
                coffee: 0.0086,
                milk: 0.014,
                sugar: 0.008,
                cup180: 1
            },
            maxiIrish: {
                irish: 0.03,
                cup340: 1
            },
            irishLate: {
                irish: 0.018,
                milk: 0.01,
                cup180: 1
            },
            blackIrish: {
                coffee: 0.0086,
                milk: 0.01,
                irish: 0.01,
                sugar: 0.004,
                cup180: 1
            },
            catalana: {
                irish: 0.02,
                cup180: 1
            },
            catalanaLate: {
                irish: 0.01,
                milk: 0.01,
                cup180: 1
            },
            maxiCatalana: {
                irish: 0.03,
                cup340: 1
            },
            macchiato: {
                coffee: 0.0086,
                milk: 0.01,
                sugar: 0.008,
                cup340: 1
            },
            americanoMilk: {
                coffee: 0.0086,
                milk: 0.01,
                sugar: 0.008,
                cup180: 1
            },
            maxiCappuccino: {
                coffee: 0.0086,
                milk: 0.014,
                sugar: 0.008,
                cup180: 1
            }
        };

        const receiptsNectaKoro = {
            espresso: {
                coffee: 0.009,
                sugar: 0.004,
                cup180: 1
            },
            americano: {
                coffee: 0.009,
                sugar: 0.008,
                cup180: 1
            },
            maxiLate: {
                coffee: 0.009,
                milk: 0.018,
                sugar: 0.012,
                cup340: 1
            },
            cappuccino: {
                coffee: 0.009,
                milk: 0.01,
                sugar: 0.008,
                cup180: 1
            },
            late: {
                coffee: 0.009,
                milk: 0.012,
                sugar: 0.008,
                cup180: 1
            },
            maxiCappuccino: {
                coffee: 0.009,
                milk: 0.016,
                sugar: 0.012,
                cup340: 1
            },
            americanoMilk: {
                coffee: 0.009,
                milk: 0.007,
                sugar: 0.008,
                cup180: 1
            },
            espressoMilk: {
                coffee: 0.009,
                milk: 0.005,
                sugar: 0.004,
                cup180: 1
            }
        };

        if (model === 'calcBianchiGaia') {
            return receiptsBianchiGaia;
        } else if (model === 'calcBianchiTalia') {
            return receiptsBianchiTalia;
        } else if (model === 'calcNectaKoro') {
            return receiptsNectaKoro;
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
};

export default calc;