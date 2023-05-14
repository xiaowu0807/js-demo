function createAnimate(options) {
  // 从哪开始
  var from = options.from;
  // 到哪结束
  var to = options.to;
  // 总时长
  var totalDuration = options.totalDuration || 500;
  // 间隔时间
  var duration = options.duration || 10;
  //   变化的次数
  var times = Math.floor(totalDuration / duration);
  //   每次变化的值
  var dis = (to - from) / times;
  //   当前变化的次数
  var curTimes = 0;
  //   计时器
  var timerId = setInterval(function () {
    from += dis;
    curTimes++;
    if (curTimes >= times) {
      clearInterval(timerId);
      timerId = null;
      from = to;
      options.onend && options.onend();
    }
    options.onmove && options.onmove(from);
  }, duration);
}
