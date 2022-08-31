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
function forms(triggerSelector, nameSelector, telephoneSelector, directionSelector, citySelector, popupSelector) {

    const requestButton = document.querySelector(triggerSelector);
    const message = { //набор сообщений
        success: 'Дякуємо! Чекайте на дзвінок менеджера!',
        failure: 'Что-то пошло не так'
    };

    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('btn')) {
            clearPopup();
        };
    });

    requestButton.addEventListener('click', (e) => {

        const name = document.querySelector(nameSelector).value;
        const telephone = document.querySelector(telephoneSelector).value;
        const direction = document.querySelector(directionSelector).value;
        const city = document.querySelector(citySelector).value;
        const popup = document.querySelector(popupSelector);

        e.preventDefault();
        clearPopup();

        if (name.trim().length < 2) {
            const textContent = "Занадто коротке Ім'я";
            showPopup(nameSelector, textContent);
            return
        };

        if (telephone.length < 18) {
            const textContent = "Занадто короткий номер телефону";
            showPopup(telephoneSelector, textContent);
            return
        };

        if (!direction) {
            const textContent = "Виберіть один з пунктів списку";
            showPopup(directionSelector, textContent);
            return
        };

        if (!city) {
            const textContent = "Виберіть один з пунктів списку";
            showPopup(citySelector, textContent);
            return
        };

        if (localStorage.getItem('dispatchTime')) {
            const wait = 1000 * 60 * 15 //время ожидания между отправками
            const diff = new Date().getTime() - localStorage.getItem('dispatchTime');
            if (diff < wait) {
                const minute = Math.ceil((wait - diff) / (1000 * 60));
                const textContent = `Спробуйте відправити наступну заявку через ${minute} хвилин`;
                showPopup(popupSelector, textContent);
                return
            };
        }
        sendRequest(name, telephone, direction, city);
    });

    function clearPopup() {
        const popups = document.querySelectorAll('.popuptext');
        popups.forEach(element => {
            element.classList.remove('show');
        });
    }

    function showPopup(trigger, text) {
        const popup = document.querySelector(trigger + 'Popup');
        popup.textContent = text;
        popup.classList.toggle('show');
    }

    const sendRequest = (name, telephone, direction, city) => {
        console.log(name, telephone, direction, city);
        showThanksModal(triggerSelector, message.success);
        localStorage.setItem('dispatchTime', new Date().getTime());
    };

    function closeWindow(id) {
        document.querySelector('body').className = '';
        document.querySelector('body').style.removeProperty("overflow");
        document.querySelector('body').style.removeProperty("padding-right");
        document.querySelector(id).className = 'modal fade';
        document.querySelector(id).style.setProperty('display', 'none');
        document.querySelector('.modal-backdrop').remove();
    };

    function showThanksModal(selector, message) {  //отображаем новое модальное окно пользователю после ввода данных
        if (selector === '.send-request-modal') {
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
                    <div class="modal-content">
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
        document.querySelector('#validationName').value = '';
        document.querySelector('#validationTelephone').value = '';
        document.querySelector('#validationDirection').value = '';
        document.querySelector('#validationCity').value = '';

        document.querySelector('#validationNameModal').value = '';
        document.querySelector('#validationTelephoneModal').value = '';
        document.querySelector('#validationDirectionModal').value = '';
        document.querySelector('#validationCityModal').value = '';
    };

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        const minLength = (selector === '#validationTelephone' || selector === '#validationTelephoneModal') ? 18 : 2;
        input.addEventListener('input', () => {
            if (input.value.trim().length < minLength) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = null;
            }
        });
    };

    getDynamicInformation('#validationName');
    getDynamicInformation('#validationTelephone');
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
// require('es6-promise').polyfill();



window.addEventListener('DOMContentLoaded', () => {

    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_0__["default"])('.send-request',
        '#validationName',
        '#validationTelephone',
        '#validationDirection',
        '#validationCity',
        '#popupSelector');
    
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_0__["default"])('.send-request-modal',
        '#validationNameModal',
        '#validationTelephoneModal',
        '#validationDirectionModal',
        '#validationCityModal',
        '#popupSelectorModal');
    
    (0,_modules_TelephoneMask__WEBPACK_IMPORTED_MODULE_1__["default"])();

});
})();

/******/ })()
;
//# sourceMappingURL=boundle.js.map