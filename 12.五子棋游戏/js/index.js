(function () {
  var chessboard = document.querySelector(".chessboard");
  var isGameOver = false; //游戏是否结束
  var whichOne = "white"; //棋子的颜色
  var chessArr = []; //存储所有棋子的数组
  /**
   * 初始化棋盘
   */
  function initChessboard() {
    var tableContent = "";
    for (var i = 0; i < 14; i++) {
      var row = "<tr>";
      for (var j = 0; j < 14; j++) {
        row += `<td data-row="${i}" data-line="${j}"></td>`;
      }
      row += "</tr>";
      tableContent += row;
    }
    chessboard.innerHTML = tableContent;
  }

  /**
   * 绑定事件
   */
  function bindEvent() {
    chessboard.addEventListener("click", function (e) {
      if (!isGameOver) {
        // 游戏还没结束 进行落子
        var temp = Object.assign({}, e.target.dataset);
        if (e.target.nodeName === "TD") {
          var tdw = (chessboard.clientWidth * 0.92) / 14;
          var positionX = e.offsetX > tdw / 2;
          var positionY = e.offsetY > tdw / 2;
          var chessPoint = {
            x: positionX ? parseInt(temp.line) + 1 : parseInt(temp.line),
            y: positionY ? parseInt(temp.row) + 1 : parseInt(temp.row),
            c: whichOne,
          };
          // 绘制棋子
          chessMove(chessPoint);
        }
      } else {
        // 游戏已经结束了 询问是否进行下一把
        if (window.confirm("是否要重新开始一局")) {
          chessArr = [];
          initChessboard();
          isGameOver = false;
        }
      }
    });
  }

  /**
   * 绘制棋子
   * @param {Object} obj 接收棋子信息的对象
   */
  function chessMove(obj) {
    if (exist(obj) && !isGameOver) {
      chessArr.push(obj);
      var newChess = `<div class="chess ${obj.c}" data-row="${obj.y}" data-line="${obj.x}"></div>`;
      if (obj.x < 14 && obj.y < 14) {
        var tdPos = document.querySelector(
          `td[data-row="${obj.y}"][data-line="${obj.x}"]`
        );
        tdPos.innerHTML += newChess;
      }
      if (obj.x === 14 && obj.y < 14) {
        var tdPos = document.querySelector(
          `td[data-row="${obj.y}"][data-line="13"]`
        );
        tdPos.innerHTML += newChess;
        tdPos.lastChild.style.left = "50%";
      }
      if (obj.x < 14 && obj.y === 14) {
        var tdPos = document.querySelector(
          `td[data-row="13"][data-line="${obj.x}"]`
        );
        tdPos.innerHTML += newChess;
        tdPos.lastChild.style.top = "50%";
      }
      if (obj.x === 14 && obj.y === 14) {
        var tdPos = document.querySelector(`td[data-row="13"][data-line="13"]`);
        tdPos.innerHTML += newChess;
        tdPos.lastChild.style.top = "50%";
        tdPos.lastChild.style.left = "50%";
      }
      whichOne = whichOne === "white" ? "black" : "white";
    }
    check();
  }
  /**
   * 判断棋子有没有存在数组中 是否已经绘制过了
   * @param {Object} obj 接收棋子信息的对象
   * @return {Boolean} 是否可以绘制
   */
  function exist(obj) {
    return !chessArr.find(function (item) {
      return item.x === obj.x && item.y === obj.y;
    });
  }
  /**
   * 判断是否胜利
   */
  function check() {
    for (var i = 0; i < chessArr.length; i++) {
      var curChess = chessArr[i];
      var chess2, chess3, chess4, chess5;
      // 检查横着的
      chess2 = chessArr.find(function (item) {
        return (
          curChess.x === item.x + 1 &&
          curChess.y === item.y &&
          curChess.c === item.c
        );
      });
      chess3 = chessArr.find(function (item) {
        return (
          curChess.x === item.x + 2 &&
          curChess.y === item.y &&
          curChess.c === item.c
        );
      });
      chess4 = chessArr.find(function (item) {
        return (
          curChess.x === item.x + 3 &&
          curChess.y === item.y &&
          curChess.c === item.c
        );
      });
      chess5 = chessArr.find(function (item) {
        return (
          curChess.x === item.x + 4 &&
          curChess.y === item.y &&
          curChess.c === item.c
        );
      });
      if (chess2 && chess3 && chess4 && chess5) {
        end(curChess, chess2, chess3, chess4, chess5);
      }
      // 检查竖着的
      chess2 = chessArr.find(function (item) {
        return (
          curChess.x === item.x &&
          curChess.y === item.y + 1 &&
          curChess.c === item.c
        );
      });
      chess3 = chessArr.find(function (item) {
        return (
          curChess.x === item.x &&
          curChess.y === item.y + 2 &&
          curChess.c === item.c
        );
      });
      chess4 = chessArr.find(function (item) {
        return (
          curChess.x === item.x &&
          curChess.y === item.y + 3 &&
          curChess.c === item.c
        );
      });
      chess5 = chessArr.find(function (item) {
        return (
          curChess.x === item.x &&
          curChess.y === item.y + 4 &&
          curChess.c === item.c
        );
      });
      if (chess2 && chess3 && chess4 && chess5) {
        end(curChess, chess2, chess3, chess4, chess5);
      }
      // 检查斜着的
      chess2 = chessArr.find(function (item) {
        return (
          curChess.x === item.x + 1 &&
          curChess.y === item.y + 1 &&
          curChess.c === item.c
        );
      });
      chess3 = chessArr.find(function (item) {
        return (
          curChess.x === item.x + 2 &&
          curChess.y === item.y + 2 &&
          curChess.c === item.c
        );
      });
      chess4 = chessArr.find(function (item) {
        return (
          curChess.x === item.x + 3 &&
          curChess.y === item.y + 3 &&
          curChess.c === item.c
        );
      });
      chess5 = chessArr.find(function (item) {
        return (
          curChess.x === item.x + 4 &&
          curChess.y === item.y + 4 &&
          curChess.c === item.c
        );
      });
      if (chess2 && chess3 && chess4 && chess5) {
        end(curChess, chess2, chess3, chess4, chess5);
      }
      // 检查斜着的
      chess2 = chessArr.find(function (item) {
        return (
          curChess.x === item.x - 1 &&
          curChess.y === item.y + 1 &&
          curChess.c === item.c
        );
      });
      chess3 = chessArr.find(function (item) {
        return (
          curChess.x === item.x - 2 &&
          curChess.y === item.y + 2 &&
          curChess.c === item.c
        );
      });
      chess4 = chessArr.find(function (item) {
        return (
          curChess.x === item.x - 3 &&
          curChess.y === item.y + 3 &&
          curChess.c === item.c
        );
      });
      chess5 = chessArr.find(function (item) {
        return (
          curChess.x === item.x - 4 &&
          curChess.y === item.y + 4 &&
          curChess.c === item.c
        );
      });
      if (chess2 && chess3 && chess4 && chess5) {
        end(curChess, chess2, chess3, chess4, chess5);
      }
    }
  }
  /**
   * 判断游戏是否结束
   */
  function end() {
    if (!isGameOver) {
      isGameOver = true;
      // 把所有棋子标记出来
      for (var i = 0; i < chessArr.length; i++) {
        document.querySelector(
          `div[data-row="${chessArr[i].y}"][data-line="${chessArr[i].x}"]`
        ).innerHTML = i + 1;
      }
      // 获胜的棋子特殊样式
      for (var i = 0; i < arguments.length; i++) {
        document
          .querySelector(
            `div[data-row="${arguments[i].y}"][data-line="${arguments[i].x}"]`
          )
          .classList.add("win");
      }
    }
  }

  // 程序主函数
  function main() {
    initChessboard();
    bindEvent();
  }
  main();
})();
