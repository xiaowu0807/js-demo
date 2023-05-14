var sideBar = document.querySelector("#side-bar");
var imgs = document.querySelector("#imgs");

var navigationArray = []; //导航项数组
var imgsArray = []; //图片项数组
var titleArray = []; //副标题数组

for (var i = 0; i < data.length; i++) {
  var nava = document.createElement("a");
  var span = document.createElement("span");
  var imga = document.createElement("a");
  nava.href = "#";
  nava.className = "nav";
  nava.title = data[i].title + ":" + data[i].desc;
  nava.innerHTML = "<span>" + data[i].title + "</span>" + " " + data[i].desc;

  navigationArray.push(nava);
  sideBar.appendChild(nava);
  imga.href = "#";
  imga.style.backgroundImage = "url(" + data[i].img + ")";
  imga.style.backgroundColor = data[i].bg;
  imgsArray.push(imga);
  imgs.appendChild(imga);
}

/**
 * 计时器开始
 */

var curItem = 0;
var timerID;
function start(i) {
  curItem = i || curItem;
  if (timerID) {
    return;
  }
  if (curItem === 0) {
    navigationArray[curItem].className = "active";
    imgsArray[curItem].style.display = "block";
    curItem++;
  }
  timerID = setInterval(function () {
    if (curItem > 0) {
      navigationArray[curItem - 1].className = "nav";
      imgsArray[curItem - 1].style.display = "none";
    }

    if (curItem > navigationArray.length - 1) {
      curItem = 0;
      navigationArray[navigationArray.length - 1].className = "nav";
      imgsArray[navigationArray.length - 1].style.display = "none";
    }
    navigationArray[curItem].className = "active";
    imgsArray[curItem].style.display = "block";
    curItem++;
  }, 1000);
}

/**
 * 计时器结束
 */
function stop() {
  clearInterval(timerID);
  timerID = null;
}
start();
for (var i = 0; i < navigationArray.length; i++) {
  (function (i) {
    navigationArray[i].addEventListener("mouseenter", function () {
      stop();
      for (var j = 0; j < navigationArray.length; j++) {
        navigationArray[j].className = "nav";
        imgsArray[j].style.display = "none";
      }
      navigationArray[i].className = "active";
      imgsArray[i].style.display = "block";
    });
    navigationArray[i].addEventListener("mouseleave", function () {
      start(i);
    });
  })(i);
}
