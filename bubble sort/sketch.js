let values = [];
let i = 0;
let j = 0;
let w = 5;
let going = false;
let speed = 60;
let howmany = 4;

function setup() {
  createCanvas(1200, 700);
  for (let i = 0; i < width / w; i++) {
    values.push(random(height - 100));
  }
  play = createButton('Sort');
  play.position(19, 19);
  play.mousePressed(dosort);
  stop = createButton('Stop');
  stop.position(69, 19);
  stop.mousePressed(stopsort);
  n = createButton('Randomize');
  n.position(123, 19);
  n.mousePressed(newArray);
  amt = createSlider(3, 100, 5, 1);
  amt.position(219, 19);
  sp = createSlider(2, 60, 60, 1);
  sp.position(360, 19);
  hm = createSlider(1, 12, 4, 1);
  hm.position(500, 19);
}

function newArray() {
  going = false;
  for (let i = 0; i < width / w; i++) {
    values[i] = random(height - 100);
  }
  i = 0;
  j = 0;
}

function dosort() {
  going = true;
}

function stopsort() {
  going = false;
}

function draw() {
  let newW = amt.value();
  if (newW != w) {
    w = newW;
    going = false;
    values = [];
    for (let i = 0; i < width / w; i++) {
      values[i] = random(height - 100);
    }
    i = 0;
    j = 0;
  }
  speed = round(sp.value());
  frameRate(speed);
  howmany = hm.value();
  background(241, 148, 180);
  stroke(0);
  fill(0);
  textSize(18);
  text('Column Width', 225, 59);
  text('Speed', 360, 59);
  text('Comparisons per frame', 500, 59);
  showState();
  if (going) {
    bubbleSortStep();
  }
}

function bubbleSortStep() {
  for (let k = 0; k < howmany; k++) {
    stroke(50);
    fill(188, 235, 203);
    rect((j + k) * w, height, w, -values[j + k], 20);
    rect((j + k + 1) * w, height, w, -values[j + k + 1], 20);
    if (i < values.length) {
      if (values[j] > values[j + 1]) {
        stroke(50);
        fill(247, 227, 175);
        rect((j + k) * w, height, w, -values[j + k], 20);
        rect((j + k + 1) * w, height, w, -values[j + k + 1], 20);
        swap(j, j + 1, values);
      }
      j++;
      if (j >= values.length - i - 1) {
        j = 0;
        i++;
      }
    } else {
      going = false;
      showState();
    }
  }
}

function showState() {
  for (let i = 0; i < values.length; i++) {
    stroke(50);
    fill(0, 217, 192);
    // fill(176, 208, 211);
    // fill(247, 175, 157);
    // fill(247, 227, 175);
    rect(i * w, height, w, -values[i], 20);
  }
}


function swap(i, j, array) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
