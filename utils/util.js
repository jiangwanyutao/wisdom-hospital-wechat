function formatTime(date) {
    var year = new Date(date).getFullYear()
    var month = new Date(date).getMonth() + 1
    var day = new Date(date).getDate()

    var hour = new Date(date).getHours()
    var minute = new Date(date).getMinutes()
    var second = new Date(date).getSeconds();

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**
 * 获取当前日期  2020-12-01
 */
const nowTime = () => {
    let _now = new Date()
    return _now.getFullYear() + '-' + (_now.getMonth() + 1).toString().padStart(2, '0') + '-' + _now.getDate().toString().padStart(2, '0')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 获取上一个页面
 */
const getRrepage = () => {
    // 获取页面数组
    let pages = getCurrentPages();
    // 获取上一个页面对象
    let prepage = pages[pages.length - 2];
    // 获取上一个页面的路由地址
    // let pageRoute = prepage.route;

    return prepage;
}

const format = (time) => {
    let ymd = ''
    let mouth = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1))
    let day = time.getDate() >= 10 ? time.getDate() : ('0' + time.getDate())
    ymd += time.getFullYear() + '-' // 获取年份。
    ymd += mouth + '-' // 获取月份。
    ymd += day // 获取日。
    return ymd // 返回日期。
}

/**
 * 通过开始时间和结束时间计算中间的天数
 */
const getAllDate = (start, end) => {
    let dateArr = []
    let startArr = start.split('-')
    let endArr = end.split('-')
    let db = new Date()
    db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2])
    let de = new Date()
    de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2])
    let unixDb = db.getTime()
    let unixDe = de.getTime()
    let stamp
    const oneDay = 24 * 60 * 60 * 1000;
    for (stamp = unixDb; stamp <= unixDe;) {
        dateArr.push(format(new Date(parseInt(stamp))))
        stamp = stamp + oneDay
    }
    return dateArr
}

const formatTimeTwo = (number, format) => {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

const specialStr = (str) => {
    const containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
    return (containSpecial.test(str));
}

const isIdCard = (str) => {
    const idcard = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
    return (idcard.test(str));
}
const isPhone = (str) => {
    const phone = /^1[3456789]\d{9}$/;
    return (phone.test(str));
}

module.exports = {
    formatTime: formatTime,
    formatNumber: formatNumber,
    getRrepage: getRrepage,
    getAllDate,
    formatTimeTwo,
    specialStr,
    isIdCard,
    isPhone,
    nowTime
}