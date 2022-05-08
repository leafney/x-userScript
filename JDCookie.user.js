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
    function getCookies(cookieStr, names) {
        let res = '';
        // var cookieStr = document.cookie;
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

    function getCookies2(cookieStr, names) {
        let res = '';
        // var cookieStr = document.cookie;
        var cas = cookieStr.split(';');

        for (let i = 0; i < cas.length; i++) {
            const pair = cas[i];
            console.log(`[${pair}]`);
            const kv = pair.trim().split('='), key = kv[0], value = kv[1];
            // const kv = pair.trim().split('='), key = (kv[0]).trim(), value = (kv[1]).trim();

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

    // 
    function showTextUI() {
        let div = document.createElement('div');
        div.innerHTML = "\n  <textarea rows=\"20\" cols=\"100\" id=\"configUITextArea\"></textarea>\n  <div>\n  <button id=\"configUIConvert\">\u8F6C\u6362</button>\n  <button id=\"configUIcancel\">\u53D6\u6D88</button>\n  </div>\n  ";
        div.id = 'configUIdiv';
        div.style.cssText = "position:fixed;top:100px;z-index:100;";
        document.body.appendChild(div);
        var cancelBtn = document.querySelector('#configUIcancel');
        cancelBtn.onclick = hideTextUI(div);
        var convertBtn = document.querySelector('#configUIConvert');
        convertBtn.onclick = excuteConvert;
    }

    function hideTextUI(e) {
        console.log(e);
        // var div = document.querySelector('#configUIdiv');
        // document.body.removeChild(e);
    }
    function excuteConvert() {
        var cookieStr = document.querySelector('#configUITextArea').value;
        // console.log(cookieStr);
        let result = getCookies2(cookieStr, ['pt_key', 'pt_pin']);
        console.log(result);
        GM_setClipboard(result, {
            type: 'text',
            mimetype: 'text/plain',
        });
    }

    function addBtn() {
        let div = document.createElement('div');
        div.innerHTML = "提取JDCookie";
        div.id = 'jdjd';
        div.style.cssText = "position:fixed;bottom:30%;right:70px;background:red;color:white;height:30px;line-height:30px;z-index:100;padding:0 5px;text-align:center;border-radius:15px;font-size:15px;";
        document.body.appendChild(div);
        div.onclick = btnHandle2;
    }
    function btnHandle2() {
        showTextUI();
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