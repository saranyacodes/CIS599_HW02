import {vec2, vec3} from 'gl-matrix';
import * as Stats from 'stats-js';
import * as DAT from 'dat-gui';
import Square from './geometry/Square';
import OpenGLRenderer from './rendering/gl/OpenGLRenderer';
import Camera from './Camera';
import {setGL} from './globals';
import ShaderProgram, {Shader} from './rendering/gl/ShaderProgram';

// Define an object with application parameters and button callbacks
// This will be referred to by dat.GUI's functions that add GUI elements.
const controls = {
  tesselations: 5,
  'Load Scene': loadScene, // A function pointer, essentially
};

let square: Square;
let time: number = 0;

//GUI elements 
let nightOrDayGUI: number; 
let speedOfCycleGUI: number;
let stadiumColorGUI: vec3;
let animatePlatformsGUI: boolean;   

function loadScene() {
  square = new Square(vec3.fromValues(0, 0, 0));
  square.create();
  // time = 0;
}

function main() {
  window.addEventListener('keypress', function (e) {
    // console.log(e.key);
    switch(e.key) {
      // Use this if you wish
    }
  }, false);

  window.addEventListener('keyup', function (e) {
    switch(e.key) {
      // Use this if you wish
    }
  }, false);

  // Initial display for framerate
  const stats = Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  // Add controls to the gui
  const gui = new DAT.GUI();

  //for the time of day options
  var tType = 
  {
    timeOfDay: 1,
  }
  var tt = gui.add(tType, 'timeOfDay', { StarrySky: 1, DayCycle: 2 } );
  nightOrDayGUI = 0; //set it to a value that none of them are

  //speed of day or night cycle 
  var s = {dayCycleSpeed: 50}; 
  var s_gui = gui.add(s, 'dayCycleSpeed', 0, 100); 
  speedOfCycleGUI = 0; 

  //control stadium colors
  var palette = {
    stadiumColor: "#3ef04a", 

  };

  stadiumColorGUI = vec3.fromValues(0, 0, 0);
  gui.addColor(palette, 'stadiumColor');


  //should the platform animate or not? 
  var ap = {animatePlatforms: true}; 
  var ap_gui = gui.add(ap, 'animatePlatforms', true); 
  animatePlatformsGUI = !ap.animatePlatforms; 


  // get canvas and webgl context
  const canvas = <HTMLCanvasElement> document.getElementById('canvas');
  const gl = <WebGL2RenderingContext> canvas.getContext('webgl2');
  if (!gl) {
    alert('WebGL 2 not supported!');
  }
  // `setGL` is a function imported above which sets the value of `gl` in the `globals.ts` module.
  // Later, we can import `gl` from `globals.ts` to access it
  setGL(gl);

  // Initial call to load scene
  loadScene();

  const camera = new Camera(vec3.fromValues(0, 0, -10), vec3.fromValues(0, 0, 0));

  const renderer = new OpenGLRenderer(canvas);
  renderer.setClearColor(164.0 / 255.0, 233.0 / 255.0, 1.0, 1);
  gl.enable(gl.DEPTH_TEST);

  const flat = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/flat-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/flat-frag.glsl')),
  ]);

  function processKeyPresses() {
    // Use this if you wish
  }

  var hexToRgb = function(hex : string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  // This function will be called every frame
  function tick() {

    //adding GUI elements 

    //night or day cycle 
    if (nightOrDayGUI != tType.timeOfDay) {
      nightOrDayGUI = tType.timeOfDay; 
      flat.setTimeOfDay(nightOrDayGUI); 
    }

    //speed of animating the day cycle 
    if (speedOfCycleGUI != s.dayCycleSpeed) {
      speedOfCycleGUI = s.dayCycleSpeed; 
      flat.setSpeedOfCycle(speedOfCycleGUI); 
    }

    //change the stadium color 
    var rgbColor = hexToRgb(palette.stadiumColor); 
    flat.setStadiumColor(vec3.fromValues(rgbColor.r, rgbColor.g, rgbColor.b)); 

    //boolean for animate platform 
    if (animatePlatformsGUI != ap.animatePlatforms) {
      animatePlatformsGUI = !animatePlatformsGUI; 
      if (animatePlatformsGUI) {
        //pass in a 1 for true
        flat.setAnimatePlatforms(1); 

      } else {
        //pass in a 0 for false
        flat.setAnimatePlatforms(0); 
      }

    }


//     let nightOrDayGUI: number; 
// let speedOfCycleGUI: number;
// let stadiumColorGUI: vec3;
// let animatePlatformsGUI: boolean; 



    camera.update();
    stats.begin();
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.clear();
    processKeyPresses();
    renderer.render(camera, flat, [
      square,
    ], time);
    time++;
    stats.end();

    // Tell the browser to call `tick` again whenever it renders a new frame
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.setAspectRatio(window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
    flat.setDimensions(window.innerWidth, window.innerHeight);
  }, false);

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.setAspectRatio(window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();
  flat.setDimensions(window.innerWidth, window.innerHeight);

  // Start the render loop
  tick();
}

main();
