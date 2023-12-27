// ==UserScript==
// @name         舒欣浏览-知乎、简书、掘金、CSDN
// @namespace    https://github.com/leafney
// @version      0.1.0
// @description  去除页面中那些烦人的东东
// @author       leafney
// @match        *://*.zhihu.com/*
// @match        *://*.csdn.net/*
// @match        *://*.jianshu.com/*
// @match        *://*.juejin.cn/*
// @icon         http://zhihu.com/favicon.ico
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const url = window.location.href;

    const zhihuReg = /.*zhihu.com\.*/;
    const csdnReg= /.*csdn\.net\.*/;
    const jianshuReg= /^https?:\/\/(www\.)?jianshu\.com\.*/;
    const juejinReg= /^https?:\/\/(juejin\.cn)\.*/;

    if (zhihuReg.test(url)){
        initZhiHu();
    }else if(csdnReg.test(url)){
        initCSDN();
    }else if (jianshuReg.test(url)){
        initJianShu();
    }else if(juejinReg.test(url)){
        initJueJin();
    }else{

    }

    function initZhiHu() {
        console.log('知乎设置');
        let zhihu_style='';
        /* 首页相关 */ 

        // 隐藏logo、版权信息
        zhihu_style += `
            .css-1hlrcxk {
                display: none;
            }
            main.App-main footer {
                display: none;
            }
        `;

        // 顶部左侧菜单，只保留首页
        zhihu_style +=`
            .AppHeader-inner ul.AppHeader-Tabs li:not(:first-child) {
                display: none;
            }
        `;

        // 顶部右侧菜单，只保留用户头像
        zhihu_style +=`
            .AppHeader-userInfo>div:not(:last-child) {
                display: none;
            }
        `;

        // 用户头像下拉菜单，去除 无障碍、关怀版
        zhihu_style += `
            .AppHeaderProfileMenu-container a.AppHeaderProfileMenu-item:nth-child(2),a.AppHeaderProfileMenu-item:nth-child(3){
                display: none;
            }
        `;
        
        // 首页列表内容部分，隐藏右侧边栏，左侧内容区域宽度调整
        zhihu_style += `
            main.App-main div.Topstory-container>div:not(:first-child){
                display: none;
            }
            
            main.App-main div.Topstory-container div.Topstory-mainColumn{
                width: 95%;
            }
            
            div.RichContent-inner img.origin_image[data-size="normal"] {
                width: 80%;
            }
        `;

        /* 用户个人主页相关 */ 
        // 用户个人主页，去除右侧边栏，左侧内容区域宽度增加
        zhihu_style +=`
            div.Profile-sideColumn {
                display: none;
              }
              div.Profile-mainColumn{
                width: auto;
              }
        `;
        
        /* 搜索相关 */ 
        // 搜索列表页，隐藏右侧列表，左侧内容区域宽度调整
        zhihu_style +=`
            div.Search-container div.SearchMain{
                width: 95%;
            }
            div.Search-container div.css-knqde{
                display: none;
            }
        `;

        /* 问答主页相关 */ 
        // 问题列表页，隐藏右侧相关问题，左侧内容宽度调整，字体调整
        zhihu_style +=`
            div.Question-sideColumn div.css-oyqdpg{
                display: none;
            }
            div.Question-sideColumn div.Card[aria-label="更多回答信息"]{
                display: none;
            }
            div.Question-mainColumn {
                width: auto;
                font-size: medium;
            }
        `;

        /* 话题相关 */ 
        // 话题列表页，隐藏右侧边栏
        zhihu_style +=`
            main.App-main div.css-1q32xh5 {
                display:none;
            }
        `;

        GM_addStyle(zhihu_style);
        
        // 需要等待页面加载完成之后执行
        window.addEventListener('load',function(){
            zhihuShowTime();
        },false);
    }

    function initJianShu() {
        console.log('简书设置');
        let jianshu_style='';
        /* 文章相关 */ 
        
        // 顶部菜单栏 logo
        jianshu_style +=`div._2oDcyf a._1AawTM, div._7hb9O4, nav._3JYrtj{display: none !important;}`
        // 隐藏 关注、赞赏按钮；底部评论栏；底部评论栏
        jianshu_style +=`div#__next button._1OyPqC, footer, div._3Pnjry{display:none !important;}`
        // 隐藏内容区域，右侧边栏，内容区域宽度调整
        jianshu_style +=`aside._2OwGUo {display:none !important;} div[role="main"]>div._gp-ck{width:85%;}`
        // 文章内容底部分类、点赞；二维码；用户名
        jianshu_style +=`section.ouvJEz div._1kCBjS, div._13lIbp, div.d0hShY{display:none !important;}`
        // 文章底部推荐文章列表
        jianshu_style +=`section.ouvJEz:not(:first-child){display:none !important;}`
        // 底部评论框
        jianshu_style +=`div#note-page-comment{display:none !important;}`

        GM_addStyle(jianshu_style);
    }

    function initCSDN() {
        console.log('csdn设置');
    }

    function initJueJin() {
        console.log('掘金设置');
    }

    /* ----------------------------- */ 

    // 显示问题发布时间
    function zhihuShowTime() {
        let dateCreate = document.createElement('div')
        let parentDom = document.querySelector('.QuestionHeader .QuestionHeader-main')
        let time = document.querySelector('meta[itemprop="dateCreated"]')
        if(time) {
            let content = time.getAttribute('content')
            let insertTime = new Date(content).toLocaleString()
            dateCreate.innerHTML = '提问时间：' + insertTime.replaceAll('/', '-')
            dateCreate.setAttribute('class', 'ContentItem-time')
            parentDom.appendChild(dateCreate)
        }
    }

})();