let hubIp = '128.122.151.172';    // the hub IP address
let username = 'atharvapatil';  // My user name as per the hue developer API

let url;

var lightNum = 1;
var lightState= false;


function setup() {
    createCanvas(windowWidth,windowHeight);

    url = "http://" + hubIp + "/api" + username;
    // noCanvas();
    background(0, 255, 0);



  switchButton = createButton('Turn On');
  switchButton.class('modeButton');
  switchButton.mousePressed(switchMode);
  //switchButton.position(windowWidth / 2 - switchButton.size().width - 20, windowHeight / 2 - switchButton.size().height - 20);
  switchButton.position(windowWidth / 2 - switchButton.size().width/2, windowHeight / 2 - switchButton.size().height*2);

  briSlider = createSlider(1,360, 254, 1);
  briSlider.class('manualSlider');
  briSlider.position(windowWidth / 2 - briSlider.size().width/2 , windowHeight/ 2 - briSlider.size().height/2);

  hueSlider = createSlider(0,65535, 14922, 100);
  hueSlider.class('manualSlider');
  hueSlider.position(windowWidth / 2 - briSlider.size().width/2 , windowHeight/ 2 - briSlider.size().height/2 + 50);

  satSlider = createSlider(0,254, 144, 1);
  satSlider.class('manualSlider');
  satSlider.position(windowWidth / 2 - briSlider.size().width/2 , windowHeight/ 2 - briSlider.size().height/2 + 100);

  fill(255);
  textSize(18);
  textAlign(RIGHT);
  text('Brightness',windowWidth / 2 - briSlider.size().width,windowHeight/ 2 - briSlider.size().height/2)
  text('Hue',windowWidth / 2 - briSlider.size().width,windowHeight/ 2 - briSlider.size().height/2+50)
  text('Saturation',windowWidth / 2 - briSlider.size().width,windowHeight/ 2 - briSlider.size().height/2+100)

  setButton = createButton('Set');
  setButton.class('modeButton');
  setButton.mousePressed(manualSet);
  setButton.position(windowWidth / 2 - setButton.size().width/2, windowHeight / 2 + 150);


}

function manualSet(){
    var path = url + '/lights/' + lightNum + '/state';

    var body = {'bri': briSlider.value(), 'sat': satSlider.value(),'hue': hueSlider.value()};
    var path = url + '/lights/' + lightNum + '/state/'
    httpDo(path, 'PUT', body, manualResponseResult);
  }

  function draw(){
    colorMode(RGB)
    background(9, 36, 71);
    colorMode(RGB);
    fill(255);
    text('Brightness',windowWidth / 2 - briSlider.size().width,windowHeight/ 2 - briSlider.size().height/2);
    text('Hue',windowWidth / 2 - briSlider.size().width,windowHeight/ 2 - briSlider.size().height/2+50);
    text('Saturation',windowWidth / 2 - briSlider.size().width,windowHeight/ 2 - briSlider.size().height/2+100);
    colorMode(HSB);
    fill(map(hueSlider.value(),0,65535,0,360,true),map(satSlider.value(),0,254,0,100,true),map(briSlider.value(),0,360,0,100,true),1)
    ellipse(windowWidth / 2 + briSlider.size().width,windowHeight/ 2 - briSlider.size().height/2+40, 50,50);

  }

  function manualResponseResult(){
    print('done');
  }

  function switchMode(){
    var path = url + '/lights'
    httpDo(path, 'GET', switchDataRecieved);
  }

  function switchDataRecieved(data){
    var lights = JSON.parse(data);
    lightState = lights["3"].state.on

    var body = {'on': !lightState};
    var path = url + '/lights/' + lightNum + '/state/'
    httpDo(path, 'PUT', body, switchResponseResult);

  }

  function switchResponseResult(dataRecieved){
    var response = JSON.stringify(dataRecieved);
    if (response.includes("success")){
      lightState = !lightState
      var lightStr = lightState ? "Off" : "On"
      switchButton.html("Turn " + lightStr);
    }
  }



  function partyMode(){
    print("whats up");
  }

  function stroboMode(){
    print("strobobo");
  }
  function manualMode(){
    print("manual huh");
  }
