import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
import { phyObj } from "./classes.js";

let deltaTime = 0;

let custObjs = [];

main();


function main(){
    
    

    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#gl-canvas");
    // initialize the gl context
    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext("webgl");

    // only continue if webgl is working
    if (gl === null){
        alert("Unable to initialize webgl",);
        return;
    }
    
    /// Section for creating objects
    //find variable for adjusting offsetX and Y to spawn a cube
    let cwidth = 7;
    let cheight = 4;
    let cx = canvas.width/(cwidth*2);
    let cy = canvas.height/(cheight*2);
    // click 
    canvas.addEventListener('click', (e) =>{
      let relx = (e.offsetX/cx) - cwidth;
      let rely = -(e.offsetY/cy) + cheight;
      console.log(relx+" "+rely);
      const ob = new phyObj(relx,rely,2,2,1, canvas,document.querySelector("#shapetxt").value);
      custObjs.push(ob);
    });
    // button
    document.querySelector("#add-cube").addEventListener("click", () => {
      const x = parseFloat(document.querySelector("#coord-x").value);
      const y = parseFloat(document.querySelector("#coord-y").value);
      if (!isNaN(x) && !isNaN(y)) {
        const ob = new phyObj(x,y,2,2,1,canvas,document.querySelector("#shapetxt").value);
        custObjs.push(ob);
      } else{
        console.log("IDIOT");
      }
    });
    // starting
    /*for (let i =0; i<10; i++){
      custObjs.push(new phyObj(i,0,0,0,999,canvas,"square"));
    }*/

    // set clear color to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    // clear the color buffer with specified color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // creates the vertex shader source
    const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

    // creates the fragment shader source
    const fsSource = `
    varying lowp vec4 vColor;

    void main() {
      gl_FragColor = vColor;
    }
  `;

    const shaderProgram = initShaderProgram(gl,vsSource,fsSource);

    const programInfo={
        program: shaderProgram,
        attribLocations:{
            vertexPosition: gl.getAttribLocation(shaderProgram,"aVertexPosition"),
            vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
        },
        uniformLocations:{
            projectionMatrix: gl.getUniformLocation(shaderProgram,"uProjectionMatrix"),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        },
    };

    const buffers = initBuffers(gl);

    let then = 0;

    function render(now){
        now *= 0.001;
        deltaTime = now-then;
        then = now;
        for (const c of custObjs){
          c.updatePos(deltaTime);
        }
        drawScene(gl,programInfo,buffers,custObjs);
        requestAnimationFrame(render);
    }
    // Requestanimframe will ask the browser to call render on each
    // frame.
    requestAnimationFrame(render); 
}


function initShaderProgram(gl,vsSource,fsSource){
    const vertexShader = loadShader(gl,gl.VERTEX_SHADER,vsSource);
    const fragmentShader = loadShader(gl,gl.FRAGMENT_SHADER,fsSource);

    // create shader program
    const shaderProgram = gl.createProgram();
    // attach vs and fs
    gl.attachShader(shaderProgram,vertexShader);
    gl.attachShader(shaderProgram,fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert(
        `Unable to initialize the shader program: ${gl.getProgramInfoLog(
          shaderProgram,
        )}`,
      );
      return null;
    }

    return shaderProgram;
}

// creates a shader of given type, uploads source and compiles it
function loadShader(gl,type,source){
    const shader = gl.createShader(type);

    // send the source to the shader object
    gl.shaderSource(shader,source);

    //compile shader program
    gl.compileShader(shader);

    // make sure it compiled coprrectly
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(
        `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`,
        );
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
