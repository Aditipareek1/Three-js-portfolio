import * as THREE from 'three';
import "./style.css"
import gsap from "gsap"
import{OrbitControls} from "three/examples/jsm/controls/OrbitControls"

//scene
const scene = new THREE.Scene()

//create out sphere
const geometry = new THREE.SphereGeometry(5,64,64)
const material = new THREE.MeshStandardMaterial({
  color:"#03fca5",
  roughness: 1
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100 )
camera.position.z=20
scene.add(camera)


//light
const light = new THREE.PointLight(0xffffff, 1,100)
light.position.set(0,10,10)
light.intensity= 1.5
scene.add(light)


//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)


//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5 

//resize
window.addEventListener("resize", ()=>{
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width/sizes.height;
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () =>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline magicc
const t1 = gsap.timeline({ default:{duration: 1}})
t1.fromTo(mesh.scale,{z:0, x:0, y:0}, {z:1, x:1, y:1})
t1.fromTo('nav', {y:"-100%"}, {y: "0%"})
t1.fromTo(".title", {opacity: 0}, {opacity: 1})

//mouse animation color
let mouseDown = false;
let rgb = []
window.addEventListener('mousedown', ()=>(mouseDown = true))
window.addEventListener('mouseup', ()=>(mouseDown = false))
window.addEventListener('mousemove', (e)=>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*255),
      255
    ]

    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {r: newColor.r,
       g: newColor.g ,
       b: newColor.b ,
    })
  }
})

//Load background texture
const loader = new THREE.TextureLoader();
loader.load('\pexels-frank-cone-3214110.jpg' , function(texture)
            {
             scene.background = texture;  
            });