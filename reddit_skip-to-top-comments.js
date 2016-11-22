// ==UserScript==
// @name         Skip to Top Comments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Skip to each top comment on Reddit
// @author       github.com/tmarren2090
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
    var nextComment = 0;
    var bgHex = '#F9F9E7';
    var style = ["style", `background-color: ${bgHex};`];
    document.addEventListener("keydown", function(e) {
      topComments[nextComment].removeAttribute(...style);
      // I use 'n' to go down and 'm' to go up
      if(e.keyCode == 78){
          e.preventDefault();
          nextComment++;
          topComments[nextComment].scrollIntoView();
          topComments[nextComment].setAttribute(...style);
      } else if (e.keyCode == 77 && nextComment > 0) {
          e.preventDefault();
          nextComment--;
          topComments[nextComment].scrollIntoView();
          topComments[nextComment].setAttribute(...style);
      }
    });

})();
