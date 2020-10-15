export const getSetting=()=>{
    return new Promise((resolve, reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}

export const chooseAddress=()=>{
    return new Promise((resolve, reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}

export const openSetting=()=>{
    return new Promise((resolve, reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}

export const showModal=({msg})=>{
    return new Promise((resolve, reject)=>{
        wx.showModal({
            title: 'TiP',
            content: msg,
            showCancel: true,
            cancelText: 'MiS',
            cancelColor: '#000000',
            confirmText: 'YeS',
            confirmColor: '#3CC51F',
            success: (result) => {
                resolve(result)
            },
            fail:(err) => {
                reject(err)
            }
          });
    })
}

export const showToast=({msg})=>{
    return new Promise((resolve, reject)=>{
        wx.showToast({
            title: msg,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}

export const login=()=>{
    return new Promise((resolve, reject)=>{
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}