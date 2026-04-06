// ==UserScript==
// @name         Twitch Front Page Carousel Remover
// @version      1.3
// @icon         https://img.icons8.com/?size=100&id=VJpqTKPYvnx2&format=png&color=000000
// @description  Removes front page carousel and mutes its audio
// @author       LiquidJesus
// @match        https://www.twitch.tv/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function nukeCarousel() {
        document.querySelectorAll('[class*="carousel"]').forEach(el => {
            if (el.querySelector('video')) {
                el.querySelectorAll('video').forEach(v => {
                    v.muted = true;
                    v.volume = 0;
                    v.pause();
                    // Remove the src so the damn audio can't restart anymore
                    v.src = '';
                    v.load();
                });
                el.style.display = 'none';
            }
        });
    }

    // Nuke the carousel as twitch loads
    nukeCarousel();

    // Then watch the entire document for any new nodes being added.
    // And if there are new nodes, then show them meaning of scorched earth
    const observer = new MutationObserver(() => {
        nukeCarousel();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
