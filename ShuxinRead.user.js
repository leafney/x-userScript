// ==UserScript==
// @name         舒欣阅读-知乎、简书、掘金、CSDN、X
// @namespace    https://github.com/leafney
// @version      0.2.2
// @description  去除页面中那些烦人的东东，舒欣 --> 舒心
// @author       leafney
// @match        *://*.zhihu.com/*
// @match        *://*.csdn.net/*
// @match        *://*.jianshu.com/*
// @match        *://*.juejin.cn/*
// @match        *://*.twitter.com/*
// @icon         http://zhihu.com/favicon.ico
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const url = window.location.href;
    const path = window.location.pathname;

    const zhihuReg = /.*zhihu.com\.*/;
    const csdnReg= /.*csdn\.net\.*/;
    const jianshuReg= /^https?:\/\/(www\.)?jianshu\.com\.*/;
    const juejinReg= /^https?:\/\/(juejin\.cn)\.*/;
    const twitterReg=/^https?:\/\/(twitter\.com)\.*/;

    if (zhihuReg.test(url)){
        initZhiHu(path);
    }else if(csdnReg.test(url)){
        initCSDN(path);
    }else if (jianshuReg.test(url)){
        initJianShu(path);
    }else if(juejinReg.test(url)){
        initJueJin(path);
    }else if(twitterReg.test(url)){
        initTwitter(path);
    }else{

    }

    function initZhiHu(pathname) {
        console.log('知乎设置');
        let zhihu_style='';
        
        if (pathname.indexOf('/people')>-1){
            /* 用户个人主页相关 */ 
            // 用户个人主页，去除右侧边栏，左侧内容区域宽度增加
            zhihu_style +=`div.Profile-sideColumn{display:none;}div.Profile-mainColumn{width:auto;}`;
            
        }else if (pathname.indexOf('/search')>-1){
            /* 搜索相关 */ 
            // 搜索列表页，隐藏右侧列表，左侧内容区域宽度调整
            zhihu_style +=`div.Search-container div.SearchMain{width:95%;}div.Search-container div.css-knqde{display:none;}`;

        }else if (pathname.indexOf('/question')>-1){
            /* 问答主页相关 */ 
            // 问题列表页，左侧内容宽度调整，字体调整
            zhihu_style +=`div.Question-mainColumn{width:auto !important;font-size:medium;}`
            // 问题列表页，隐藏右侧相关问题
            zhihu_style +=`div.Question-sideColumn{display:none !important;}`

        }else if (pathname.indexOf('/topic')>-1){
            /* 话题相关 */ 
            // 话题列表页，隐藏右侧边栏
            zhihu_style +=`main.App-main div.css-1q32xh5{display:none;}`;

        // }else if (pathname.indexOf('')>-1){

        }

        /* 首页相关 */ 
        // 隐藏logo、版权信息
        zhihu_style += `.css-1hlrcxk{display:none;} main.App-main footer{display:none;}`;

        // 顶部左侧菜单，只保留首页
        zhihu_style +=`.AppHeader-inner ul.AppHeader-Tabs li:not(:first-child){display:none;}`;

        // 顶部右侧菜单，只保留用户头像
        zhihu_style +=`.AppHeader-userInfo>div:not(:last-child){display:none;}`;

        // 用户头像下拉菜单，去除 无障碍、关怀版
        zhihu_style += `.AppHeaderProfileMenu-container a.AppHeaderProfileMenu-item:nth-child(2),a.AppHeaderProfileMenu-item:nth-child(3){display:none;}`;
        
        // 首页列表内容部分，隐藏右侧边栏，左侧内容区域宽度调整
        zhihu_style += `main.App-main div.Topstory-container>div:not(:first-child){display:none;}main.App-main div.Topstory-container div.Topstory-mainColumn{width:95%;}div.RichContent-inner img.origin_image[data-size="normal"]{width:80%;}`;

        GM_addStyle(zhihu_style);
        
        // 需要等待页面加载完成之后执行
        unsafeWindow.onload=function(){
            zhihuShowTime();
        }
    }

    function initJianShu(pathname) {
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

    function initCSDN(pathname) {
        console.log('csdn设置');
        let csdn_style = '';
        if (pathname.indexOf('/article/details')>-1){
            /* 文章详情页 */ 
           // 左侧边栏：用户信息、热门文章、最新评论、最新文章
            csdn_style +=`aside.blog_container_aside{display:none !important;}`
            // 主内容区域，宽度调整
            csdn_style +=`div#mainBox main{width:100%;}`
            // 内容底部浮动栏，内容底部多级分类名
            csdn_style +=`div#mainBox div#toolBarBox .left-toolbox, #treeSkill{display:none !important;}`
            // 复制内容后的提示
            csdn_style +=`div#articleSearchTip{display:none !important;}`
            
        // }else if (pathname.indexOf('')>-1){

        }

        /* 全局相关 */ 
        // 登录弹窗; 右下角登录提示
        csdn_style +=`div.passport-login-container, div.passport-login-tip-container{display:none !important;}`
        // 右下角边栏 只保留返回顶部
        csdn_style +=`div.csdn-side-toolbar div.sidetool-writeguide-box, div.csdn-side-toolbar>a:not(:last-child){display:none;}`
        // 底部版权信息，相关推荐
        csdn_style +=`div#copyright-box, div#recommendNps{display:none !important;}`
        // 顶部导航栏，左右两侧，只保留搜索栏
        csdn_style +=`div#csdn-toolbar .toolbar-container-left,.toolbar-container-right{display:none !important;}`
        
        // 
        // csdn_style +=``

        GM_addStyle(csdn_style);

        // 
        setTimeout(() => {
            csdnRecListClear();
            csdnCategoryListRmvPayItem();
            csdnNoLoginCopyCode();
        }, 1500)

    }

    function initJueJin(pathname) {
        console.log('掘金设置');
        let juejin_style ='';

        if (pathname.indexOf('/post')>-1){
            console.log('掘金--文章详情页');
            /* 文章详情相关 */ 
            // 左侧浮动菜单，隐藏 关注用户
            juejin_style +=`div#juejin div.article-suspended-panel div.panel-btn.author{display:none;}`
            // 右侧边栏，隐藏 相关推荐、精选内容、搜索建议、关注二维码
            juejin_style +=`div#sidebar-container>div:not(:first-child){display:none;}`


        }else if(pathname.indexOf('/')>-1){
            console.log('掘金--首页');
            /* 掘金首页相关 */ 
            // 右侧边栏隐藏
            juejin_style +=`div.timeline-container aside.index-aside{display:none;}`
            // 内容区域宽度调整
            juejin_style +=`div.timeline-container div.timeline-entry-list{width:90%;}`
            // 左侧分类菜单显示完整
            juejin_style +=`main.main-container div.index-nav{overflow:visible !important;}`

        }

        /* 网站全局 */ 
        // 右侧浮动菜单：移除反馈、下载app
        juejin_style +=`div#juejin div.suspension-panel button.meiqia-btn, span.more-btn{display:none;}`
        // 顶部菜单栏，左侧 只保留前三项
        juejin_style +=`nav.main-nav ul.phone-hide.isResourceVisible>.nav-item.link-item:nth-child(n+4){display:none;}`
        // 顶部菜单栏，右侧 只保留搜索框
        juejin_style +=`nav.main-nav ul.right-side-nav .nav-item:not(:first-child){display:none;}`
        // 顶部菜单栏，右侧 搜索框增加右侧边距
        juejin_style +=`nav.main-nav ul.right-side-nav ul.search-add-ul{margin-right:50px;}`
        // 创作者榜单浮层；
        juejin_style +=`div.global-float-banner{display: none;}`

        GM_addStyle(juejin_style);

        // 页面加载完成后执行
        unsafeWindow.onload=function(){
            juejinLoginLayer();
            juejinLeftMenu();
            juejinNoLinkRedirect();
        }
    }

    function initTwitter(pathname){
        console.log('twitter设置');
        let twitter_style ='';
        // 隐藏右侧边栏
        twitter_style += `div.r-fif9oo,div.r-zso239[data-testid="sidebarColumn"]{display: none;}`
        // 调整内容宽度
        twitter_style += `div.r-1ye8kvj{max-width:750px !important;}`
        // 小屏显示时的宽度
        twitter_style += `div.r-33ulu8{width:900px !important;}`;

        GM_addStyle(twitter_style);
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

    /* ----------------------------- */ 

    // 左侧浮动菜单，保留 评论、收藏、全屏
    function juejinLeftMenu() {
        let shareBtn = document.querySelector('div.share-btn.panel-btn')
        if(shareBtn){
            let startBtn = shareBtn.previousElementSibling;
            let commentBtn = startBtn.previousElementSibling;
            let niceBtn = commentBtn.previousElementSibling;
            let errorBtn = shareBtn.nextElementSibling;
    
            // 移除点赞、报错、分享
            niceBtn.remove();
            errorBtn.remove();
            shareBtn.remove();
        }
    }

    // 右下角登录提示浮层
    function juejinLoginLayer() {
        // 这个登录浮层只有滚动页面到一定距离才会出现
        let x = 0;
        // 设置一个计时器，每500毫秒检查一次元素是否存在
        let intervalID = setInterval(function() {
        // 使用 document.querySelector 来查找特定的元素
        let loginRightLayer = document.querySelector('div.bottom-login-guide')

        // 如果元素存在
        if (loginRightLayer) {
            // 执行相应的操作，比如移除元素
            loginRightLayer.remove();

            // 清除计时器
            clearInterval(intervalID);
        }

        // 防止内存消耗
        if(x>100){
             // 清除计时器
             clearInterval(intervalID);
        }
        x +=1;
        }, 500);
    }

    // 外部链接去除跳转重定向提示
    function juejinNoLinkRedirect(){
        let count = 0;
        let a_links = document.querySelectorAll('a');
        for (let link of a_links) {
            let link_href = link.getAttribute('href')
            if (link_href && link_href.indexOf('link.juejin.cn?target')>-1){
                let link_target = link_href.split('target=')[1]
                if (link_target){
                    let the_target = decodeURIComponent(link_target)
                    link.setAttribute('href',the_target)
                    count+=1
                }
            }
        }
        console.log(`当前页面共优化 ${count} 条外链`);
    }

    /* ----------------------------- */ 

    // 相关推荐文章，去除下载资源的链接，只保留博客文章类，需要延迟执行
    function csdnRecListClear() {
        let rec_list = document.querySelectorAll('div.recommend-item-box')
        for (let rec of rec_list) {
            let rec_url = rec.getAttribute('data-url')
            if (rec_url && rec_url.indexOf('download.csdn.net')>-1){
                rec.remove();
            }
        }
    }

    // 右侧分类列表，移除需要付费的分类
    function csdnCategoryListRmvPayItem() {
        let cate_list=document.querySelectorAll('#kind_person_column li a.special-column-name')
        cate_list.forEach((ele)=>{
            const payTag=ele.querySelector('span.pay-tag')
            if (payTag){
                ele.parentElement.remove();
            }
        })
    }

    // 代码块免登录复制
    function csdnNoLoginCopyCode() {
        let codeShowPres=document.querySelectorAll('pre.set-code-show')
        codeShowPres.forEach((pre)=>{
            let hljsBtn = pre.querySelector('div.hljs-button')
            if(hljsBtn && hljsBtn.parentElement == pre){
                pre.removeChild(hljsBtn)
            }

            const newBtn = document.createElement('div')
            newBtn.classList.add('hljs-button','active')
            newBtn.setAttribute('data-title','免登录复制')

            newBtn.addEventListener('click',function(e){
                let _this=e.target;
                const code =_this.parentNode.innerText;
                GM_setClipboard(code);
                _this.setAttribute("data-title", "复制成功");
                setTimeout(function(){
                    _this.setAttribute("data-title", "免登录复制");
                }, 1000);
            })
            pre.appendChild(newBtn);
        })

        let codes=document.querySelectorAll('code')
        codes.forEach((c)=>{
            c.contentEditable=true;
        })
    }

    // TODO 内容可复制
    function csdnContentCopy() {
        // let box = document.querySelector('div.blog-content-box')
        // if(box){
        //     box.addEventListener('copy',function(e){
        //         console.log('尝试复制');
        //     })
        // }
    }

})();