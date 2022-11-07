import forms from './js/modules/forms';
import telephoneMask from './js/modules/TelephoneMask';
import interactiveElements from './js/modules/interactiveElements';
import './css/style.css';

window.addEventListener('DOMContentLoaded', () => {
   
    forms();
    telephoneMask();
    interactiveElements();

});