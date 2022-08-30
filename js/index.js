// require('es6-promise').polyfill();
import requestToEmail from './modules/request';
import telInput from './modules/telInput';

window.addEventListener('DOMContentLoaded', () => {

    requestToEmail('.send-request','#validationName', '#validationTelephone', '#validationDirection', '#validationCity', '#popupSelector');
    requestToEmail('.send-request-modal','#validationNameModal', '#validationTelephoneModal', '#validationDirectionModal', '#validationCityModal', '#popupSelectorModal');
    telInput(); 

    
    

    // requestToEmail('.send-request', '#validationName')


});