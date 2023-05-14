(function () {
  var chessboard = document.querySelector(".chessboard");
  var chessArr = []; //存放每个棋子的参数
  var isGameOver = false; //判断游戏是否结束
  var chessColor = "white"; //棋子的颜色
  //初始化函数
  function initChessBoard() {
    var cheContent = "";
    for (var i = 0; i < 14; i++) {
      var str = "<tr>";
      for (var j = 0; j < 14; j++) {
        str += `<td data-row="${i}" data-column="${j}"></td>`;
      }
      str += "</tr>";
      cheContent += str;
    }
    chessboard.innerHTML += cheContent;
  }

  // 点击事件
  function bindEvent() {
    chessboard.addEventListener("click", function (e) {
      if (!isGameOver) {
        var temp = Object.assign({}, e.target.dataset);
        if (e.target.nodeName === "TD") {
          var tdw = (chessboard.clientWidth * 0.92) / 14;
          var positionX = e.offsetX > tdw / 2;
          var positionY = e.offsetY > tdw / 2;
          var chessPoint = {
            x: positionX ? parseInt(temp.column) + 1 : parseInt(temp.column),
            y: positionY ? parseInt(temp.row) + 1 : parseInt(temp.row),
            c: chessColor,
          };
          chessMove(chessPoint);
        }
      } else {
        if (window.confirm("是否要重新开始一局")) {
          chessArr = [];
          initChessBoard();
          isGameOver = false;
        }
      }
    });
  }

  // 绘制棋子
  function chessMove(obj) {
    if (!isGameOver && exist(obj)) {
      chessArr.push(obj);
      var newChess = `<div class="chess ${obj.c}" data-row="${obj.y}" data-column="${obj.x}"></div>`;
      if (obj.x < 14 && obj.y < 14) {
        var tdPos = document.querySelector(
          `td[data-row="${obj.y}"][data-column="${obj.x}"]`
        );
        tdPos.innerHTML += newChess;
      }
      // 最右列
      if (obj.x === 14 && obj.y < 14) {
        var tdPos = document.querySelector(
          `td[data-row="${obj.y}"][data-column="13"]`
        );
        tdPos.innerHTML += newChess;
        tdPos.lastChild.style.left = "50%";
      }
      // 最下列
      if (obj.x < 14 && obj.y === 14) {
        var tdPos = document.querySelector(
          `td[data-row="13"][data-column="${obj.x}"]`
        );
        tdPos.innerHTML += newChess;
        tdPos.lastChild.style.top = "50%";
      }
      if (obj.x === 14 && obj.y === 14) {
        var tdPos = document.querySelector(
          `td[data-row="13"][data-column="13"]`
        );
        tdPos.innerHTML += newChess;
        tdPos.lastChild.style.top = "50%";
        tdPos.lastChild.style.left = "50%";
      }

      chessColor = chessColor === "white" ? "black" : "white";
    }
    check();
  }

  //查看是否已经绘制过了
  function exist(obj) {
    return !chessArr.find(function (item) {
      return obj.x === item.x && obj.y === item.y;
    });
  }

  // 判断游戏是否结束
  function check() {
    for (var i = 0; i < chessArr.length; i++) {
      var curChess = chessArr[i];
      var chess2, chess3, chess4, chess5;
      //检查横着的
      chess2 = chessArr.find(function (item) {
        return (
          curChess.x + 1 === item.x &&
          curChess.y === item.y &&
          curChess.c === item.c
        );
      });
      chess3 = chessArr.find(function (item) {
        return (
          curChess.x + 2 === item.x &&
          curChess.y === item.y &&
          curChess.c === item.c
        );
      });
      chess4 = chessArr.find(function (item) {
        return (
          curChess.x + 3 === item.x &&
          curChess.y === item.y &&
          curChess.c === item.c
        );
      });
      chess5 = chessArr.find(function (item) {
        return (
          curChess.x + 4 === item.x &&
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
          curChess.y + 1 === item.y &&
          curChess.c === item.c
        );
      });
      chess3 = chessArr.find(function (item) {
        return (
          curChess.x === item.x &&
          curChess.y + 2 === item.y &&
          curChess.c === item.c
        );
      });
      chess4 = chessArr.find(function (item) {
        return (
          curChess.x === item.x &&
          curChess.y + 3 === item.y &&
          curChess.c === item.c
        );
      });
      chess5 = chessArr.find(function (item) {
        return (
          curChess.x === item.x &&
          curChess.y + 4 === item.y &&
          curChess.c === item.c
        );
      });
      if (chess2 && chess3 && chess4 && chess5) {
        end(curChess, chess2, chess3, chess4, chess5);
      }
      // 检查斜着的
      chess2 = chessArr.find(function (item) {
        return (
          curChess.x + 1 === item.x &&
          curChess.y + 1 === item.y &&
          curChess.c === item.c
        );
      });
      chess3 = chessArr.find(function (item) {
        return (
          curChess.x + 2 === item.x &&
          curChess.y + 2 === item.y &&
          curChess.c === item.c
        );
      });
      chess4 = chessArr.find(function (item) {
        return (
          curChess.x + 3 === item.x &&
          curChess.y + 3 === item.y &&
          curChess.c === item.c
        );
      });
      chess5 = chessArr.find(function (item) {
        return (
          curChess.x + 4 === item.x &&
          curChess.y + 4 === item.y &&
          curChess.c === item.c
        );
      });
      if (chess2 && chess3 && chess4 && chess5) {
        end(curChess, chess2, chess3, chess4, chess5);
      }
      // 检查斜着的
      chess2 = chessArr.find(function (item) {
        return (
          curChess.x + 1 === item.x &&
          curChess.y - 1 === item.y &&
          curChess.c === item.c
        );
      });
      chess3 = chessArr.find(function (item) {
        return (
          curChess.x + 2 === item.x &&
          curChess.y - 2 === item.y &&
          curChess.c === item.c
        );
      });
      chess4 = chessArr.find(function (item) {
        return (
          curChess.x + 3 === item.x &&
          curChess.y - 3 === item.y &&
          curChess.c === item.c
        );
      });
      chess5 = chessArr.find(function (item) {
        return (
          curChess.x + 4 === item.x &&
          curChess.y - 4 === item.y &&
          curChess.c === item.c
        );
      });
      if (chess2 && chess3 && chess4 && chess5) {
        end(curChess, chess2, chess3, chess4, chess5);
      }
    }
  }

  // 游戏结束
  function end() {
    isGameOver = true;
    for (var i = 0; i < chessArr.length; i++) {
      document.querySelector(
        `div[data-row="${chessArr[i].y}"][data-column="${chessArr[i].x}"]`
      ).innerHTML += i + 1;
    }
    for (var i = 0; i < arguments.length; i++) {
      document
        .querySelector(
          `div[data-row="${arguments[i].y}"][data-column="${arguments[i].x}"]`
        )
        .classList.add("win");
    }
  }

  // 程序主函数
  function main() {
    // 初始化
    initChessBoard();
    // 交互(点击事件)
    bindEvent();
  }
  main();
})();
