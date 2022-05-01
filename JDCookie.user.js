// ==UserScript==
// @name         提取JDCookie
// @namespace    https://github.com/leafney
// @version      0.2
// @description  一键提取京东Cookie
// @author       leafney
// @match        https://*.jd.com/*
// @icon         https://www.jd.com/favicon.ico
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==


(function () {
    'use strict';

    // Your code here...
    function getCookies(names) {
        let res = '';
        var cookieStr = document.cookie;
        var cas = cookieStr.split(';');

        for (let i = 0; i < cas.length; i++) {
            const pair = cas[i];
            // console.log(`[${pair}]`);
            const kv = pair.trim().split('='), key = kv[0], value = kv[1];

            for (let j = 0; j < names.length; j++) {
                const ele = names[j];
                if (ele == key) {
                    res += `${key}=${value};`
                    continue;
                }
            }
        }
        return res;
    }

    function addBtn() {
        let div = document.createElement('div');
        div.innerHTML = "提取JDCookie";
        div.id = 'jdjd';
        div.style.cssText = "position:fixed;bottom:30%;right:70px;background:red;color:white;height:30px;line-height:30px;z-index:100;padding:0 5px;text-align:center;border-radius:15px;font-size:15px;";
        document.body.appendChild(div);
        div.onclick = btnHandle;
    }

    function btnHandle() {
        const data = getCookies(['pt_key', 'pt_pin']);
        // console.log(data);
        GM_setClipboard(data, { type: 'text', mimetype: 'text/plain' });
        GM_notification({ text: '成功提取JDCookie到剪贴板', timeout: 2500 });
    }


    addBtn();
    // ['pt_key','pt_pin']
})();