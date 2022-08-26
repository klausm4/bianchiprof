// require('es6-promise').polyfill();
import req from './request'

window.addEventListener('DOMContentLoaded', () => {

    req();

    // //////////////request/////////////////////
    // const requestButton = document.querySelector('.send-request');

    // requestButton.addEventListener('click', (e) => {
    //     const name = document.querySelector('#validationName').value;
    //     const telephone = document.querySelector('#validationTelephone').value;
    //     const city = document.querySelector('#validationCity').value;
    //     if (name && telephone && city) {
    //         e.preventDefault();
    //         sendRequest(name, telephone, city);
    //     }
    // });

    // const sendRequest = (name, telephone, city) => {
    //     console.log(name, telephone, city);
    // };



});