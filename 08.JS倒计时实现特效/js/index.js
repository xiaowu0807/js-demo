// 执行动画的函数
function animationExecution(node, timer) {
  setInterval(function () {
    var firstNode = node.querySelector("li");
    node.style.transition = "all .5s linear";
    node.style.top = "-120px";
    node.addEventListener("transitionend", function () {
      node.style.transition = "none";
      node.style.top = "0px";
      node.appendChild(firstNode);
    });
  }, timer);
}

animationExecution(
  document.querySelector(".con").children[7].children[0],
  1000
);
animationExecution(
  document.querySelector(".con").children[6].children[0],
  10000
);
animationExecution(
  document.querySelector(".con").children[4].children[0],
  60000
);
animationExecution(
  document.querySelector(".con").children[3].children[0],
  600000
);
animationExecution(
  document.querySelector(".con").children[1].children[0],
  3600000
);
animationExecution(
  document.querySelector(".con").children[0].children[0],
  10800000
);
