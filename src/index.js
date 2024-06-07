import forms from './js/modules/forms';
import telephoneMask from './js/modules/TelephoneMask';
import interactiveElements from './js/modules/interactiveElements';
import calc from './js/modules/calc';
import './css/style.css';

window.addEventListener('DOMContentLoaded', () => {
   
    forms();
    telephoneMask();
    interactiveElements();
    calc();

    $(document).ready(function(){
        $('.slider').slick({
            arrows:true,
            slidesToShow:3,
            speed:1000,
            easing:'linear',
            autoplay:true,
            centerMode:false,
            variableWidth:false,
            responsive:[
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow:2
                    }
                },{
                    breakpoint: 768,
                    settings: {
                        slidesToShow:1
                    }
                }
            ]
        });
    })
});