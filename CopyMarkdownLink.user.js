// ==UserScript==
// @name        一键获取网页markdown格式链接
// @namespace   https://github.com/leafney
// @version     0.5
// @description 点击按钮，获取当前网页markdown格式的链接
// @author      leafney
// @match       *://*/*
// @grant       none
// @license     MIT
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    function _appendCss(css, name) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.setAttribute("data-component", name);
        style.innerHTML = css;
        head.appendChild(style);
    }
    function addStyle() {
        //debugger;
        let layui_css = `#copyBtn.layui-btn{display: inline-block; vertical-align: middle; height: 38px; line-height: 38px; border: 1px solid transparent; padding: 0 18px; background-color: #009688; color: #fff; white-space: nowrap; text-align: center; font-size: 14px; border-radius: 20px; cursor: pointer; -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none;} #copyBtn.layui-btn-sm{height: 30px; line-height: 28px; padding: 0 8px; font-size: 14px;}`;
        _appendCss(layui_css, "btn");
    }
    //创建复制按钮
    function addBtn() {
        var btn = document.createElement('button');
        btn.style = "top:30%; right:20px; position: fixed;z-index:1000;cursor:pointer;background:green;"
        btn.className = "layui-btn layui-btn-sm"
        btn.innerHTML = "复制"
        btn.id = "copyBtn"
        btn.setAttribute('type', 'button')
        document.body.appendChild(btn);
    }
    // 仅对当前页有效，排除iframe页面
    if (self == top) {
        addStyle();
        addBtn();
        let isclick = false; // 防止过快重复点击
        var $btn = document.getElementById("copyBtn")
        $btn.addEventListener("click", function () {
            if (!isclick) {
                var text = `- [${document.title}](${document.URL}) `
                console.log("copy=> " + text);
                if (navigator.clipboard) {
                    // clipboard api 复制
                    navigator.clipboard.writeText(text);
                    $btn.style.background = "red";
                    $btn.innerHTML = "复制成功";
                    setTimeout(() => {
                        $btn.style.background = "green";
                        $btn.innerHTML = "复制";
                    }, 3000);
                    isclick = true;
                    setTimeout(() => {
                        isclick = false;
                    }, 3000);
                }
            }
        });
    }
})();