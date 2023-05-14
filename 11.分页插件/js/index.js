var paper = document.querySelector(".pager");
// 当前页数
var curPaper = 1;
// 总页数
var pageNumber = 50;
// 最多展示的页数
var mostNumber = 10;

function createPager(item) {
  if (item.skipPages < 1 || item.skipPages > pageNumber) {
    return;
  }
  paper.innerHTML = "";
  var skipPages = item.skipPages;
  var min = Math.ceil(skipPages - mostNumber / 2);
  var max = min + mostNumber - 1;
  if (min < 1) {
    min = 1;
    max = mostNumber;
  }
  if (max > pageNumber) {
    max = pageNumber;
  }
  //   创建首页和上一页
  var homePag = document.createElement("a");
  homePag.innerText = "首页";
  if (item.previousDisabled || skipPages === 1) {
    homePag.className = "disabled";
  }
  paper.appendChild(homePag);
  var previousPage = document.createElement("a");
  previousPage.innerText = "上一页";
  if (item.previousDisabled || skipPages === 1) {
    previousPage.className = "disabled";
  }
  paper.appendChild(previousPage);
  //   创建中间的数字
  for (var i = min; i <= max; i++) {
    var a = document.createElement("a");
    a.innerText = i;
    if (i === skipPages) {
      a.className = "active";
    }
    paper.appendChild(a);
  }
  //   创建下一页和尾页
  var nextPage = document.createElement("a");
  nextPage.innerText = "下一页";
  if (item.nextDisabled || skipPages === pageNumber) {
    nextPage.className = "disabled";
  }
  paper.appendChild(nextPage);
  var lastPage = document.createElement("a");
  lastPage.innerText = "尾页";
  if (item.nextDisabled || skipPages === pageNumber) {
    lastPage.className = "disabled";
  }
  paper.appendChild(lastPage);
  //   当前页码
  var span = document.createElement("span");
  span.innerText = skipPages + "/" + pageNumber;
  span.className = "pageCount";
  paper.appendChild(span);
  curPaper = skipPages;
}
createPager({
  skipPages: curPaper,
});
paper.addEventListener("click", function (e) {
  if (
    e.target.className === "active" ||
    e.target.className === "pager" ||
    e.target.className === "pageCount"
  ) {
    return;
  }
  if (e.target.innerText === "首页" || e.target.innerText === "1") {
    createPager({
      skipPages: 1,
      previousDisabled: true,
    });
    return;
  }
  if (e.target.innerText === "尾页" || e.target.innerText === pageNumber + "") {
    createPager({
      skipPages: pageNumber,
      nextDisabled: true,
    });
    return;
  }
  if (e.target.innerText === "上一页") {
    if (curPaper === 2 || curPaper === 1) {
      createPager({
        skipPages: 1,
        previousDisabled: true,
      });
      return;
    }
    createPager({
      skipPages: curPaper - 1,
    });
    return;
  }
  if (e.target.innerText === "下一页") {
    if (curPaper === pageNumber - 1 || curPaper === pageNumber) {
      createPager({
        skipPages: pageNumber,
        nextDisabled: true,
      });
      return;
    }
    createPager({
      skipPages: curPaper + 1,
    });
    return;
  }
  createPager({
    skipPages: +e.target.innerText,
  });
});
