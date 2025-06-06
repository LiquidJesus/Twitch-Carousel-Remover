// ==UserScript==
// @name         Twitch Front Page Carousel Remover
// @version      1.0
// @icon         https://img.icons8.com/?size=100&id=VJpqTKPYvnx2&format=png&color=000000
// @description  Removes front page carousel and mutes its audio
// @author       LiquidJesus
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeAndMuteCarousel() {
        // Find the carousel element
        const carousel = document.querySelector('.front-page-carousel.hTjsXl.Layout-sc-1xcs6mc-0');

        if (carousel) {
            // Remove the carousel
            carousel.style.display = 'none';

            // Find and mute any video/audio elements within the carousel
            const mediaElements = carousel.querySelectorAll('video, audio');
            mediaElements.forEach(media => {
                media.muted = true;
                media.pause();
            });
        }
    }

    // Run on page load
    removeAndMuteCarousel();

    // Create observer to handle dynamic content loading
    const observer = new MutationObserver(() => {
        removeAndMuteCarousel();
    });

    // Start observing the document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();