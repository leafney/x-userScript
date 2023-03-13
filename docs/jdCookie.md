## 一键获取京东Cookie

### 对于UI实现

使用CSS和JavaScript创建了一个简单的自定义弹窗框：

```
// ==UserScript==
// @name         Popup Alert Demo
// @namespace    your-namespace
// @version      1.0
// @description  Demonstrates a custom popup alert in a userscript
// @author       Your Name
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create the popup element and set its style properties
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.width = '200px';
    popup.style.padding = '16px';
    popup.style.background = '#fff';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';

    // Create the heading element and set its text and style properties
    const heading = document.createElement('h3');
    heading.textContent = '提示';
    heading.style.marginTop = '0';
    heading.style.textAlign = 'center';

    // Create the message element and set its text content and style properties
    const message = document.createElement('p');
    message.textContent = '这是提示的内容。';
    message.style.marginTop = '8px';

    // Create the button element and set its text content and style properties
    const button = document.createElement('button');
    button.textContent = '关闭';
    button.style.marginTop = '16px';
    button.style.alignSelf = 'center';
    button.style.background = '#007bff';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.color = '#fff';
    button.style.padding = '8px 16px';
    button.style.cursor = 'pointer';

    // Add the elements to the popup
    popup.appendChild(heading);
    popup.appendChild(message);
    popup.appendChild(button);

    // Add the popup to the page body
    document.body.appendChild(popup);

    // Add an event listener to close the popup when the button is clicked
    button.addEventListener('click', function() {
        popup.remove();
    });
})();

```


给弹窗添加一个默认的遮罩层，可以使用下面的代码示例：


```
// ==UserScript==
// @name         Popup Alert Demo with Overlay
// @namespace    your-namespace
// @version      1.0
// @description  Demonstrates a custom popup alert with overlay in a userscript
// @author       Your Name
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create the overlay element and set its style properties
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

    // Create the popup element and set its style properties
    const popup = document.createElement('div');
    popup.style.position = 'relative';
    popup.style.width = '200px';
    popup.style.padding = '16px';
    popup.style.background = '#fff';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';

    // Create the heading element and set its text and style properties
    const heading = document.createElement('h3');
    heading.textContent = '提示';
    heading.style.marginTop = '0';
    heading.style.textAlign = 'center';

    // Create the message element and set its text content and style properties
    const message = document.createElement('p');
    message.textContent = '这是提示的内容。';
    message.style.marginTop = '8px';

    // Create the button element and set its text content and style properties
    const button = document.createElement('button');
    button.textContent = '关闭';
    button.style.marginTop = '16px';
    button.style.alignSelf = 'center';
    button.style.background = '#007bff';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.color = '#fff';
    button.style.padding = '8px 16px';
    button.style.cursor = 'pointer';

    // Add the elements to the popup
    popup.appendChild(heading);
    popup.appendChild(message);
    popup.appendChild(button);

    // Add the popup to the overlay
    overlay.appendChild(popup);

    // Add the overlay to the page body
    document.body.appendChild(overlay);

    // Add an event listener to close the popup and overlay when the button is clicked
    button.addEventListener('click', function() {
        overlay.remove();
    });
})();

```
