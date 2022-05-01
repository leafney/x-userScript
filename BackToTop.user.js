// ==UserScript==
// @name         返回顶部
// @namespace    https://github.com/leafney
// @version      0.1
// @description  点击按钮，返回顶部
// @author       leafney
// @match        *://*/*
// @grant        GM_addStyle
// @grant        unsafeWindow
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */
// `no-undef - `$` is not defined“` use globals

(function () {
    'use strict';

    GM_addStyle(`
        .xback-to-top {
            display: none;
            position: fixed;
            right: 20px;
            bottom: 35%;
            padding:3px;
            -webkit-transition-property: -webkit-transform;
            transition-property: -webkit-transform;
            transition-property: transform;
            transition-property: transform,-webkit-transform;
            -webkit-transition-timing-function: ease-out;
            transition-timing-function: ease-out;
            -webkit-transition-duration: .3s;
            transition-duration: .3s;
            z-index: 1000;
            cursor:pointer;
        }
        
        .xback-to-top:hover {
            -webkit-transform: translateY(-5px);
            -ms-transform: translateY(-5px);
            transform: translateY(-5px)
        }
    `);

    function backToTop() {
        let e = $("#xback-to-top");
        $(window).scroll(function () {
            100 < $(window).scrollTop() ? e.fadeIn(1e3) : e.fadeOut(1e3)
        });
        e.click(function () {
            $("body,html").animate({
                scrollTop: 0
            })
        })
    }

    function addBtn() {
        let div = document.createElement('div');
        div.id = 'xback-to-top';
        div.className = 'xback-to-top';
        div.style.cssText = 'display: none;';
        let divi = document.createElement('i');
        divi.innerHTML = 'backTop';
        div.appendChild(divi);
        document.body.appendChild(div);
    }

    // Your code here...
    addBtn();
    backToTop();

})();