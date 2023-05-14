var allChecked = document.querySelector(".allChecked");
var checkeds = document.querySelectorAll('tr td input[type="checkbox"]');
var ths = document.querySelectorAll("thead th");
var tbody = document.querySelector("tbody");
var trs = document.querySelectorAll("tbody tr");
var arr = Array.prototype.slice.call(trs, 0);
for (var i = 0; i < checkeds.length; i++) {
  checkeds[i].addEventListener("click", function () {
    var count = 0;
    for (var j = 0; j < checkeds.length; j++) {
      if (checkeds[j].checked === true) {
        count++;
      }
    }
    if (count === checkeds.length) {
      allChecked.checked = true;
      count = 0;
    } else {
      allChecked.checked = false;
      count = 0;
    }
  });
}
var count = 0;
allChecked.addEventListener("click", function () {
  for (var i = 0; i < checkeds.length; i++) {
    if (checkeds[i].checked) {
      count++;
    }
  }
  if (allChecked.checked === true) {
    if (count < checkeds.length) {
      for (var j = 0; j < checkeds.length; j++) {
        checkeds[j].checked = true;
      }
      count = 0;
    }
  }
  if (allChecked.checked === false) {
    if ((count = checkeds.length)) {
      for (var j = 0; j < checkeds.length; j++) {
        checkeds[j].checked = false;
      }
      count = 0;
    }
  }
});

ths[1].addEventListener("click", function () {
  arr.sort(function (a, b) {
    return a.children[1].innerHTML - b.children[1].innerHTML;
  });
  for (var i = 0; i < arr.length; i++) {
    tbody.appendChild(arr[i]);
  }
});

ths[2].addEventListener("click", function () {
  arr.sort(function (a, b) {
    return a.children[2].innerHTML.localeCompare(
      b.children[2].innerHTML,
      "zh-Hans-CN-u-co-pinyin"
    );
  });
  for (var i = 0; i < arr.length; i++) {
    tbody.appendChild(arr[i]);
  }
});

ths[3].addEventListener("click", function () {
  arr.sort(function (a, b) {
    return a.children[3].innerHTML - b.children[3].innerHTML;
  });
  for (var i = 0; i < arr.length; i++) {
    tbody.appendChild(arr[i]);
  }
});
ths[4].addEventListener("click", function () {
  arr.sort(function (a, b) {
    return a.children[4].innerHTML.localeCompare(
      b.children[4].innerHTML,
      "zh-Hans-CN-u-co-pinyin"
    );
  });
  for (var i = 0; i < arr.length; i++) {
    tbody.appendChild(arr[i]);
  }
});
