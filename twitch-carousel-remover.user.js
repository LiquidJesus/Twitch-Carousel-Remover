// ==UserScript==
// @name         Twitch Front Page Carousel Remover
// @version      1.7
// @icon         https://img.icons8.com/?size=100&id=VJpqTKPYvnx2&format=png&color=000000
// @description  Removes front page carousel and mutes its audio
// @author       LiquidJesus
// @match        https://www.twitch.tv/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let carouselFound = false;

    function nukeCarousel() {
        if (carouselFound) return;

        document.querySelectorAll('[class*="carousel"]').forEach(el => {
            if (el.querySelector('video')) {
                // Mute videos
                el.querySelectorAll('video').forEach(v => {
                    v.muted = true;
                    v.volume = 0;
                    v.pause();
                });

                // Hide carousel
                el.style.display = 'none';
                carouselFound = true;
            }
        });
    }

    nukeCarousel();

    // Check every 100ms for up to 5 seconds or until found
    let checks = 0;
    const interval = setInterval(() => {
        nukeCarousel();
        checks++;

        if (carouselFound || checks >= 50) {
            clearInterval(interval);
        }
    }, 100);
})();
