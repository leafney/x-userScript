// ==UserScript==
// @name         提取JDCookie
// @namespace    https://github.com/leafney
// @version      0.3.1
// @description  一键提取京东Cookie信息
// @author       leafney
// @match        https://*.jd.com/*
// @icon         https://www.jd.com/favicon.ico
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==

(function () {
    'use strict';

    // 提取cookies中的指定键值对
    function getCookies(cookieStr, names) {
        const cookies = cookieStr.split(';')
            .map(cookie => cookie.trim().split('='))
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

        return names
            .filter(name => cookies.hasOwnProperty(name))
            .map(name => `${name}=${cookies[name]};`)
            .join('');
    }

    function addBtn() {
        let div = document.createElement('div');
        div.innerHTML = "拷贝请求头Cookie后点击提取JDCookie";
        div.id = 'jdjd';
        div.style.cssText = "position:fixed;top:50%;left:40px;background:#FF5D40;color:white;height:30px;line-height:30px;z-index:100;padding:0 5px;text-align:center;border-radius:15px;font-size:15px;";
        document.body.appendChild(div);
        div.onclick = btnHandle;
    }

    function btnHandle() {
        // 获取剪贴板内容
        navigator.clipboard.readText().then(text => {
            // console.log(`剪贴板内容为：${text}`);

            const data = getCookies(text, ['pt_key', 'pt_pin']);
            // console.log(data);

            const res = showDialog(data, 10000);
            if (res) {
                // 将提取的结果写入剪贴板并弹出提示
                GM_setClipboard(data, { type: 'text', mimetype: 'text/plain' });
                GM_notification({ text: '成功提取JDCookie到剪贴板', timeout: 2500 });
            } else {
                GM_notification({ text: '提取JDCookie失败', timeout: 3000 });
            }
        });
    }

    // 显示提示弹窗
    function showDialog(data, timeout) {
        let val = data.split(';');
        // console.log(val)
        if (val.length >= 2) {
            const key = val[0];
            const pin = val[1];

            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'rgba(0,0,0,0.5)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = 200;

            const popup = document.createElement('div');
            popup.style.position = 'relative';
            popup.style.width = '320px';
            popup.style.padding = '16px';
            popup.style.background = '#fff';
            popup.style.borderRadius = '8px';
            popup.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';

            const heading = document.createElement('h3');
            heading.textContent = '提取到的Cookie值';
            heading.style.marginTop = '0';
            heading.style.textAlign = 'center';

            const message1 = document.createElement('p');
            message1.textContent = `pt_key键值对：${key}`;
            message1.style.marginTop = '8px';

            const message2 = document.createElement('p');
            message2.textContent = `pt_pin键值对：${pin}`;
            message2.style.marginTop = '8px';

            popup.appendChild(heading);
            popup.appendChild(message1);
            popup.appendChild(message2);

            overlay.appendChild(popup);
            document.body.appendChild(overlay);

            setTimeout(() => {
                overlay.remove()
            }, timeout);

            return true;
        } else {
            return false;
        }
    }

    // 初始化按钮
    addBtn();

})();