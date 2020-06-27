const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  antialias: true
});
let lines = new PIXI.Graphics();

let message = new PIXI.Text();
message.anchor.x=0.5;
message.anchor.y=0.9;

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
let middlePoints=[];
let lengths=[]

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
  countMidPoints(points)
  calLength(points)
  // console.log(points)
  drawLine(points)
}

function onPointermove(e){
  let x = e.data.global.x,y = e.data.global.y;
  if(points.length<2 && points.length>0){
    drawLine(points.concat({x,y}))
  }
}

function countMidPoints(points){
  for(let i=1;i<points.length;i++){
    let midX=(points[i].x + points[i-1].x)/2;
    let midY=(points[i].y + points[i-1].y)/2;
    middlePoints.push({midX,midY})
    // console.log(middlePoints)
  }
}

function calLength(points){
  for(let i=1;i<points.length;i++){
    let l=Math.pow(points[i].x - points[i-1].x,2) + Math.pow(points[i].y - points[i-1].y,2);
    let li=Math.abs(Math.sqrt(l));
    console.log(li)
    lengths.push(li.toFixed(2))
  }
  showLength(middlePoints)
}

function showLength(middlePoints){
  for(let i=0;i<middlePoints.length;i++){
    message.position.x=middlePoints[i].midX;
    message.position.y=middlePoints[i].midY;
    message.text=lengths[0]
  }
  console.log(message)
  app.stage.addChild(message);
}

function drawLine(points){
  lines.clear()
  lines.lineStyle(2, 0xff0000, 1);
  lines.moveTo(points[0].x, points[0].y);
  for(let i=1;i<points.length;i++){
    lines.lineTo(points[i].x, points[i].y);
  }
  lines.endFill();
  // console.log(lines)
  app.stage.addChild(lines);
}

