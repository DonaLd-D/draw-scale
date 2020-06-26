const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  antialias: true
});
let lines = new PIXI.Graphics();

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.appendChild(app.view);

window.app = app;
app.renderer.plugins.interaction
                                .on('pointerdown', onPointerDown)
                                .on('pointerup', onPointerup)
                                .on('pointermove', onPointermove)
let points = [];

function onPointerDown(e) {
  let x = e.data.global.x,y = e.data.global.y;
  // points.push({x,y})
  // console.log(points)
  // drawLine()
}

function onPointerup(e){
  let x = e.data.global.x,y = e.data.global.y;
  if(points.length<2){
    points.push({x,y})
  }
  // console.log(points)
  drawLine(points)
}

function onPointermove(e){
  let x = e.data.global.x,y = e.data.global.y;
  if(points.length<2){
    drawLine(points.concat({x,y}))
  }
}

function drawLine(points){
  lines.clear()
  lines.beginFill(0x1099bb);
  lines.lineStyle(2, 0xff0000, 1);
  lines.moveTo(points[0].x, points[0].y);
  for(let i=1;i<points.length;i++){
    lines.lineTo(points[i].x, points[i].y);
  }
  lines.endFill();
  app.stage.addChild(lines);
}

