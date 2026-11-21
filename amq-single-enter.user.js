// ==UserScript==
// @name         Single Enter
// @namespace    https://github.com/denerou/amq-single-enter
// @version      1.1
// @description  Makes double enter
// @author       denerou
// @license      MIT
// @match        https://animemusicquiz.com/*
// @match        https://*.animemusicquiz.com/*
// @grant        none
// @run-at       document-end
// @homepageURL  https://github.com/denerou/amq-single-enter
// @updateURL    https://raw.githubusercontent.com/denerou/amq-single-enter/main/amq-single-enter.user.js
// @downloadURL  https://raw.githubusercontent.com/denerou/amq-single-enter/main/amq-single-enter.user.js
// ==/UserScript==

(function () {
    'use strict';

    const ENTER_KEY_CODE = 13;
    let injecting = false;

    function makeEnterEvent(type) {
        const event = new KeyboardEvent(type, {
            key: 'Enter',
            code: 'Enter',
            keyCode: ENTER_KEY_CODE,
            which: ENTER_KEY_CODE,
            bubbles: true,
            cancelable: true,
        });
        
        try {
            Object.defineProperty(event, 'keyCode', { get: () => ENTER_KEY_CODE });
            Object.defineProperty(event, 'which',   { get: () => ENTER_KEY_CODE });
        } catch (_) {}

        return event;
    }

    function fireEnterSequence() {
        const input = document.querySelector('#qpAnswerInput');
        if (!input) return;
        
        injecting = true;
        try {
            input.dispatchEvent(makeEnterEvent('keydown'));
            input.dispatchEvent(makeEnterEvent('keypress'));
            input.dispatchEvent(makeEnterEvent('keyup'));
        } finally {
            injecting = false;
        }
    }
    
    document.addEventListener('keydown', function (event) {
        if (injecting) return;
        if (event.target?.id !== 'qpAnswerInput') return;
        if (event.key !== 'Enter' && event.which !== ENTER_KEY_CODE && event.keyCode !== ENTER_KEY_CODE) {
            return;
        }

        setTimeout(fireEnterSequence, 0);
    }, true);
})();
