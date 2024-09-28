import forms from './js/modules/forms';
import telephoneMask from './js/modules/TelephoneMask';
import interactiveElements from './js/modules/interactiveElements';
import calc from './js/modules/calc';
import carousel from './js/modules/carousel';
import './css/style.css';

window.addEventListener('DOMContentLoaded', () => {
    forms();
    telephoneMask();
    interactiveElements();
    calc();
    carousel();
});
