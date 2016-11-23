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
      } else if (e.keyCode == 77 && nextComment > -1) {
          e.preventDefault();
          nextComment--;
          if(nextComment != -1){
              topComments[nextComment].scrollIntoView();
              topComments[nextComment].setAttribute(...style);
          }
      }
    });

})();
