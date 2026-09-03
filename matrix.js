(function () {
  var canvas = document.getElementById('matrix-rain');
  if (!canvas) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var hero = canvas.closest('.hero');
  if (!hero) return;

  var ctx = canvas.getContext('2d');
  var fontSize = 15;
  var columns = 0;
  var drops = [];
  var dpr = window.devicePixelRatio || 1;

  function resize() {
    var rect = hero.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Math.max(1, Math.floor(rect.width / fontSize));
    drops = new Array(columns);
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -40);
    }
  }

  function draw() {
    var rect = hero.getBoundingClientRect();
    ctx.fillStyle = 'rgba(11,13,18,0.09)';
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.font = fontSize + 'px "JetBrains Mono", monospace';
    for (var i = 0; i < columns; i++) {
      var char = Math.random() > 0.5 ? '1' : '0';
      var x = i * fontSize;
      var y = drops[i] * fontSize;
      var bright = Math.random() > 0.94;
      ctx.fillStyle = bright ? 'rgba(199,255,222,0.9)' : 'rgba(0,255,102,0.55)';
      ctx.fillText(char, x, y);
      if (y > rect.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  var timer = null;
  var resizeTimer = null;

  function start() {
    resize();
    if (timer) clearInterval(timer);
    timer = setInterval(draw, 50);
  }

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  start();
})();
