var container = document.getElementById("container");
var itemWidth = 220;

// 初始化
function init() {
  // 容器宽度
  var w = container.clientWidth;
  //  计算出总共多少列
  var column = Math.floor(w / itemWidth);

  return {
    w: w,
    column: column,
  };
}
// 图片排序
function pictureSort() {
  var info = init();

  //   存放列数高度的数组
  var heightTheColumn = [];
  for (var i = 0; i < info.column; i++) {
    heightTheColumn.push(0);
  }
  //   给每张图片添加样式
  for (var i = 0; i < container.children.length; i++) {
    var img = container.children[i];
    // 数组最小值的下标
    var index = heightTheColumn.indexOf(Math.min(...heightTheColumn));
    // 间隙
    var gap =
      (info.w - heightTheColumn.length * itemWidth) /
      (heightTheColumn.length + 1);

    img.style.top = Math.min(...heightTheColumn) + 5 + "px";
    img.style.left = index * (itemWidth + gap) + gap + "px";

    heightTheColumn[index] += img.naturalHeight + 5;
  }
  //   设置容器高度
  var maxHeight = Math.max(...heightTheColumn);
  container.style.height = maxHeight + "px";
}

function createImg() {
  for (var i = 0; i <= 40; i++) {
    var img = document.createElement("img");
    img.src = "./img/" + i + ".jpg";
    img.style.width = itemWidth;
    container.appendChild(img);
    img.onload = pictureSort;
  }
}

createImg();
var timeId;
window.addEventListener("resize", function () {
  if (timeId) {
    this.clearTimeout(timeId);
  }
  timeId = setTimeout(function () {
    pictureSort();
  }, 500);
});
