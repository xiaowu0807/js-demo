var provinceDom = document.querySelector("#province");
var cityDom = document.querySelector("#city");
var schoolDom = document.querySelector("#school");

for (var pro in province) {
  var optionDom = document.createElement("option");
  optionDom.value = pro;
  optionDom.innerText = province[pro];
  provinceDom.appendChild(optionDom);
}
provinceDom.addEventListener("change", function () {
  cityDom.innerHTML = "";
  schoolDom.innerHTML = "";
  if (provinceDom.value === "0000") {
    return;
  }
  var cityObj = city[provinceDom.value];
  for (var pro in cityObj) {
    var optionDom = document.createElement("option");
    optionDom.value = pro;
    optionDom.innerText = cityObj[pro];
    cityDom.appendChild(optionDom);
  }
  var schoolArr = allschool[cityDom.value];
  for (var i = 0; i < schoolArr.length; i++) {
    var optionDom = document.createElement("option");
    optionDom.innerText = schoolArr[i];
    schoolDom.appendChild(optionDom);
  }
});
cityDom.addEventListener("change", function () {
  schoolDom.innerHTML = "";
  var schoolArr = allschool[cityDom.value];
  for (var i = 0; i < schoolArr.length; i++) {
    var optionDom = document.createElement("option");
    optionDom.innerText = schoolArr[i];
    schoolDom.appendChild(optionDom);
  }
});
