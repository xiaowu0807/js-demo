// 封装获取dom的方法
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// 初始化
var imgs = {
  smallImgs: ["imgA_1.jpg", "imgB_1.jpg", "imgC_1.jpg"],
  middleImgs: ["imgA_2.jpg", "imgB_2.jpg", "imgC_2.jpg"],
  largeImgs: ["imgA_3.jpg", "imgB_3.jpg", "imgC_3.jpg"],
};
var container = $(".container");
var middleImg = $(".left-img");
var largeImg = $(".right-img");
var mask = $(".mask");
var smallImg = $(".img-list");
var str = "";
for (var i = 0; i < imgs.smallImgs.length; i++) {
  str +=
    '<li style="background-image: url(./img/' + imgs.smallImgs[i] + ');"></li>';
}
smallImg.innerHTML = str;

$(".img-list li").style.border = "2px solid #000";

// 事件
smallImg.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    var lis = $$(".img-list li");
    for (var i = 0; i < lis.length; i++) {
      lis[i].style.border = "none";
    }
    e.target.style.border = "2px solid #000";
    var index = [].indexOf.call(lis, e.target);
    middleImg.style.backgroundImage =
      "url(./img/" + imgs.middleImgs[index] + ")";
    largeImg.style.backgroundImage = "url(./img/" + imgs.largeImgs[index] + ")";
  }
});

// 鼠标移入移出
middleImg.addEventListener("mousemove", function (e) {
  mask.style.opacity = 1;
  largeImg.style.opacity = 1;
  var left = e.clientX - middleImg.offsetLeft - mask.offsetWidth / 2;
  var top = e.clientY - middleImg.offsetTop - mask.offsetHeight / 2;

  if (top < 0) {
    top = 0;
  }
  if (left < 0) {
    left = 0;
  }
  if (top >= middleImg.offsetHeight - mask.offsetHeight) {
    top = middleImg.offsetHeight - mask.offsetHeight;
  }
  if (left >= middleImg.offsetWidth - mask.offsetWidth) {
    left = middleImg.offsetWidth - mask.offsetWidth;
  }
  mask.style.top = top + "px";
  mask.style.left = left + "px";

  largeImg.style.backgroundPositionX = -left + "px";
  largeImg.style.backgroundPositionY = -top + "px";
});
middleImg.addEventListener("mouseleave", function (e) {
  mask.style.opacity = 0;
  largeImg.style.opacity = 0;
});
