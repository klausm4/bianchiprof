// require('es6-promise').polyfill();
import forms from './modules/forms';
import telephoneMatrix from './modules/TelephoneMatrix';

window.addEventListener('DOMContentLoaded', () => {

    forms('.send-request','#validationName', '#validationTelephone', '#validationDirection', '#validationCity', '#popupSelector');
    forms('.send-request-modal','#validationNameModal', '#validationTelephoneModal', '#validationDirectionModal', '#validationCityModal', '#popupSelectorModal');
    telephoneMatrix(); 

});