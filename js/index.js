// require('es6-promise').polyfill();
import requestToEmail from './modules/request';
import telInput from './modules/telInput';
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

window.addEventListener('DOMContentLoaded', () => {

    const requestForm = [
        {
            formName: '.send-request',
            name: '#validationName',
            telephone: '#validationTelephone',
            direction: '#validationDirection',
            city: '#validationCity'
        },
        {
            formName: '.send-request-modal',
            name: '#validationNameModal',
            telephone: '#validationTelephoneModal',
            direction: '#validationDirectionModal',
            city: '#validationCityModal'
        }
    ];

    requestForm.forEach(item => {
        requestToEmail(item.formName, item.name, item.telephone, item.direction, item.city);
    });

    telInput();

    
    

    // requestToEmail('.send-request', '#validationName')


});