/* eslint-disable no-inner-declarations */


//https://www.electrical2go.co.uk/checkout/onepage/success/

function generateRandomString(bits1) {
    return (crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295).toString(bits1).substring(2, 15) + (crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295).toString(bits1).substring(2, 15);
}

function getVisitorId() {
    function generateUniqueINCVisitorId(len, bits) {
        var bits1 = bits || 36;
        var outStr = "";
        var newStr;
        while (outStr.length < len) {
            newStr = generateRandomString(bits1).toString().slice(2);
            outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
        }
        return outStr;
    }
    var clientdomain = window.location.host;
    var arr = clientdomain.split(".");
    var d = new Date();
    var expires = "expires=" + d.toUTCString();
    var ivid = "";
    if (readCookie("ivid") != undefined) {
        ivid = readCookie("ivid");
    }
    if (ivid.length == 0) {
        ivid = generateUniqueINCVisitorId(42, 16);
        arr.shift();
        clientdomain = arr.join(".");
        if (arr == "com" || window.location.host.indexOf("www") == -1) {
            clientdomain = window.location.host;
        }
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        expires = "expires=" + d.toUTCString();
        document.cookie = "ivid=" + ivid + "; expires=" + expires + "; domain=" + clientdomain + "; path=/" + "; secure;";
    } else {
        arr.shift();
        clientdomain = arr.join(".");
        if (arr == "com" || window.location.host.indexOf("www") == -1) {
            clientdomain = window.location.host;
        }
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        expires = "expires=" + d.toUTCString();
        document.cookie = "ivid=" + ivid + "; expires=" + expires + "; domain=" + clientdomain + "; path=/" + "; secure;";
    }
    return ivid;
}
getVisitorId();

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var s of ca) {
        var c = s;
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if (readCookie("ivid") != null) {
    let cook_ids = readCookie("ivid");
    localStorage.setItem("inc_cookie", cook_ids);
}

function checkPageType() {
    if (document.querySelector('.product-info-main') != null) return "pdp";
    if (window.location.href.includes("/checkout/cart/")) return "cartPage";
    return null;
}

function checkClientCookie(){
    let consent = false
    if (Cookiebot){
        if (Cookiebot.consented) {
            consent = true
        }else {
            let allowAllButton = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
            let allowSelectionButton = document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection')
            if (allowAllButton){
                allowAllButton.addEventListener('click',function(){
                    consent = true
                    let timeAdd = getTimeout()
                    loadIncFiles(timeAdd);
                })
            }
            if (allowSelectionButton){
                allowSelectionButton.addEventListener('click',function(){
                    consent = true
                    let timeAdd = getTimeout()
                    loadIncFiles(timeAdd);
                })
            }
        }
    }

    return consent
}

function getTimeout(){
    let time = 500
    let pageType = checkPageType()
    if (pageType == "cartPage"){
        time = 500
    }
    return time
}

if (checkPageType() !== null) {
    if (checkClientCookie()){
        let timeAdd = getTimeout()
        loadIncFiles(timeAdd);
    }
}
if(window.location.hostname == 'www.electrical2go.co.uk' && window.location.href.indexOf('onepage/success') >= 0){ 
    var conversion_pixel_flag = true;
    var optimisedtrack = "//optimizedby.increasingly.co"
    var client_id = '327'
    var products;
    var orderID = 0;
    var orderAmount = 0;
    var inctax = 0;
    var incship = 0;
    var curencyinc = "GBP"
    var couponcode = ""
    var discountinc = 0
    let pixelcheck = setInterval(function () {
        try {
            if (window.dataLayer != undefined) {
                for (var d = 0; d < window.dataLayer.length; d++) {
                    if (window.dataLayer[d].event == "purchase" && window.dataLayer[d].ecommerce != undefined) {
                        if (window.dataLayer[d].ecommerce != undefined) {
                            if (window.dataLayer[d].ecommerce.transaction_id != undefined && window.dataLayer[d].ecommerce.value != undefined && window.dataLayer[d].ecommerce.items != undefined) {
                                clearInterval(pixelcheck)
                                products = window.dataLayer[d].ecommerce.items;
                                orderID = window.dataLayer[d].ecommerce.transaction_id;
                                inctax = window.dataLayer[d].ecommerce.tax;
                                incship = window.dataLayer[d].ecommerce.shipping;
                                orderAmount = window.dataLayer[d].ecommerce.value;
                                if(window.dataLayer[d].ecommerce.currency != undefined){
                                    curencyinc = window.dataLayer[d].ecommerce.currency;
                                }
                                if (window.dataLayer[d].ecommerce.coupon != undefined) {
                                    couponcode = window.dataLayer[d].ecommerce.coupon
                                }
                                if (conversion_pixel_flag) {
                                    console.log("track conversion calling")
                                    trackConversion();
                                }
                            }
                        }
                    }
                }
            }
        } catch (er) {
            console.log(er.stack)
        }
    }, 1000)

    function trackConversion() {
        try {
            conversion_pixel_flag = false
            var _incProductsInfo = "";
            var _ivid = "";
            if (localStorage.getItem('inc_cookie') != null && localStorage.getItem('inc_cookie') != "" && localStorage.getItem('inc_cookie') != undefined) {
                _ivid = localStorage.getItem('inc_cookie');
            }

            if (_ivid == null || _ivid == "" || _ivid == undefined) {
                _ivid = readCookie('ivid');
            }
            if(curencyinc == "GBP"){
                if (products != undefined && products != null) {
                    for (var i = 0; i < products.length; i++) {
                        var p1prodId = products[i].item_id
                        var product_id_ = products[i].item_sku
                        var unitPrice = parseFloat(products[i].price)
                        
                        _incProductsInfo += "p1=" + p1prodId + "&p2=" + unitPrice + "&p3=" + products[i].quantity + "&p4=" + product_id_ + "|"
                    }
                    _incProductsInfo = _incProductsInfo.replace(/\|$/, '');
                    if(curencyinc == "GBP"){
                        var _incConvPixData = '' + optimisedtrack + '/track?CONVERSION_PIXEL/clientId=' + client_id + '&orderId=' + orderID + '&orderAmount=' + orderAmount + '&orderStatus=' + escape('complete') + '&currency=' + curencyinc + '&discountAmount=' + discountinc + '&transactionTax=' + inctax + '&transactionShipping=' + incship + '&couponCode=' + couponcode + '&storeCode=' + curencyinc + '&ivid=' + _ivid + '&productsInfo=' + escape(_incProductsInfo) + '&cb=' + Math.floor(Math.random() * 999999);
                        console.log("data -- " + _incConvPixData)

                        var _incConvPixElm = document.createElement('img');
                        _incConvPixElm.setAttribute('border', '0');
                        _incConvPixElm.setAttribute('width', '1');
                        _incConvPixElm.setAttribute('height', '1');
                        _incConvPixElm.setAttribute('src', _incConvPixData);
                        _incConvPixElm.setAttribute('style', 'display:none');
                        var _incConvPixPlaceToSet = document.querySelector('body');
                        _incConvPixPlaceToSet.appendChild(_incConvPixElm);
                    }

                }
            }
        } catch (err) {
            var formData = new FormData();
            formData.append("EmailId", "tech@increasingly.com");
            formData.append("Subject", 'Conversion pixel Error Phase Electrical');
            formData.append("Message", err.stack);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", '//api.increasingly.co/SendEmail', true);
            xhr.send(formData);
        }

    }
}

function loadIncFiles(timeout) {
    if (readCookie("ivid") != null) {
        function addCSSFile() {
            var cssFilePath = "https://www.increasingly.co/Implementation/E2gLeCt/css/E2gLeCt.css";
            var linkTag = document.createElement('link');
            linkTag.rel = "stylesheet";
            linkTag.href = cssFilePath;
            document.querySelector('head').appendChild(linkTag);
        }
        addCSSFile();
        setTimeout(function() {
            var jsFilePath = "https://www.increasingly.co/Implementation/E2gLeCt/js/E2gLeCt.js";
            var scriptTag = document.createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.src = jsFilePath;
            document.querySelector('body').appendChild(scriptTag);
        }, timeout)
    }
}

// Crawling
function crawlData(timeout) {
    setTimeout(() => {
        let PRODUCTID = "";
        if (document.querySelector('.product-info-main .attribute .sku-value') != null){
            PRODUCTID = document.querySelector('.product-info-main .attribute .sku-value').innerText.trim();
        }
        var Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function (e) {
                let t = "";
                let n, r, i, s, o, u, a;
                let f = 0;
                e = Base64._utf8_encode(e);
                while (f < e.length) {
                    n = e.charCodeAt(f++);
                    r = e.charCodeAt(f++);
                    i = e.charCodeAt(f++);
                    s = n >> 2;
                    o = ((n & 3) << 4) | (r >> 4);
                    u = ((r & 15) << 2) | (i >> 6);
                    a = i & 63;
                    if (isNaN(r)) {
                        u = a = 64;
                    } else if (isNaN(i)) {
                        a = 64;
                    }
                    t += this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
                }
                return t;
            },
            decode: function (e) {
                let t = "";
                let n, r, i, s, o, u, a;
                let f = 0;
                e = e.replace(/[^A-Za-z0-9+/=]/g, "");
                while (f < e.length) {
                    s = this._keyStr.indexOf(e.charAt(f++));
                    o = this._keyStr.indexOf(e.charAt(f++));
                    u = this._keyStr.indexOf(e.charAt(f++));
                    a = this._keyStr.indexOf(e.charAt(f++));
                    n = (s << 2) | (o >> 4);
                    r = ((o & 15) << 4) | (u >> 2);
                    i = ((u & 3) << 6) | a;
                    t += String.fromCharCode(n);
                    if (u != 64) {
                        t += String.fromCharCode(r);
                    }
                    if (a != 64) {
                        t += String.fromCharCode(i);
                    }
                }
                t = Base64._utf8_decode(t);
                return t;
            },
            _utf8_encode: function (e) {
                e = e.replace(/rn/g, "n");
                let t = "";
                for (let n = 0; n < e.length; n++) {
                    let r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                    } else if (r > 127 && r < 2048) {
                        t += String.fromCharCode((r >> 6) | 192);
                        t += String.fromCharCode((r & 63) | 128);
                    } else {
                        t += String.fromCharCode((r >> 12) | 224);
                        t += String.fromCharCode(((r >> 6) & 63) | 128);
                        t += String.fromCharCode((r & 63) | 128);
                    }
                }
                return t;
            },
            _utf8_decode: function (e) {
                let t = "";
                let n = 0;
                let r, c1, c2, c3;
                while (n < e.length) {
                    r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                        n++;
                    } else if (r > 191 && r < 224) {
                        c2 = e.charCodeAt(n + 1);
                        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
                        n += 2;
                    } else {
                        c2 = e.charCodeAt(n + 1);
                        c3 = e.charCodeAt(n + 2);
                        t += String.fromCharCode(((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        n += 3;
                    }
                }
                return t;
            },
        };

        const getCurrentFormattedTime = () => {
            var d = new Date();
            return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
        };

        function getDesription() {
            let description = null;
            let element = document.querySelector('#description')
            if (element) {
                description = element.innerHTML;
            }
            return description;
        }
        var product_qty = 1
        if(document.querySelector('.box-tocart .qty.qty-field[name="qty"]') != null){
            product_qty = document.querySelector('.box-tocart .qty.qty-field[name="qty"]').value
        }   
        let product_id = PRODUCTID;
        let description = getDesription();

        var format_json_data = JSON.stringify({
            event_data: {
                product_id: product_id,
                description: encodeURI(description),
                field3 : product_qty
            },
            event_type: "product_page_visit",
            method: "track",
            token: "ph@$eEle",
        });

        var data = {
            eventData: Base64.encode(format_json_data),
            vid: readCookie("ivid"),
            time: getCurrentFormattedTime(),
            uri: document.location.href,
        };

        var p_url = "https://gather.increasingly.com/ImportCrawledData";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    if (xhr.responseText != "" && xhr.responseText != null) {
                        // m_incBndle.DataModel.jsonData = xhr.responseText;
                        // callback(m_incBndle.DataModel.jsonData)
                    } else {
                        //console.log(xhr);
                    }
                }
            }
        };
        xhr.open("POST", p_url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }, timeout);
}
setTimeout(function(){ 
    if (document.querySelector(".pdp-banner") != null || document.querySelector(".template-product") != null){
        crawlData(1000)
    }
},6500)
