var now = new Date(); //当前日期 
var nowDayOfWeek = now.getDay(); //今天本周的第几天   
var nowDay = now.getDate(); //当前日   
var nowMonth = now.getMonth(); //当前月   
var nowYear = now.getYear(); //当前年   
nowYear += (nowYear < 2000) ? 1900 : 0; //   
var lastMonthDate = new Date(); //上月日期   
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
lastYear += (lastYear < 2000) ? 1900 : 0;
var lastMonth = lastMonthDate.getMonth();
//格式化日期：yyyy-MM-dd   
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday + " " + "00" + ":" + "00" + ":" + "00");
}
//格式化日期：yyyy-MM-dd   
function formatDateEnd(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday + " " + "23" + ":" + "59" + ":" + "59");
}
//获得某月的天数   
function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}
//获得本季度的开始月份   
function getQuarterStartMonth() {
    var quarterStartMonth = 0;
    if (nowMonth < 3) {
        quarterStartMonth = 0;
    }
    if (2 < nowMonth && nowMonth < 6) {
        quarterStartMonth = 3;
    }
    if (5 < nowMonth && nowMonth < 9) {
        quarterStartMonth = 6;
    }
    if (nowMonth > 8) {
        quarterStartMonth = 9;
    }
    return quarterStartMonth;
}
//获得本周的开始日期   
function getWeekStartDate() {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    return formatDate(weekStartDate);
}
//获得本周的结束日期   
function getWeekEndDate() {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
    return formatDateEnd(weekEndDate);
}
//获得上周的开始日期   
function getLastWeekStartDate() {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
    return formatDate(weekStartDate);
}
//获得上周的结束日期   
function getLastWeekEndDate() {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
    return formatDateEnd(weekEndDate);
}
//获得本月的开始日期   
function getMonthStartDate() {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return formatDate(monthStartDate);
}
//获得本月的结束日期   
function getMonthEndDate() {
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    return formatDateEnd(monthEndDate);
}
//上半月
function getHalfMonthEndDate() {
    var monthEndDate = new Date(nowYear, nowMonth, Math.ceil(getMonthDays(nowMonth) / 2));
    return formatDate(monthEndDate);
}
//上半月结束
function getHalfMonthStartDate(day) {
    var monthEndDate = new Date(nowYear, nowMonth, day);
    return formatDateEnd(monthEndDate);
}
//下半月开始
function getHalfMonthStartDates(day) {
    var monthEndDate = new Date(nowYear, nowMonth, day);
    return formatDate(monthEndDate);
}
//获得上月开始时间   
function getLastMonthStartDate() {
    var year = (lastMonth == 11) ? lastYear : nowYear;

    var lastMonthStartDate = new Date(year, lastMonth, 1);
    return formatDate(lastMonthStartDate);
}
//获得上月结束时间   
function getLastMonthEndDate() {
    var year = (lastMonth == 11) ? lastYear : nowYear;
    var lastMonthEndDate = new Date(year, lastMonth, getMonthDays(lastMonth));
    return formatDateEnd(lastMonthEndDate);
}

var getCurrentDay = {
    begin:new Date(new Date(new Date().toLocaleDateString()).getTime()),
    end:new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)
}

var getCurrentMonth = {
    begin:getMonthStartDate(),
    end:getMonthEndDate()
}
export {getCurrentDay,getCurrentMonth};