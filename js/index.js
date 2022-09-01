// require('es6-promise').polyfill();
import forms from './modules/forms';
import telephoneMask from './modules/TelephoneMask';

window.addEventListener('DOMContentLoaded', () => {
   
    try {
        forms('.send-request',
            '#validationName',
            '#validationTelephone',
            '#validationDirection',
            '#validationCity',
            '.send-request');
    } catch (err) {
        // обработка ошибки
    };

    try {
        forms('.send-request-modal',
            '#validationNameModal',
            '#validationTelephoneModal',
            '#validationDirectionModal',
            '#validationCityModal',
            '.btn-secondary');
    } catch (err) {
        // обработка ошибки
    }

    telephoneMask();

});