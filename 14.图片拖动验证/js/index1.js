var maxImgIndex = 5; //图片索引最大值
var minImgIndex = 1; //图片索引最小值
var imgBox = document.querySelector(".imgBox");
var imgBlock = document.querySelector(".imgBlock");
var imgGap = document.querySelector(".imgGap");
var btn = document.querySelector("#btn");
var titleText = document.querySelector(".imgContainer h3");
var span = document.querySelector(".slider span");
var slider = document.querySelector(".slider");
var changeImg = document.querySelector(".changeImg");
/**
 * 封装一个随机数函数
 * @param {Number} min 传入最小值
 * @param {Number} max 传入最大值
 * @returns 返回最小值到最大值之间的随机数
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 初始化函数实现
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
  var maxTop = imgBox.offsetHeight - imgGap.offsetHeight;
  var maxLeft = imgBox.offsetWidth - imgGap.offsetWidth;
  var top = getRandom(0, maxTop);
  var left = getRandom(imgBox.offsetWidth / 2, maxLeft);
  imgGap.style.top = top + "px";
  imgGap.style.left = left + "px";
  imgBlock.style.left = "0px";
  imgBlock.style.top = top + "px";
  imgBlock.style.backgroundPosition = `-${left}px -${top}px`;
}
/**
 * 用户交互函数实现
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
      btn.style.left = newLeft + "px";
      imgBlock.style.left = newLeft + "px";
      document.onmouseup = function () {
        var diffLeft = imgGap.offsetLeft - newLeft;
        if (diffLeft < 5 && diffLeft > -5) {
          // 验证成功
          titleText.innerText = "验证成功";
          titleText.style.color = "green";
          imgBlock.style.opacity = 0;
          imgGap.style.opacity = 0;
          btn.onmousedown = slider.onmousemove = document.onmouseup = null;
        } else {
          // 验证失败
          titleText.innerText = "验证失败";
          titleText.style.color = "red";
          btn.style.transition = "all 0.5s";
          btn.style.left = "-2px";
          imgBlock.style.transition = "all 0.5s";
          imgBlock.style.left = "0px";
          span.style.opacity = 1;
          slider.onmousemove = document.onmouseup = null;
        }
      };
    };
  };
  changeImg.onclick = function () {
    init();
    bindEvent();
  };
}

// 主函数
function main() {
  //初始化
  init();
  // 交互
  bindEvent();
}
main();
