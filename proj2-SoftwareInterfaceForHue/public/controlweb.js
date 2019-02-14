let hubIp = '128.122.151.172';    // the hub IP address
let username = 'MJzzY5WkcmDGnaL2LlsNWIZvmpnIO3MmlFcbA6VJ';  // My user name as per the hue developer API

let canvas;
let lightSwitch;
let brightSlider;
let hueSlider;
let satSlider;

let lightState;
let lightNo = 1;

let col;

let phueSlider = 32767;
let psatSlider = 127;
let pbrightSlider = 127;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    url = "http://" + hubIp + "/api" + username;

    // set up the connect button:
    lightSwitch = createButton("Turn On/Off");
    lightSwitch.position(canvas.width/2 - 100, 300);
    lightSwitch.class('lightSwitch');
    lightSwitch.mouseClicked(toggleLight);

    hueSlider = createSlider(0, 65535, 32767, 100);
    hueSlider.class('qualitySlider');
    hueSlider.position(canvas.width/2 - 100, 400);

    satSlider = createSlider(0, 254, 127, 1);
    satSlider.class('qualitySlider');
    satSlider.position(canvas.width/2 - 100, 450);

    brightSlider = createSlider(1, 255, 127, 1);
    brightSlider.class('qualitySlider');
    brightSlider.position(canvas.width/2 - 100, 500);


}

function draw(){
  colorMode(RGB);
  fill(80);
  textSize(18);
  textAlign(RIGHT);
  text('Hue',canvas.width/2 - 120, 420)
  text('Saturation', canvas.width/2 - 120, 470)
  text('Brightness',canvas.width/2 - 120, 520);

  colorMode(HSB);
  noStroke();
  fill(map(hueSlider.value(),0,65535,0,360,true),map(satSlider.value(),0,254,0,100,true),map(brightSlider.value(),0,254,0,100,true));
  col = ellipse(canvas.width/2 , 200, 100, 100);

  if(hueSlider.value() != phueSlider || satSlider.value() != psatSlider || brightSlider.value() != pbrightSlider){
    changeLightColour();
    phueSlider = hueSlider.value();
    psatSlider = satSlider.value();
    pbrightSlider = brightSlider.value();
  }

}

function toggleLight(){
  let path = url + '/lights'
  httpDo(path, 'GET', toggleGetResponse);
}

function toggleGetResponse(getData){
  let lights = JSON.parse(getData);
  lightState = lights["1"].state.on

  let body = {'on': !lightState};
  let path = url + '/lights/' + lightNo + '/state/'
  httpDo(path, 'PUT', body, togglePutData);

}

function togglePutData(putData){
  var response = JSON.stringify(putData);
  if (response.includes("success")){
    lightState = !lightState
  }
}

function changeLightColour(){
    var path = url + '/lights/' + lightNo + '/state';
    var body = {'bri': brightSlider.value(), 'sat': satSlider.value(),'hue': hueSlider.value()};
    var path = url + '/lights/' + lightNo + '/state/'
    httpDo(path, 'PUT', body, changeColourResponse);
  }

function changeColourResponse(){
  console.log('New Light values set');
}
