import forms from './js/modules/forms';
import telephoneMask from './js/modules/TelephoneMask';
import navbar from './js/modules/navbar';
import './css/style.css';

window.addEventListener('DOMContentLoaded', () => {
   
    forms();
    telephoneMask();
    navbar();

});