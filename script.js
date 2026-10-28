(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  const toggle = document.querySelector('.motion-toggle');
  if (!ctx) return;
  let width = 0, height = 0, nodes = [], frame = 0, previous = 0, elapsed = 0, paused = false;
  let quietAreas = [];
  function resize() {
    width = innerWidth; height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(24, Math.min(70, Math.round(width * height / 18000)));
    nodes = Array.from({length: count}, () => ({x: Math.random()*width, y: Math.random()*height, vx: (Math.random()-.5)*13, vy: (Math.random()-.5)*13, phase: Math.random()*Math.PI*2, radius: .9+Math.random()*1.3}));
    quietAreas = [...document.querySelectorAll('.name,.intro,.social')].map(el => el.getBoundingClientRect());
  }
  function quiet(x,y) {
    return quietAreas.some(r => x > r.left-18 && x < r.right+18 && y > r.top-18 && y < r.bottom+18) ? .15 : 1;
  }
  function draw(now) {
    frame = 0;
    const dt = previous ? Math.min((now-previous)/1000,.05) : 0;
    previous = now; elapsed += dt;
    ctx.clearRect(0,0,width,height);
    // Slow, staggered pulses evoke a network without flashing.
    const pulse = .55 + .45 * Math.pow((Math.sin(elapsed*.55)+1)/2,2);
    for (const n of nodes) {
      n.x += n.vx*dt; n.y += n.vy*dt;
      if(n.x < -15) n.x = width+15; if(n.x > width+15) n.x = -15;
      if(n.y < -15) n.y = height+15; if(n.y > height+15) n.y = -15;
    }
    const reach = width < 700 ? 110 : 160;
    for(let i=0;i<nodes.length;i++) {
      const a = nodes[i];
      for(let j=i+1;j<nodes.length;j++) {
        const b = nodes[j], d = Math.hypot(a.x-b.x,a.y-b.y);
        if(d < reach) {
          const alpha = .16*(1-d/reach)*pulse*Math.min(quiet(a.x,a.y),quiet(b.x,b.y));
          ctx.strokeStyle = `rgba(53,60,183,${alpha})`; ctx.lineWidth=.7;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
      const glow = (.22+.24*(Math.sin(elapsed*.8+a.phase)+1)/2)*quiet(a.x,a.y);
      ctx.fillStyle = `rgba(53,60,183,${glow})`;
      ctx.beginPath(); ctx.arc(a.x,a.y,a.radius,0,Math.PI*2); ctx.fill();
      const wave = (elapsed*.13 + a.phase/(Math.PI*2))%1;
      if(wave < .35) {
        ctx.strokeStyle = `rgba(53,60,183,${.11*(1-wave/.35)*quiet(a.x,a.y)})`;
        ctx.beginPath(); ctx.arc(a.x,a.y,3+wave*28,0,Math.PI*2); ctx.stroke();
      }
    }
    frame = requestAnimationFrame(draw);
  }
  function sync() {
    cancelAnimationFrame(frame); frame=0; previous=0;
    toggle.hidden = reduced.matches;
    if(reduced.matches) ctx.clearRect(0,0,width,height);
    if(!reduced.matches && !paused && !document.hidden) frame=requestAnimationFrame(draw);
  }
  toggle.addEventListener('click', () => {
    paused=!paused;
    const label = paused ? 'Retomar animação' : 'Pausar animação';
    toggle.setAttribute('aria-label',label); toggle.title=label;
    toggle.querySelector('path').setAttribute('d',paused ? 'M7 4l8 6-8 6z' : 'M7 5v10M13 5v10');
    sync();
  });
  addEventListener('resize',resize);
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);
  if(!reduced.matches) document.body.classList.add('ready');
  resize(); sync();
  document.fonts.ready.then(resize);
})();
