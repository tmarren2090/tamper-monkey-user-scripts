// ==UserScript==
// @name         Skip to Top Comments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.reddit.com/r/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var comments = document.getElementsByClassName('comment');
    var topComments = [];
    for (let i = 0; i < comments.length - 1; i++){
        if(Array.from(comments[i].parentNode.classList).includes('nestedlisting')){
            topComments.push(comments[i]);
        }
    }
    var nextComment = -1;
    var bgColor = '#F9F9E7';

    // I toggle these two if using f.lux
    var style = ["style", `background-color: ${bgColor}!important;`];
    //var style = ['style', 'border-left: 3px solid red!important;'];

    document.addEventListener("keydown", function(e) {
        if (nextComment != -1){ topComments[nextComment].removeAttribute(...style); }
        // I use 'n' to go down and 'm' to go up
        if(e.keyCode == 78){
            e.preventDefault();
            nextComment++;
            topComments[nextComment].scrollIntoView();
            topComments[nextComment].setAttribute(...style);
            let expandoButtons = topComments[nextComment].children[2].children[1].children[1].children[0].getElementsByClassName('expando-button');
            console.log(expandoButtons);
            for (let i = 0; i < expandoButtons.length; i++){
                let button = expandoButtons[i];
                console.log(button);
                if(!button.classList.contains('video')){
                    eventFire(button, 'click');
                }
            }
            console.log(nextComment);
        } else if (e.keyCode == 77 && nextComment > -1) {
            e.preventDefault();
            nextComment--;
            if(nextComment != -1){
                topComments[nextComment].scrollIntoView();
                topComments[nextComment].setAttribute(...style);
                let expandoButtons = topComments[nextComment].children[2].children[1].children[1].children[0].getElementsByClassName('expando-button');
                for (let i = 0; i < expandoButtons.length - 1; i++){
                    let button = expandoButtons[i];
                    if(!button.classList.contains('video')){
                        eventFire(button, 'click');
                    }
                }
            }
        }
    });

    //Simulates a click on any expando button in RES
    function eventFire(el, etype){
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }

})();
