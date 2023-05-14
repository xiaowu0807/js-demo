var container = document.querySelector(".container");
var list = document.querySelector(".list");
list.appendChild(list.children[0].cloneNode(true));
var li = container.querySelectorAll("li");
var listHeight = list.scrollHeight;
var liHeight = listHeight / li.length;
//每隔两秒滚动到下一个公告
var allTimes = 2000;
setInterval(toNext, allTimes);
/**
 * 滚动到下一个公告的实现方法
 */
// 目前第几项
var item = 0;
function toNext() {
  // 滚动每项的总时间
  var itemAllTimes = 500;
  // 每次移动的时间
  var everyTime = 10;
  // 每项总移动次数
  var everyCount = itemAllTimes / everyTime;
  // 从哪个高度开始
  var from = item * liHeight;
  item++;
  // 到哪个高度结束
  var to = item * liHeight;
  //计时器id
  var timerId;
  timerId = setInterval(function () {
    from += liHeight / everyCount;
    // 到达目标位置时清空计时器
    if (from >= to) {
      clearInterval(timerId);
      timerId = null;
      // 到达最后一项时，回到最上面
      if (item == li.length - 1) {
        item = 0;
        from = 0;
      }
    }
    list.scrollTop = from;
  }, everyTime);
}
