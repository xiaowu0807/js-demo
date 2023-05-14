var imgs = [
  "Wallpaper1.jpg",
  "Wallpaper2.jpg",
  "Wallpaper3.jpg",
  "Wallpaper4.jpg",
  "Wallpaper5.jpg",
];
var container = document.querySelector(".carousel-container");
var list = document.querySelector(".carousel-list");
var indicator = document.querySelector(".indicator");
var curIndex = 0; //目前是第几项
var left = document.querySelector(".arrow-left");
var right = document.querySelector(".arrow-right");
var isPlaying = false; //记录当前有没有动画发生
// 初始化
function init() {
  for (var i = 0; i < imgs.length; i++) {
    var img = document.createElement("img");
    var div = document.createElement("div");
    img.src = "./img/" + imgs[i];
    img.className = "carousel-item";
    div.className = "indicator-item";
    list.appendChild(img);
    indicator.appendChild(div);
  }
  var lastImg = document.createElement("img");
  lastImg.src = "./img/" + imgs[0];
  lastImg.className = "carousel-item";
  list.appendChild(lastImg);
  list.style.width = (imgs.length + 1) * 100 + "%";
  indicator.children[curIndex].className = "indicator-item active";
}
init();

/**
 * 动态移动到指定下标图片
 * @param {Number} newIndex 目标图片的下标
 */
function moveTO(newIndex) {
  if (isPlaying || curIndex === newIndex) {
    return;
  }
  isPlaying = true;
  for (var i = 0; i < indicator.children.length; i++) {
    indicator.children[i].className = "indicator-item";
  }
  indicator.children[newIndex].className = "indicator-item active";
  createAnimation({
    from: curIndex * -500,
    to: newIndex * -500,
    totalMS: 500,
    onmove: function (i) {
      list.style.marginLeft = i + "px";
    },
    onend: function () {
      curIndex = newIndex;
      isPlaying = false;
    },
  });
}

/**
 * 切换到下一张图片
 */
function next() {
  if (curIndex === list.children.length - 2) {
    createAnimation({
      from: curIndex * -500,
      to: (list.children.length - 1) * -500,
      totalMS: 500,
      onmove: function (i) {
        list.style.marginLeft = i + "px";
        indicator.children[curIndex].className = "indicator-item";
        indicator.children[0].className = "indicator-item active";
      },
      onend: function () {
        curIndex = 0;
      },
    });

    return;
  }
  moveTO(curIndex + 1);
}
/**
 * 切换到上一张图片
 */
function prev() {
  if (curIndex === 0) {
    curIndex = list.children.length;
    createAnimation({
      from: (list.children.length - 1) * -500,
      to: (list.children.length - 2) * -500,
      totalMS: 500,
      onmove: function (i) {
        list.style.marginLeft = i + "px";
        indicator.children[0].className = "indicator-item";
        indicator.children[list.children.length - 2].className =
          "indicator-item active";
      },
      onend: function () {
        curIndex = list.children.length - 2;
      },
    });

    return;
  }
  moveTO(curIndex - 1);
}

left.addEventListener("click", prev);
right.addEventListener("click", next);

// 计时器开始
var timerId;
function start() {
  if (timerId) {
    return;
  }
  timerId = setInterval(next, 1500);
}
start();
// 计时器结束
function stop() {
  clearInterval(timerId);
  timerId = null;
}
//监听是鼠标进入和移出
container.addEventListener("mouseenter", stop);
container.addEventListener("mouseleave", start);

// 点击下方滑块跳转到相应图片
for (var i = 0; i < indicator.children.length; i++) {
  (function (i) {
    indicator.children[i].addEventListener("click", function () {
      moveTO(i);
    });
  })(i);
}
