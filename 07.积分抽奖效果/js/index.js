(function () {
  var number = 5;
  var prizeNumber = document.querySelector(".prize-number");
  var startBtn = document.querySelector(".handler-container-btn");
  var prizeList = document.querySelectorAll(".prize-list");
  var dialog = document.querySelector(".dialog-container");
  var content = document.querySelector(".content");
  var closedialog = document.querySelector(".close");
  var button = document.querySelector(".button");
  var index = -1;
  var curIndex = null;
  var timeId;
  // 初始化
  function init() {
    prizeNumber.innerHTML = number;
    bindEvent();
  }

  /**
   * 点击事件函数
   */
  function bindEvent() {
    startBtn.addEventListener("click", onStartBtnClick);
    button.addEventListener("click", onOnceMore);
    closedialog.addEventListener("click", onCloseDialogClick);
  }

  // 事件绑定函数
  /**
   * 运行抽奖的函数(可复用)
   */
  function runGame() {
    var num = 3000 + Math.floor(Math.random() * 3000);
    if (timeId) {
      return;
    }
    if (number <= 0) {
      return;
    }
    timeId = setInterval(function () {
      num -= 200;
      // 计时器停止
      if (num <= 200) {
        clearInterval(timeId);
        timeId = null;
        openDialog();
        return;
      }
      curIndex = ++index % prizeList.length;
      prizeList.forEach(function (node) {
        node.classList.remove("active");
      });
      prizeList[curIndex].classList.add("active");
    }, 30);
  }

  /**
   * 开始抽奖
   * 开始计时器
   */
  function onStartBtnClick() {
    runGame();
  }
  /**
   * 打开弹窗
   */
  function openDialog() {
    dialog.style.display = "block";

    if (curIndex === 4) {
      content.innerHTML = "很遗憾您没有中奖";
    } else {
      content.innerHTML = "恭喜您获得" + prizeList[curIndex].innerText;
    }
    prizeNumber.innerHTML = number - 1;
    number--;
    if (number === 0) {
      button.innerText = "确定";
    }
  }
  /**
   * 关闭弹窗
   */
  function onCloseDialogClick() {
    dialog.style.display = "none";
  }
  /**
   * 再来一次
   */
  function onOnceMore() {
    dialog.style.display = "none";
    runGame();
  }
  init();
})();
