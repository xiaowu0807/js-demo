var imgBox = document.querySelector(".imgBox");
var imgBlock = document.querySelector(".imgBlock");
var imgGap = document.querySelector(".imgGap");
var titleText = document.querySelector(".imgContainer h3");
var span = document.querySelector(".slider span");
var btn = document.querySelector("#btn");
var slider = document.querySelector(".slider");
var changeImg = document.querySelector(".changeImg");
var minImgIndex = 1; //图片索引的最小值
var maxImgIndex = 5; //图片索引的最大值
/**
 *
 * @param {Number} min 传入最小数
 * @param {Number} max 传入最大数
 * @returns 返回一个最小数到最大数之间的随机数
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 初始化函数
 */
function init() {
  imgBlock.style.opacity = 0;
  btn.style.left = "-2px";
  imgGap.style.opacity = 1;
  titleText.style.color = "black";
  titleText.innerHTML = "请完成图片验证";
  span.style.opacity = 1;
  var imgIndex = getRandom(minImgIndex, maxImgIndex);
  imgBox.style.backgroundImage = `url(../img/t${imgIndex}.png)`;
  imgBlock.style.backgroundImage = `url(../img/t${imgIndex}.png)`;
  var heightRange = imgBox.offsetHeight - imgGap.offsetHeight;
  var widthRange = imgBox.offsetWidth / 2 - imgGap.offsetWidth;

  var top = getRandom(0, heightRange);
  var left = getRandom(0, widthRange) + imgBox.offsetWidth / 2;

  imgGap.style.top = top + "px";
  imgGap.style.left = left + "px";

  imgBlock.style.top = top + "px";
  imgBlock.style.left = "0px";
  imgBlock.style.backgroundPosition = `-${left}px -${top}px`;
}

/**
 * 事件绑定函数
 */
function bindEvent() {
  btn.onmousedown = function (e) {
    btn.style.transition = "none";
    imgBlock.style.transition = "none";
    imgBlock.style.opacity = 1;
    titleText.innerText = "拖动图片完成验证";
    titleText.style.color = "black";
    span.style.opacity = 0;
    slider.onmousemove = function (event) {
      var newLeft = event.clientX - slider.offsetLeft - e.offsetX;

      // 判断边界
      if (newLeft < -2) {
        newLeft = -2;
      }
      if (newLeft > imgBox.offsetWidth - imgBlock.offsetWidth) {
        newLeft = imgBox.offsetWidth - imgBlock.offsetWidth;
      }
      btn.style.left = newLeft + "px";
      imgBlock.style.left = newLeft + "px";
    };
    document.onmouseup = function () {
      // 验证是否成功
      var diffLeft = imgGap.offsetLeft - imgBlock.offsetLeft;
      if (diffLeft < 5 && diffLeft > -5) {
        // 验证成功
        imgBlock.style.opacity = 0;
        imgGap.style.opacity = 0;
        titleText.innerHTML = "验证成功";
        titleText.style.color = "green";
        slider.onmousemove = btn.onmousedown = document.onmouseup = null;
      } else {
        // 验证失败
        slider.onmousemove = document.onmouseup = null;
        btn.style.transition = "all 0.5s";
        imgBlock.style.transition = "all 0.5s";
        btn.style.left = "-2px";
        imgBlock.style.left = "0px";
        titleText.innerHTML = "验证失败";
        titleText.style.color = "red";
        span.style.opacity = 1;
      }
    };
  };
  changeImg.onclick = function () {
    init();
    bindEvent();
  };
}

// 程序主函数
function main() {
  // 初始化
  init();
  // 交互
  bindEvent();
}
main();
