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

  var mouseX = -9999;
  var mouseY = -9999;
  var mouseRadius = 130;

  function updatePointer(clientX, clientY) {
    var rect = hero.getBoundingClientRect();
    mouseX = clientX - rect.left;
    mouseY = clientY - rect.top;
  }

  hero.addEventListener('mousemove', function (e) {
    updatePointer(e.clientX, e.clientY);
  });
  hero.addEventListener('mouseleave', function () {
    mouseX = -9999;
    mouseY = -9999;
  });
  hero.addEventListener('touchmove', function (e) {
    if (e.touches && e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
  hero.addEventListener('touchend', function () {
    mouseX = -9999;
    mouseY = -9999;
  });

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

      var dx = x - mouseX;
      var dy = y - mouseY;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouseRadius) {
        var glow = 1 - dist / mouseRadius;
        var g = Math.round(180 + 75 * glow);
        var b = Math.round(140 + 115 * glow);
        var a = 0.55 + 0.4 * glow;
        ctx.fillStyle = 'rgba(' + g + ',255,' + b + ',' + a + ')';
        drops[i] += glow * 0.6;
      } else {
        var bright = Math.random() > 0.94;
        ctx.fillStyle = bright ? 'rgba(199,255,222,0.9)' : 'rgba(0,255,102,0.55)';
      }

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
