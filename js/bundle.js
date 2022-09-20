/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms() {

    const message = { //набор сообщений
        success: 'Дякуємо! Чекайте на дзвінок менеджера!',
        failure: 'Спробуйте відправити повідомлення через декілька хвилин'
    };

    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('btn')) {
            clearPopup();
        };
    });

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', bindPostData);

        async function bindPostData(e) {
            e.preventDefault(); //убираем действия по умолчанию
            clearPopup();

            let prefix = '';
            const TOKEN = '5774145299:AAGy5P9iegkmnE51AWQBBCE9P-npbKCN4aY';
            const CHAT_ID = '-1001646707499';
            const URL_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;
            const data = new FormData(form); //получаем данные
            
            if (data.has('userNameModal')) {//Устанавливаем префикс имени поля для модального окна
                prefix = 'Modal';
            }

            const name = data.get('userName' + prefix);
            const telephone = data.get('telephone' + prefix);
            const direction = data.get('direction' + prefix);
            const city = data.get('city' + prefix);

            if (name.trim().length < 2) {
                const textContent = "Занадто коротке Ім'я";
                showPopup('userName' + prefix, textContent);
                return
            };

            if (telephone.length < 18) {
                const textContent = "Занадто короткий номер телефону";
                showPopup('telephone' + prefix, textContent);
                return
            };

            if (!direction) {
                const textContent = "Виберіть один з пунктів списку";
                showPopup('direction' + prefix, textContent);
                return
            };

            if (city.trim().length < 2) {
                const textContent = "Занадто коротка назва міста";
                showPopup('city' + prefix, textContent);
                return
            };

            if (localStorage.getItem('dispatchTime')) {
                const wait = 1000 * 60 * 15 //время ожидания между отправками
                const diff = new Date().getTime() - localStorage.getItem('dispatchTime');
                if (diff < wait) {
                    const minute = Math.ceil((wait - diff) / (1000 * 60));
                    const textContent = `Спробуйте відправити наступну заявку через ${minute} хвилин`;
                    showPopup('sendRequest' + prefix, textContent);
                    return
                };
            }

            form.classList.add('sending');

            let siteMessage = `<b>Заявка с сайта bianchiprof.com</b>\n`;
            siteMessage += `<b>Отправитель: </b> ${ name }\n`;
            siteMessage += `<b>Телефон: </b> ${ telephone }\n`;
            siteMessage += `<b>Направление: </b> ${ direction }\n`;
            siteMessage += `<b>Город: </b> ${ city }`;

            axios.post(URL_API, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: siteMessage
            })
            .then((res) => {
                showThanksModal(prefix, message.success);
                localStorage.setItem('dispatchTime', new Date().getTime());
            })
            .catch((err) => {
                showThanksModal(prefix, message.failure);
            })
            .finally(() => {
                form.classList.remove('sending');
                resetForm();
            })
            
            // let response = await fetch('sendmail.php', {
            //     method: 'POST',
            //     body: data
            // });

            // if (response.ok) {
            //     form.classList.remove('sending');
            //     showThanksModal(prefix, message.success);
            //     localStorage.setItem('dispatchTime', new Date().getTime());
            //     resetForm();
                
            // } else {
            //     form.classList.remove('sending');
            //     showThanksModal(prefix, message.failure);
            // };

        };
    });

    function clearPopup() {
        const popups = document.querySelectorAll('.popup');
        popups.forEach(element => {
            element.remove();
        });
    };

    function showPopup(trigger, text) {
        const popup = document.createElement('div');
        const element = document.getElementsByName(trigger);
        popup.className = "popup";
        popup.innerHTML = `<span class="popuptext show">${text}</span>`;

        element[0].before(popup);
    };

    function closeWindow(selector) {
        const modalWindow = document.querySelector(selector);
        const backdrop = document.querySelector('.modal-backdrop');
        const body = document.querySelector('body');
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        backdrop.className = 'hide';
        body.removeAttribute('style');
    };

    function showThanksModal(prefix, message) {  //отображаем новое модальное окно пользователю после ввода данных
        if (prefix === 'Modal') {
            closeWindow('#Modal');
        }
        document.querySelector('body').className = 'modal-open';
        document.querySelector('body').style.setProperty("overflow", "hidden");
        document.querySelector('body').style.setProperty("padding-right", "17px");

        const fade = document.createElement('div');

        fade.innerHTML = `
            <div class="modal-backdrop fade show">
            `;
        document.querySelector('body').append(fade);
        const thanksModal = document.createElement('div'); //формируем html нового окна

        thanksModal.innerHTML = `
            <div class="modal fade show" id="thanksModal" tabindex="-1" aria-labelledby="exampleThanksModalLabel" aria-modal="true" role="dialog" style="display: block">
                <div class="modal-dialog">
                    <div class="modal-content text-center green">
                        <form action="">
                            <h4 class="modal-title" id="exampleThanksModalLabel">${message}</h4>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('body').append(thanksModal);
        setTimeout(() => {
            closeWindow('#thanksModal'); //закрываем модальное окно
            thanksModal.remove();
            resetForm();
        }, 3000);
    };

    function resetForm() {
        const resetForms = document.querySelectorAll('form');
        resetForms.forEach(e => {
            e.reset();
        });
    };

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        const minLength = (selector === '#validationTelephone' || selector === '#validationTelephoneModal') ? 13 : 2;
        input.addEventListener('input', () => {
            if (input.value.trim().length < minLength) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = null;
            }
        });
    };

    try {
        getDynamicInformation('#validationName');
        getDynamicInformation('#validationTelephone');
    } catch {
        ///////
    };

    getDynamicInformation('#validationNameModal');
    getDynamicInformation('#validationTelephoneModal');

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function telephoneMask () {
    [].forEach.call(document.querySelectorAll('.tel'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+38 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (telephoneMask);

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (navbar);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_TelephoneMask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _modules_navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);




window.addEventListener('DOMContentLoaded', () => {
   
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_TelephoneMask__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_navbar__WEBPACK_IMPORTED_MODULE_2__["default"])();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map