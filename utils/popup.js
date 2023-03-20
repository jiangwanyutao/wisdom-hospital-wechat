function alert(title = '', msg = '', confirm, cancel) { //confirm,cancel分别对应成功后的回调函数和失败后的回调函数
    wx.showModal({
        title: title, //标题
        content: msg, //提示内容
        showCancel: cancel ? true : false, //是否显示取消按钮（如果cancel函数为空也就是不传，则不显示，否则显示）
        success: res => {
            if (res.confirm) {
                if (confirm) { //如果confirm函数不为空，则点击确定执行该函数
                    confirm()
                }
            }
            if (res.cancel) { //如果cancel函数不为空，则点击取消执行该函数
                if (cancel) {
                    cancel()
                }
            }
        }
    })
}

function normalToast(title, icon = 'none', duration, options) {
    setTimeout(() => {
        wx.showToast({
            title: title || '',
            icon: icon,
            mask: (options && options.mask) || true,
        })
        setTimeout(() => {
            wx.hideToast();
        }, duration || 3000)
    }, 0);

}

function normalModel(title = '', content, successFun) {
    wx.showModal({
        title: title || '',
        content: content,
        success: successFun || {},
        // fail: failFun || {}
    })
}

function loadingToast(title) {
    wx.showLoading({
        title: title || '加载中...',
    })
}

//输出该方法，便于子页面调用
module.exports = {
    alert,
    normalToast,
    normalModel,
    loadingToast
}