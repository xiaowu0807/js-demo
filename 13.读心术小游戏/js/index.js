var maxImgIndex = 15; //最大索引
var curTargetIndex = null; //当前索引
var isGameOver = false; //游戏是否结束

var panel = document.querySelector(".panel");
var initImg = document.querySelector("#initImg");
var resultImg = document.querySelector("#resultImg");
var dictionary = document.querySelector(".dictionary");

/**
 * 封装一个随机数函数
 * @param {Number} min 传入最小值
 * @param {Number} max 传入最大值
 * @returns 返回最小值到最大值的一个随机数
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 初始化函数
 */
function init() {
  // 随机一张图片
  curTargetIndex = getRandom(0, maxImgIndex);
  dictionary.innerHTML = "";
  for (var i = 0; i < 100; i++) {
    var imgIndex = null;
    if (i % 9 === 0) {
      imgIndex = curTargetIndex;
    } else {
      imgIndex = getRandom(0, maxImgIndex);
    }
    dictionary.innerHTML += `
    <div class="item">
    <span class="number">${i}</span>
    <span class="value"><img src="../images/values/${imgIndex}.png" /></span>
    </div>`;
  }
}
/**
 * 点击事件
 */
function bindEvent() {
  panel.addEventListener("click", function (e) {
    if (isGameOver) {
      if (window.confirm("是否进行下一局游戏")) {
        isGameOver = false;
        init();
        initImg.style.opacity = 1;
        resultImg.style.opacity = 0;
        e.currentTarget.setAttribute("style", "");
        panel.removeEventListener("transitionend", transitionEndHandle);
      }
    } else {
      panel.style.transition = "all 2s";
      panel.style.transform = "rotate(1800deg)";
      panel.addEventListener("transitionend", transitionEndHandle);
    }
  });
}

function transitionEndHandle() {
  initImg.style.opacity = 0;
  resultImg.src = `../images/values/${curTargetIndex}.png`;
  resultImg.style.opacity = 1;
  isGameOver = true;
}

// 主函数
function main() {
  // 初始化
  init();
  //   交互（绑定点击事件）
  bindEvent();
}
main();
