// require('es6-promise').polyfill();
import forms from './modules/forms';
import telephoneMask from './modules/TelephoneMask';

window.addEventListener('DOMContentLoaded', () => {

    forms('.send-request',
        '#validationName',
        '#validationTelephone',
        '#validationDirection',
        '#validationCity',
        '#popupSelector');
    
    forms('.send-request-modal',
        '#validationNameModal',
        '#validationTelephoneModal',
        '#validationDirectionModal',
        '#validationCityModal',
        '#popupSelectorModal');
    
    telephoneMask();

});