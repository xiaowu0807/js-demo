var titles = document.querySelectorAll(".title");
var itemHeight = 30;
var totalMS = 300;

for (var i = 0; i < titles.length; i++) {
  titles[i].addEventListener("click", function () {
    var beforeOpen = document.querySelector(".subMenu[status=opened]");
    if (beforeOpen) {
      closeSubmenu(beforeOpen);
    }
    toggleSubmenu(this.nextElementSibling);
  });
}
function openSubmenu(subMenu) {
  var status = subMenu.getAttribute("status");
  if (status !== "closed" && status) {
    return;
  }
  subMenu.setAttribute("status", "playing");
  createAnimate({
    from: 0,
    to: itemHeight * subMenu.children.length,
    totalDuration: totalMS,
    onend: function () {
      subMenu.setAttribute("status", "opened");
    },
    onmove: function (from) {
      subMenu.style.height = from + "px";
    },
  });
}
function closeSubmenu(subMenu) {
  var status = subMenu.getAttribute("status");
  if (status !== "opened") {
    return;
  }
  subMenu.setAttribute("status", "playing");
  createAnimate({
    from: itemHeight * subMenu.children.length,
    to: 0,
    totalDuration: totalMS,
    onend: function () {
      subMenu.setAttribute("status", "closed");
    },
    onmove: function (from) {
      subMenu.style.height = from + "px";
    },
  });
}

function toggleSubmenu(subMenu) {
  var status = subMenu.getAttribute("status");
  if (status === "playing") {
    // 正在播放动画
    return;
  } else if (status === "opened") {
    closeSubmenu(subMenu);
  } else {
    openSubmenu(subMenu);
  }
}
