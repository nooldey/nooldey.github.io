var Dpr = 1,
    uAgent = window.navigator.userAgent;
var isIOS = uAgent.match(/iphone/i);
var isYIXIN = uAgent.match(/yixin/i);
var is2345 = uAgent.match(/Mb2345/i);
var ishaosou = uAgent.match(/mso_app/i);
var isSogou = uAgent.match(/sogoumobilebrowser/ig);
var isLiebao = uAgent.match(/liebaofast/i);
var isGnbr = uAgent.match(/GNBR/i);
function isPc() {
    if (uAgent.match(/(iPhone|Android|SymbianOS|Windows Phone|iPod|iPad)/i)) {
        return false;
    } else {
        return true;
    }
}
console.log('i m here')
try {
    document.body.className = isPc() ? "pc" : "mobile";
} catch (error) {
    console.error(error)
}
const result = document.querySelector("#result");
const ignoreConfig = /ignore=.+/.test(location.search)
const url = location.href.replace(/#.*$/, '');
const timeoutLoginPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject({
            message: 'login timeout'
        });
    }, 3000);
});
function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return '';
}
const open_id = localStorage.getItem('userId');
const code = getQueryVariable('code');
const urlLogin = `https://mina.bytedance.com/api/invoke/login?open_id=${open_id}&code=${code}`;
const getLoginPromise = window.fetch(urlLogin);
Promise.race([timeoutLoginPromise, getLoginPromise]).then(res => res.json()).then(res => {
    if (res.location) {
        location.href = `${res.location}?redirect_uri=${encodeURIComponent(location.href)}&app_id=${res.appId}`;
    } else {
        localStorage.setItem('userId', res.open_id);
        const signUrl = encodeURIComponent(location.href.replace(/#.*$/, ''));
        const urlAuth = `https://mina.bytedance.com/api/invoke/shop_signature?url=${signUrl}&userId=${res.open_id}`;
        const getSignPromise = window.fetch(urlAuth);
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject({
                    message: 'getsignature timeout'
                });
            }, 3000);
        });
        Promise.race([timeoutPromise, getSignPromise])
            .then(res => res.json())
            .catch(e => {
                alert(`config fail ${JSON.stringify(e)}`)
                return {}
            })
            .then(res => {
                return Object.assign({ appId: 'cli_9d032fa106609101' }, res);
            })
            .then(res => {
                if (window.h5sdk) {
                    console.log(JSON.stringify(res));
                    ignoreConfig || window.h5sdk.config({
                        appId: res.appId,
                        timestamp: +res.timestamp,
                        nonceStr: res.noncestr,
                        signature: res.signature,
                        jsApiList: [
                            'biz.navigation.close',
                            'biz.util.share'
                        ],
                        onSuccess: (res) => {
                            window.h5sdk.device.notification.toast({
                                text: "config success",
                                duration: 3
                            });
                            console.log(`config: success ${JSON.stringify(res)}`);
                        },
                        onFail: (res) => {
                            window.h5sdk.device.notification.toast({
                                text: "config fail",
                                duration: 3
                            });
                            console.log(`config: fail ${JSON.stringify(res)}`);
                        }
                    });
                    window.h5sdk.error(err => {
                        console.error('config error', JSON.stringify(err));
                    });
                    window.h5sdk.ready(() => {
                        document.querySelector(".demo").classList.add("show-block");
                        // ----TT START----- //
                        const onUserCaptureScreen = () => {
                            tt.showToast({
                                title: 'user has captureScreen',
                                icon: 'none',
                                duration: 1500,
                            })
                        }
                        const normalCallbacks = (type, prefix, extraFunc) => {
                            let success = (res) => {
                                console.log(`${prefix} success`, res)
                                tt.showToast({
                                    title: `${prefix} success`,
                                    icon: 'none',
                                    duration: 1500,
                                });
                                if (extraFunc) extraFunc();
                            }
                            if (type === 'modal') {
                                success = (res) => {
                                    tt.showModal({
                                        title: '调用成功',
                                        content: typeof res === 'string' ? res : JSON.stringify(res),
                                    });
                                }
                            }
                            const fail = (err) => {
                                console.log(`${prefix} fail`, JSON.stringify(err));
                                tt.showToast({
                                    title: `${prefix} fail`,
                                    icon: 'none',
                                    duration: 1500,
                                });
                            }
                            return { success, fail };
                        }
                        bindClickForTT('#tt-onUserCaptureScreen', 'click', () => {
                            tt.onUserCaptureScreen(onUserCaptureScreen);
                        });
                        bindClickForTT('#tt-offUserCaptureScreen', 'click', () => {
                            tt.offUserCaptureScreen(onUserCaptureScreen);
                        });
                        bindClickForTT('#tt-getSystemInfo', 'click', () => {
                            tt.getSystemInfo({ ...normalCallbacks('modal', 'getSystemInfo') });
                        });

                        bindClickForTT('#tt-setClipboardData', 'click', () => {
                            tt.setClipboardData({
                                data: "https://www.feishu.cn/",
                                ...normalCallbacks('toast', 'setClipboardData')
                            });
                        });
                        bindClickForTT('#tt-getClipboardData', 'click', () => {
                            tt.getClipboardData({ ...normalCallbacks('modal', 'getClipboardData') });
                        });
                        bindClickForTT('#tt-mailto', 'click', () => {
                            tt.mailto({
                                to: ["test@gmail.com"],
                                cc: ["test.cc@gmail.com", "test.cc2@gmail.com"],
                                bcc: ["test.bcc@gmail.com"],
                                subject: '测试',
                                body: '测试',
                                ...normalCallbacks('toast', 'mailto')
                            });
                        });
                        bindClickForTT('#tt-startDeviceCredential', 'click', () => {
                            tt.startDeviceCredential({
                                authContent: '解锁界面',
                                ...normalCallbacks('toast', 'startDeviceCredential')
                            });
                        });
                        bindClickForTT('#tt-startPasswordVerify', 'click', () => {
                            tt.startPasswordVerify({ ...normalCallbacks('toast', 'startPasswordVerify') });
                        });

                        bindClickForTT('#tt-startFaceVerify', 'click', () => {
                            tt.startFaceVerify({ ...normalCallbacks('toast', 'startFaceVerify') });
                        });

                        bindClickForTT('#tt-openSchema', 'click', () => {
                            tt.openSchema({
                                schema: 'https://www.apple.com',
                                external: false,
                                ...normalCallbacks('toast', 'openSchema')
                            });
                        });

                        bindClickForTT('#tt-docsPicker', 'click', () => {
                            tt.docsPicker({ ...normalCallbacks('modal', 'docsPicker') });
                        });

                        bindClickForTT('#tt-showModal', 'click', () => {
                            tt.showModal({
                                title: '提示',
                                content: '这是一个模态弹窗',
                                success(res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                    }
                                },
                                fail(err) {
                                    console.log(`showModal 调用失败`, JSON.stringify(err));
                                    tt.showToast({
                                        title: '调用失败',
                                        icon: 'none',
                                        duration: 1500,
                                    })
                                }
                            })
                        });

                        bindClickForTT('#tt-showToast', 'click', () => {
                            tt.showToast({
                                title: 'showToast success',
                                icon: 'none',
                                duration: 2000,
                            });
                        });

                        bindClickForTT('#tt-hideToast', 'click', () => {
                            tt.hideToast({
                                success(res) {
                                    console.log(`${res}`);
                                },
                                fail(err) {
                                    console.log(`hideToast 调用失败`, JSON.stringify(err));
                                    tt.showToast({
                                        title: '调用失败',
                                        icon: 'none',
                                        duration: 2000,
                                    });
                                }
                            });
                        });

                        bindClickForTT('#tt-showPrompt', 'click', () => {
                            tt.showPrompt({
                                title: '这是个输入弹窗',
                                confirmText: '确定',
                                cancelText: '取消',
                                success(res) {
                                    if (res.confirm) {
                                        console.log('confirm and inputValue is: ' + res.inputValue);
                                    } else if (res.cancel) {
                                        console.log('cancel')
                                    }
                                },
                                fail(err) {
                                    console.log(`showPrompt 调用失败`, JSON.stringify(err));
                                    tt.showToast({
                                        title: '调用失败',
                                        icon: 'none',
                                        duration: 2000,
                                    });
                                }
                            });
                        });

                        bindClickForTT('#tt-getUserInfo', 'click', () => {
                            tt.getUserInfo({
                                withCredentials: true,
                                ...normalCallbacks('modal', 'getUserInfo')
                            });
                        });

                        bindClickForTT('#tt-showActionSheet', 'click', () => {
                            tt.showActionSheet({
                                itemList: ['微信', '微博', '陌陌'],
                                success: function (res) {
                                    console.log(res.tapIndex)
                                }
                            });
                        });

                        let titleId = 1;
                        bindClickForTT('#tt-setNavigationBarTitle', 'click', () => {
                            tt.setNavigationBarTitle({
                                title: '当前页面' + titleId,
                                ...normalCallbacks('toast', 'setNavigationBarTitle', () => { titleId += 1 })
                            })
                        });

                        bindClickForTT('#tt-setNavigationBarColor', 'click', () => {
                            tt.setNavigationBarColor({
                                frontColor: '#ffffff',
                                backgroundColor: '#ff0000',
                                ...normalCallbacks('toast', 'setNavigationBarColor')
                            });
                        });

                        bindClickForTT('#tt-getLocation', 'click', () => {
                            tt.getLocation({
                                type: 'gcj02',
                                ...normalCallbacks('modal', 'getLocation')
                            });
                        });

                        bindClickForTT('#tt-downloadFile', 'click', () => {
                            const progressDom = document.querySelector('.tt-downloadProgress');
                            const select = document.querySelector('#tt-downloadFile-select').value;
                            progressDom.innerHTML = '准备下载...';
                            const task = tt.downloadFile({
                                url: 'https://github.com/a001189/dzbook/raw/master/Python核心编程第三版中文版.pdf',
                                ...normalCallbacks('toast', 'downloadFile', () => {
                                    progressDom.innerHTML = `下载成功`;
                                })
                            });
                            task.onProgressUpdate(res => {
                                progressDom.innerHTML = `下载进度为${res.progress}%;`;
                                if (select === 'auto-cancel' && res.progress > 20) {
                                    task.abort();
                                }
                            });
                        });

                        bindClickForTT('#tt-openDocument', 'click', () => {
                            const select = document.querySelector('#tt-openDocument-select').value;
                            const openDocumentProgress = document.querySelector('.tt-openDocumentProgress');
                            openDocumentProgress.innerHTML = '准备下载...';
                            const task = tt.downloadFile({
                                url: select,
                                success: res => {
                                    tt.openDocument({
                                        filePath: res.tempFilePath,
                                        showMenu: true,
                                        ...normalCallbacks('toast', 'openDocument')
                                    })
                                },
                                fail: err => {
                                    window.h5sdk.device.notification.alert({
                                        message: JSON.stringify(err),
                                        title: "downloadFile",
                                        buttonName: "Ok"
                                    });
                                }
                            });
                            task.onProgressUpdate(res => {
                                openDocumentProgress.innerHTML = `下载进度为${res.progress}%;`;
                            })
                        });

                        bindClickForTT('#tt-removeSavedFile', 'click', () => {
                            const select = document.querySelector('#removeSavedFile-select').value;
                            const removeSavedFileProgress = document.querySelector('.removeSavedFileProgress');
                            removeSavedFileProgress.innerHTML = '准备下载...';
                            const task = tt.downloadFile({
                                url: select,
                                success: res => {
                                    window.h5sdk.device.notification.alert({
                                        message: JSON.stringify(res),
                                        title: "downloadFile",
                                        buttonName: "Ok"
                                    });
                                    tt.removeSavedFile({
                                        filePath: res.tempFilePath,
                                        success: res => {
                                            window.h5sdk.device.notification.alert({
                                                message: JSON.stringify(res),
                                                title: "removeSavedFile",
                                                buttonName: "Ok"
                                            });
                                        },
                                        fail: err => {
                                            window.h5sdk.device.notification.alert({
                                                message: JSON.stringify(err),
                                                title: "removeSavedFile",
                                                buttonName: "Ok"
                                            });
                                        }
                                    })
                                },
                                fail: err => {
                                    window.h5sdk.device.notification.alert({
                                        message: JSON.stringify(err),
                                        title: "downloadFile",
                                        buttonName: "Ok"
                                    });
                                }
                            });
                            task.onProgressUpdate(res => {
                                removeSavedFileProgress.innerHTML = `下载进度为${res.progress}%;`;
                            })
                        });


                        bindClickForTT('#tt-authorize', 'click', () => {
                            tt.authorize({
                                scope: 'scope.appBadge',
                                ...normalCallbacks('toast', 'authorize')
                            })
                        });

                        bindClickForTT('#tt-openSetting', 'click', () => {
                            tt.openSetting({
                                ...normalCallbacks('toast', 'openSetting')
                            })
                        });

                        bindClickForTT('#tt-getSetting', 'click', () => {
                            tt.getSetting({
                                ...normalCallbacks('modal', 'getSetting')
                            })
                        });

                        bindClickForTT('#tt-updateBadge', 'click', () => {
                            tt.updateBadge({
                                badgeNum: 1,
                                ...normalCallbacks('toast', 'updateBadge')
                            })
                        });

                        bindClickForTT('#tt-reportBadge', 'click', () => {
                            tt.reportBadge({
                                badgeNum: 2,
                                ...normalCallbacks('toast', 'reportBadge')
                            })
                        });
                        bindClickForTT('#tt-getTenantAppScopes', 'click', () => {
                            tt.getTenantAppScopes({
                                ...normalCallbacks('modal', 'getTenantAppScopes')
                            });
                        });
                        bindClickForTT('#tt-applyTenantAppScope', 'click', () => {
                            tt.applyTenantAppScope({
                                ...normalCallbacks('toast', 'applyTenantAppScope')
                            });
                        });
                        bindClickForTT('#tt-nfc-startDiscovery', 'click', () => {
                            const nfc = tt.getNFCAdapter()
                            const cb = window.__nfc_callback ? window.__nfc_callback : (v) => {
                                console.log(v)
                                document.getElementById('tt-nfc-tech').value = `${v.techs.join(' ')}`
                            }
                            nfc.startDiscovery({
                                success: e => console.log('start success'),
                                fail: e => console.log('start fail', e)
                            })
                            nfc.onDiscovered(cb)
                        })
                        bindClickForTT('#tt-nfc-stopDiscovery', 'click', () => {
                            const nfc = tt.getNFCAdapter()
                            const cb = window.__nfc_callback ? window.__nfc_callback : (v) => {
                                console.log(v)
                                document.getElementById('tt-nfc-tech').value = `${v.techs.join(' ')}`
                            }
                            nfc.stopDiscovery({
                                success: (e) => console.log('stop success', e),
                                fail: (e) => console.log('stop fail', e)
                            })
                            nfc.offDiscovered(cb)
                        })
                        bindClickForTT('#tt-nfc-read', 'click', () => {
                            const nfc = tt.getNFCAdapter().getNfcA()

                            function renderArrayBuffer(id, buffer) {
                                document.getElementById(id).innerText = Array.from(new Uint8Array(buffer)).map(v => v.toString(16))
                            }

                            nfc.connect({
                                success: () => {
                                    console.log('connect:success')
                                    nfc.transceive({
                                        data: new Uint8Array([0x30, 0x05]).buffer,
                                        success: e => {
                                            console.log('transceive:success', e)
                                            renderArrayBuffer('tt-nfc-data', e.data)
                                        },
                                        fail: e => {
                                            console.log('transceive:fail', e)
                                        }
                                    })
                                    nfc.getAtqa({
                                        success: e => {
                                            console.log('getAtqa:success', e)
                                            renderArrayBuffer('tt-nfc-atqa', e.data)
                                        },
                                        fail: e => console.log('getAtqa:fail', e)
                                    })
                                    nfc.getSak({
                                        success: e => {
                                            console.log('getSak:success', e)
                                            document.getElementById('tt-nfc-sak').value = e.sak
                                        },
                                        fail: e => console.log('getSak:fail', e)
                                    })
                                },
                                fail: () => console.log('connect:fail')
                            })
                        })
                        bindClickForTT('#tt-openLocation', 'click', () => {
                            tt.openLocation({
                                latitude: 0,
                                longitude: 0,
                                ...normalCallbacks('toast', 'openLocation')
                            });
                        });
                        bindClickForTT('#tt-chooseLocation', 'click', () => {
                            tt.chooseLocation({
                                latitude: '0',
                                longitude: '0',
                                ...normalCallbacks('toast', 'chooseLocation')
                            });
                        });
                        bindClickForTT('#tt-getLocationStatus', 'click', () => {
                            tt.getLocationStatus({
                                ...normalCallbacks('modal', 'getLocationStatus')
                            });
                        });
                        const locationChange = (res) => {
                            tt.showModal({
                                title: 'location change',
                                content: JSON.stringify(res),
                            })
                        }
                        bindClickForTT('#tt-onLocationChange', 'click', () => {
                            tt.onLocationChange(locationChange);
                        });
                        bindClickForTT('#tt-offLocationChange', 'click', () => {
                            tt.offLocationChange(locationChange);
                        });
                        bindClickForTT('#tt-getWifiStatus', 'click', () => {
                            tt.getWifiStatus({
                                ...normalCallbacks('modal', 'getWifiStatus')
                            });
                        });
                        bindClickForTT('#tt-getWifiList', 'click', () => {
                            tt.getWifiList({
                                ...normalCallbacks('modal', 'getWifiList')
                            });
                        });
                        bindClickForTT('#tt-getConnectedWifi', 'click', () => {
                            tt.getConnectedWifi({
                                ...normalCallbacks('modal', 'getConnectedWifi')
                            });
                        });
                        const onGetWifiList = (res) => {
                            tt.showModal({
                                title: 'wifi list',
                                content: JSON.stringify(res),
                            })
                        }
                        bindClickForTT('#tt-onGetWifiList', 'click', () => {
                            tt.onGetWifiList(onGetWifiList);
                        });
                        bindClickForTT('#tt-offGetWifiList', 'click', () => {
                            tt.offGetWifiList(onGetWifiList);
                        });
                        // -----TT END-------//

                        bindClick("#share", "click", () => {
                            window.h5sdk.biz.util.share({
                                url: "https://www.feishu.cn/",
                                title: "Lark",
                                content: "Always One, Always Agile",
                                image:
                                    "https://s1.pstatp.com/ee/feishu_website/static/img/logo-zh.648d6d02.png",
                                onSuccess: data => { }
                            });
                        });
                        bindClick("#close", "click", () => {
                            window.h5sdk.biz.navigation.close({
                                onSuccess: data => {
                                    result.innerHTML = JSON.stringify(data);
                                }
                            });
                        });
                    });
                } else {
                    document.querySelector(".tips").classList.add("show-block");
                }
            })
    }
}).catch(err => {
    console.error(err);
})

function bindClickForTT(str, event, callback) {
    const ele = document.querySelector(str);
    ele.addEventListener(event, callback);
}

function bindClick(str, event, callback) {
    const ele = document.querySelector(str);
    const sectionEle = ele.parentNode.parentNode;
    const apiName = sectionEle.firstElementChild.innerText + "." + ele.innerText;
    const hasApi = !!apiName.split(".").reduce((prev, cur) => {
        if (prev) return prev[cur];
        return prev;
    }, window.h5sdk || {});
    if (hasApi) {
        ele.addEventListener(event, callback);
    } else {
        ele.parentNode.remove();
    }
    if (sectionEle.children.length === 1) {
        sectionEle.remove();
    }
}