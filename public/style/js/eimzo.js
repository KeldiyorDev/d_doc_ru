

// eng to'g'risi shu   1-part
let EIMZO_MAJOR = 3;
let EIMZO_MINOR = 37;

let errorCAPIWS = 'Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.';
let errorBrowserWS = 'Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.';
let errorUpdateApp = 'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>';
let errorWrongPassword = 'Пароль неверный.';


let AppLoad = function () {
    EIMZOClient.API_KEYS = [
        'localhost', '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
        '127.0.0.1', 'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
        'null', 'E0A205EC4E7B78BBB56AFF83A733A1BB9FD39D562E67978CC5E7D73B0951DB1954595A20672A63332535E13CC6EC1E1FC8857BB09E0855D7E76E411B6FA16E9D',
        'dls.yt.uz', 'EDC1D4AB5B02066FB3FEB9382DE6A7F8CBD095E46474B07568BC44C8DAE27B3893E75B79280EA82A38AD42D10EA0D600E6CE7E89D1629221E4363E2D78650516',

        'd-doc.uz', '1167B49CE5C99FE4FC894AC99FC9CDA128F4DE7E094C61F70596447861088D38585CC9C02BCFFB95685A29EA7739C5016EE37CFD873F9086FF81B3DCC5D3AE7F'
    ];
    uiLoading();
    EIMZOClient.checkVersion(function (major, minor) {
        let newVersion = EIMZO_MAJOR * 100 + EIMZO_MINOR;
        let installedVersion = parseInt(major) * 100 + parseInt(minor);
        if (installedVersion < newVersion) {
            uiUpdateApp();
        } else {
            EIMZOClient.installApiKeys(function () {
                uiLoadKeys();
            }, function (e, r) {
                if (r) {
                    uiShowMessage(r);
                } else {
                    wsError(e);
                }
            });
        }
    }, function (e, r) {
        if (r) {
            uiShowMessage(r);
        } else {
            uiNotLoaded(e);
        }
    });
}


let uiShowMessage = function (message) {
    alert(message);
}

let uiLoading = function () {
    let l = document.getElementById('message');
    l.innerHTML = 'Загрузка ...';
    l.style.color = 'red';
}

let uiNotLoaded = function (e) {
    let l = document.getElementById('message');
    l.innerHTML = '';
    if (e) {
        wsError(e);
    } else {
        uiShowMessage(errorBrowserWS);
    }
}

let uiUpdateApp = function () {
    let l = document.getElementById('message');
    l.innerHTML = errorUpdateApp;
}

let uiLoadKeys = function () {
    uiClearCombo();
    EIMZOClient.listAllUserKeys(function (o, i) {
        fetch('', {
            method: "POST",
            body: JSON.stringify(o)
        })
        // console.log(o);
        let itemId = "itm-" + o.serialNumber + "-" + i;
        return itemId;
    }, function (itemId, v) {
        return uiCreateItem(itemId, v);
    }, function (items, firstId) {
        uiFillCombo(items);
        uiLoaded();
        uiComboSelect(firstId);
    }, function (e, r) {
        if (e) {
            uiShowMessage(errorCAPIWS + " : " + e);
        } else {
            uiShowMessage(r);
        }
    });
}

let uiComboSelect = function (itm) {
    if (itm) {
        let id = document.getElementById(itm);
        id.setAttribute('selected', 'true');
    }
}

let cbChanged = function (c) {
    document.getElementById('keyId').innerHTML = '';
}

let uiClearCombo = function () {
    // let combo = document.testform.key;
    let combo = document.querySelector('.testform')?.querySelector('.key')?.querySelectorAll('li');
    combo.length = 0;
}

let uiFillCombo = function (items) {
    // console.log(items);
    // let combo = document.testform.key;
    let combo = document.querySelector('.testform')?.querySelector('.key');
    for (let itm in items) {
        combo.append(items[itm]);
    }
}

let uiLoaded = function () {
    let l = document.getElementById('message');
    l.innerHTML = '';
}

let uiCreateItem = function (itmkey, vo) {
    // console.log(itmkey);
    let now = new Date();
    vo.expired = dates.compare(now, vo.validTo) > 0;
    // let itm = document.createElement("option");
    let itm = document.createElement("li");
    itm.setAttribute('value', `${itmkey}`);
    // itm.text = vo.CN;
    itm.innerHTML = `
            <span class="d-block"><strong><img src="/assets/icon/unnamed.png"></img>№ Sertifikat:</strong>${vo.serialNumber}</span>
            <span class="d-block"><strong>INN:</strong>${vo.TIN}</span>  
            <span class="d-block"><strong>F.I.SH:</strong> ${vo.CN}</span>  
            <span class="d-block tashkilotName"><strong>TASHKILOT:</strong> ${vo.O}</span>  
            <span class="d-block lavozimName"><strong>Lavozim:</strong> ${vo.T}</span>  
            <span class="d-block validTime"><strong>Tugash vaqti:</strong> ${vo.validFrom.toLocaleDateString()} - ${vo.validTo.toLocaleDateString()}</span>  
             `;
    if (!vo.expired) {

    } else {
        itm.style.color = 'gray';
        itm.text = itm.text + ' (срок истек)';
    }
    itm.setAttribute('vo', JSON.stringify(vo));
    itm.setAttribute('id', itmkey);
    return itm;
}

let wsError = function (e) {
    if (e) {
        uiShowMessage(errorCAPIWS + " : " + e);
    } else {
        uiShowMessage(errorBrowserWS);
    }
};

function sign() {
    // let itm = document.testform.key.value;
    let itm = document.querySelector('.testform').querySelector('.selectValue').getAttribute("value");
    // console.log(itm);
    if (itm) {
        let id = document.getElementById(itm);
        let vo = JSON.parse(id.getAttribute('vo'));
        let data = document.testform.data.value;
        let keyId = document.getElementById('keyId').innerHTML;
        if (keyId) {
            EIMZOClient.createPkcs7(keyId, data, null, function (pkcs7) {
                document.testform.pkcs7.value = pkcs7;
            }, function (e, r) {
                if (r) {
                    if (r.indexOf("BadPaddingException") != -1) {
                        uiShowMessage(errorWrongPassword);
                    } else {
                        uiShowMessage(r);
                    }
                } else {
                    document.getElementById('keyId').innerHTML = '';
                    uiShowMessage(errorBrowserWS);
                }
                if (e) wsError(e);
            });
        } else {
            EIMZOClient.loadKey(vo, function (id) {
                document.getElementById('keyId').innerHTML = id;
                EIMZOClient.createPkcs7(id, data, null, function (pkcs7) {
                    document.testform.pkcs7.value = pkcs7;
                }, function (e, r) {
                    if (r) {
                        if (r.indexOf("BadPaddingException") != -1) {
                            uiShowMessage(errorWrongPassword);
                        } else {
                            uiShowMessage(r);
                        }
                    } else {
                        document.getElementById('keyId').innerHTML = '';
                        uiShowMessage(errorBrowserWS);
                    }
                    if (e) wsError(e);
                });
            }, function (e, r) {
                if (r) {
                    if (r.indexOf("BadPaddingException") != -1) {
                        uiShowMessage(errorWrongPassword);
                    } else {
                        uiShowMessage(r);
                    }
                } else {
                    uiShowMessage(errorBrowserWS);
                }
                if (e) wsError(e);
            });
        }
    }
};

window.onload = AppLoad;



// 2-part
// let EIMZO_MAJOR = 3;
// let EIMZO_MINOR = 37;
// let errorCAPIWS =
//     "Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.";
// let errorBrowserWS =
//     "Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.";
// let errorUpdateApp =
//     'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>';
// let errorWrongPassword = "Пароль неверный.";

// let AppLoad = function () {
//     EIMZOClient.API_KEYS = [
//         'localhost', '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
//         '127.0.0.1', 'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
//         'null', 'E0A205EC4E7B78BBB56AFF83A733A1BB9FD39D562E67978CC5E7D73B0951DB1954595A20672A63332535E13CC6EC1E1FC8857BB09E0855D7E76E411B6FA16E9D',
//         'dls.yt.uz', 'EDC1D4AB5B02066FB3FEB9382DE6A7F8CBD095E46474B07568BC44C8DAE27B3893E75B79280EA82A38AD42D10EA0D600E6CE7E89D1629221E4363E2D78650516'
//     ];
//     uiLoading();
//     EIMZOClient.checkVersion(
//         function (major, minor) {
//             let newVersion = EIMZO_MAJOR * 100 + EIMZO_MINOR;
//             let installedVersion = parseInt(major) * 100 + parseInt(minor);
//             if (installedVersion < newVersion) {
//                 uiUpdateApp();
//             } else {
//                 EIMZOClient.installApiKeys(
//                     function () {
//                         uiLoadKeys();
//                     },
//                     function (e, r) {
//                         if (r) {
//                             uiShowMessage(r);
//                         } else {
//                             wsError(e);
//                         }
//                     }
//                 );
//             }
//         },
//         function (e, r) {
//             if (r) {
//                 uiShowMessage(r);
//             } else {
//                 uiNotLoaded(e);
//             }
//         }
//     );
// };

// let uiShowMessage = function (message) {
//     alert(message);
// };

// let uiLoading = function () {
//     let l = $(".wait-loading");
//     let f = $(".every-thing-ok");
//     l.css("display", "block");
//     f.css("display", "none");
// };

// let uiNotLoaded = function (e) {
//     let l = $(".wait-loading");
//     let f = $(".every-thing-ok");
//     let n = $(".not-installed");
//     if (f && n && l) {
//         l.css("display", "none");
//         f.css("display", "none");
//         n.css("display", "block");
//         if (e) {
//         } else {
//             uiShowMessage(errorBrowserWS);
//         }
//     } else {
//         if (e) {
//             uiShowMessage(errorCAPIWS);
//         } else {
//             uiShowMessage(errorBrowserWS);
//         }
//     }
// };

// let uiUpdateApp = function () {
//     let l = $(".wait-loading");
//     let f = $(".every-thing-ok");
//     l.css("display", "none");
//     f.css("display", "none");
// };

// let uiLoadKeys = function () {
//     $("#ecp-form-submit").click(function () {
//         uiEcpLogin();
//     });
//     uiClearCombo();
//     EIMZOClient.listAllUserKeys(
//         function (o, i) {
//             let itemId = "itm-" + o.serialNumber + "-" + i;
//             return itemId;
//         },
//         function (itemId, v) {
//             return uiCreateItem(itemId, v);
//         },
//         function (items, firstId) {
//             uiFillCombo(items);
//             uiLoaded();
//             // uiComboSelect(firstId);
//         },
//         function (e, r) {
//             uiShowMessage(errorCAPIWS);
//         }
//     );
// };

// let uiComboSelect = function (id) {
//     if (!id) {
//         selectedUserKey = null;
//         return;
//     }
//     let s = $("#" + id).text();
//     let vo = JSON.parse(s);
//     selectedUserKey = vo;
//     if (selectedUserKey.type === "pfx" || selectedUserKey.type === "ftjc") {
//         $("#ecp-form-submit").show();
//     } else {
//         $("#ecp-form-submit").hide();
//     }
//     $("#leDropdownMenu1").html(vo.TIN + " - " + vo.CN);
//     document.testform.key.value = id;
//     GenereteDataItem(vo);
// };

// let cbChanged = function (c) {
//     document.getElementById("keyId").innerHTML = "";
// };

// let uiClearCombo = function () {
//     $(".keysDropdownMenu").empty();
// };

// let uiFillCombo = function (items) {
//     for (let itm in items) {
//         $(".keysDropdownMenu").append(items[itm]);
//     }
// };

// let uiLoaded = function () {
//     let l = $(".wait-loading");
//     let f = $(".every-thing-ok");
//     l.css("display", "none");
//     f.css("display", "block");
// };

// let uiCreateItem = function (itmkey, vo) {
//     let now = new Date();
//     vo.expired = dates.compare(now, vo.validTo) > 0;
//     let itm = '<a class="dropdown-item" href="javascript://" ';
//     if (!vo.expired) {
//         itm += "onclick=\"uiComboSelect('" + itmkey + "')\"";
//     } else {
//         itm += "style='color: gray'";
//     }
//     itm += ">";
//     itm += '<ul class="list-unstyled">';
//     if (true) {
//         itm +=
//             '<li><strong class="text-uppercase">№ СЕРТИФИКАТА: </strong>' +
//             vo.serialNumber.toLowerCase() +
//             "</li>";

//         itm +=
//             '<li><strong class="text-uppercase">ИНН: </strong><b>' +
//             vo.TIN +
//             "</b>";
//         if (isLegalEntity(vo.TIN)) {
//             itm += ' <span class="badge"> ЮРИДИЧЕСКОЕ ЛИЦО</span>';
//         } else {
//             itm += ' <span class="badge"> ФИЗИЧЕСКОЕ ЛИЦО</span>';
//         }
//         itm += "</li>";
//         itm +=
//             '<li><strong class="text-uppercase">Ф.И.О: </strong><b>' +
//             vo.CN +
//             "</b></li>";
//         if (vo.O !== "") {
//             itm +=
//                 '<li><strong class="text-uppercase">Организация:</strong>' +
//                 vo.O +
//                 "</li>";
//         }
//         if (vo.expired) {
//             itm +=
//                 '<li><strong class="text-uppercase" style="color:#BB1100;">Срок действия сертификата (' +
//                 vo.validFrom.ddmmyyyy() +
//                 " - " +
//                 vo.validTo.ddmmyyyy() +
//                 ") истек</strong></li>";
//         } else {
//             itm +=
//                 '<li><strong class="text-uppercase">срок действия сертификата: </strong> ' +
//                 vo.validFrom.ddmmyyyy() +
//                 " - " +
//                 vo.validTo.ddmmyyyy() +
//                 "</li>";
//         }
//     }
//     itm +=
//         "<div id='" +
//         itmkey +
//         "' class='hidden-value' style='display: none'>" +
//         JSON.stringify(vo) +
//         "</div>";
//     itm += "</ul></a>";
//     return itm;
// };

// let wsError = function (e) {
//     if (e) {
//         uiShowMessage(errorCAPIWS + " : " + e);
//     } else {
//         uiShowMessage(errorBrowserWS);
//     }
// };

// let isLegalEntity = function (tin) {
//     return tin.charAt(0) === "2" || tin.charAt(0) === "3";
// };

// sign = function () {
//     let itm = $(".keysDropdownMenu");
//     // console.log("Sing corect 1");
//     if (itm) {
//         // console.log("Sing corect 2");
//         let data = document.testform.data.value;
//         let keyId = document.testform.keyId.value;
//         if (keyId) {
//             console.log("Confirm password key");
//             EIMZOClient.createPkcs7(
//                 keyId,
//                 data,
//                 null,
//                 function (pkcs7) {
//                     document.testform.pkcs7.value = pkcs7;
//                     $("#btnsubmit").trigger("click");
//                     console.log("Confirmed password key");
//                 },
//                 function (e, r) {
//                     if (r) {
//                         if (r.indexOf("BadPaddingException") != -1) {
//                             uiShowMessage(errorWrongPassword);
//                         } else {
//                             uiShowMessage(r);
//                         }
//                     } else {
//                         document.getElementById("keyId").innerHTML = "";
//                         uiShowMessage(errorBrowserWS);
//                     }
//                     if (e) wsError(e);
//                 }
//             );
//         }
//     }
// };

// function GenereteDataItem(vo) {
//     document.testform.vo.value = JSON.stringify(vo);
//     console.log("Vo created !");
//     EIMZOClient.loadKey(vo, function (id) {
//         document.testform.keyId.value = id;
//         console.log("Keyid created !");
//     });
//     checkParams();
// }

// window.onload = AppLoad;

// function checkParams() {
//     let vo = document.testform.vo.value;
//     let button = $("#btnsing");
//     if (button) {
//         if (vo.lenght != 0) {
//             button.removeAttr("disabled");
//         } else {
//             button.attr("disabled", "disabled");
//         }
//     }
// }