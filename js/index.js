// require('es6-promise').polyfill();
import forms from './modules/forms';
import telephoneMask from './modules/TelephoneMask';

window.addEventListener('DOMContentLoaded', () => {
   
    forms();
    telephoneMask();

});