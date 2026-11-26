// ==UserScript==
// @name         Twitch Front Page Carousel Remover
// @namespace    https://github.com/LiquidJesus/Twitch-Carousel-Remover
// @version      2.0
// @icon         https://img.icons8.com/?size=100&id=VJpqTKPYvnx2&format=png&color=000000
// @description  Removes the front page carousel and silences its video, including after in-site navigation
// @updateURL    https://github.com/prenom6548/Twitch-Carousel-Remover/raw/main/twitch-carousel-remover.user.js
// @downloadURL  https://github.com/prenom6548/Twitch-Carousel-Remover/raw/main/twitch-carousel-remover.user.js
// @author       https://github.com/LiquidJesus/Twitch-Carousel-Remover
// @match        https://www.twitch.tv/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function() {
    'use strict';

    // Twitch is a single-page app: the script has to work whatever page the
    // visit starts on, so it matches every page and only acts on the carousel.
    const SELECTORS = [
        '[data-a-target="front-page-carousel"]',
        '.front-page-carousel',
        '.featured-content-carousel'
    ];
    const SELECTOR = SELECTORS.join(',');

    // Hide it with CSS right away, before the first paint, so it never flashes.
    const style = document.createElement('style');
    style.textContent = SELECTOR + ' { display: none !important; }';
    (document.head || document.documentElement).appendChild(style);

    function silence(video) {
        video.muted = true;
        video.volume = 0;
        video.pause();
        // Remove the source so the audio cannot restart.
        video.removeAttribute('src');
        video.load();
    }

    function nukeCarousel() {
        document.querySelectorAll(SELECTOR).forEach(el => {
            el.querySelectorAll('video').forEach(silence);
        });
    }

    nukeCarousel();

    // The carousel is (re)built whenever the home page is shown, so keep watching.
    const observer = new MutationObserver(nukeCarousel);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
