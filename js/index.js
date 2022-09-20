import forms from './modules/forms';
import telephoneMask from './modules/TelephoneMask';
import navbar from './modules/navbar';

window.addEventListener('DOMContentLoaded', () => {
   
    forms();
    telephoneMask();
    navbar();

});