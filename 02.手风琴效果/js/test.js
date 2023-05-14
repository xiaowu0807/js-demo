var menu = document.querySelectorAll(".menu");
var subMenu = document.querySelectorAll(".subMenu");
var title = document.querySelectorAll(".title");

for (var i = 0; i < menu.length; i++) {
  (function (i) {
    title[i].addEventListener("click", function () {
      if (subMenu[i].style.height === 0 + "px") {
        for (var j = 0; j < subMenu.length; j++) {
          // subMenu[j].style.height = 0 + "px";
          if (subMenu[j].style.height === 120 + "px") {
            from120To0(j);
          }
        }

        from0To120(i);
      } else if (subMenu[i].style.height === 120 + "px") {
        from120To0(i);
        // this.nextElementSibling.style.height = 0 + "px";
      }
    });
  })(i);
}

// 从0到120的过渡
function from0To120(i) {
  var timerId;
  var from = 0;
  var to = 120;
  // 总时间
  var allTimes = 300;
  // 每次的时间
  var everyTime = 10;
  // 总次数
  var count = allTimes / everyTime;
  // 每次变化的尺寸
  var change = 120 / count;
  if (timerId) {
    return;
  }
  timerId = setInterval(function () {
    from += change;
    // console.log(from);
    if (from >= to) {
      clearInterval(timerId);
      from = 120;
      timerId = null;
    }
    title[i].nextElementSibling.style.height = from + "px";
  }, everyTime);
}
function from120To0(i) {
  var timerId;
  var from = 120;
  var to = 0;
  // 总时间
  var allTimes = 300;
  // 每次的时间
  var everyTime = 10;
  // 总次数
  var count = allTimes / everyTime;
  // 每次变化的尺寸
  var change = -120 / count;
  if (timerId) {
    return;
  }
  timerId = setInterval(function () {
    from += change;
    if (from < to) {
      from = 0;
      clearInterval(timerId);
      timerId = null;
    }
    title[i].nextElementSibling.style.height = from + "px";
  }, everyTime);
}
