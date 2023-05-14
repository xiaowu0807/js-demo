(function () {
  var maxImgIndex = 15; //定义图片最大索引
  var isGameOver = false; //定义游戏是否结束
  var dictionary = document.querySelector(".dictionary");
  var panel = document.querySelector(".panel");
  var initImg = document.querySelector("#initImg");
  var resultImg = document.querySelector("#resultImg");
  /**
   *封装一个随机数的函数
   * @param {Number} min 传入最小值
   * @param {Number} max 传入最大值
   * @returns 返回一个最小值到最大值之间的随机数
   */
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  /**
   * 初始化函数
   */
  function init() {
    dictionary.innerHTML = "";
    curTargetIndex = getRandom(0, maxImgIndex);
    for (var i = 0; i < 100; i++) {
      var curImgIndex = null;
      if (i % 9 === 0) {
        curImgIndex = curTargetIndex;
      } else {
        curImgIndex = getRandom(0, maxImgIndex);
      }
      dictionary.innerHTML += `<div class="item">
    <span class="number">${i}</span>
    <span class="value">
    <img src="../images/values/${curImgIndex}.png"/>
    </span>

    </div>`;
    }
    resultImg.src = `../images/values/${curTargetIndex}.png`;
  }
  /**
   * 绑定点击事件
   */
  function bindEvent() {
    panel.addEventListener("click", function (e) {
      if (isGameOver) {
        if (window.confirm("是否进行下一把")) {
          isGameOver = false;
          init();
          initImg.style.opacity = 1;
          resultImg.style.opacity = 0;
          panel.setAttribute("style", "");
          panel.removeEventListener("transitionend", afterTransition);
        }
      } else {
        panel.style.transition = "all 2s";
        panel.style.transform = "rotate(1800deg)";
        panel.addEventListener("transitionend", afterTransition);
      }
    });
  }
  /**
   * 过渡执行完成后执行的事件函数
   */
  function afterTransition() {
    initImg.style.opacity = 0;
    resultImg.style.opacity = 1;
    isGameOver = true;
  }
  // 主函数入口
  function main() {
    // 初始化
    init();
    //交互
    bindEvent();
  }
  main();
})();
