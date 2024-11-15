import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

const ThreeScene = () => {
  useEffect(() => {
    if(typeof window !== 'undefined') {

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xff8cde, 0, 30);
      
      function createRadialGradientTexture() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        canvas.width = 512;
        canvas.height = 512;
        
        const gradient = context.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2
        );
        
        gradient.addColorStop(0, "#F1DFE3");
        gradient.addColorStop(1, "#becef0");
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
      }
      
      scene.background = createRadialGradientTexture();
      
      const sphereGeometry = new THREE.SphereGeometry(2, 54, 54);
      const sphereMaterial = new THREE.MeshStandardMaterial({ color: "#fff" });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);
      
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeMaterial = new THREE.MeshStandardMaterial({ color: "#4733FF" });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(5, -2, 0);
      
      const torusGeometry = new THREE.TorusGeometry(2.8, 0.1, 30, 500);
      const torusMaterial = new THREE.MeshStandardMaterial({
        color: "#0d3dc1",
        metalness: 0.5,
        roughness: 0.2,
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.position.set(0, 0, 0);
      torus.rotation.set(2, 0, 0);
      scene.add(torus);
      
      const torusGeometry2 = new THREE.TorusGeometry(4, 0.1, 30, 500);
      const torusMaterial2 = new THREE.MeshStandardMaterial({
        color: "#0d3dc1",
        metalness: 0.5,
        roughness: 0.2,
      });
      const torus2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
      torus2.position.set(0, 0, 0);
      torus2.rotation.set(2, 0, 0);
      scene.add(torus2);
      
      function createStarShape(radius, innerRadius, numPoints) {
        const shape = new THREE.Shape();
        const step = (Math.PI * 2) / numPoints;
        
        for (let i = 0; i < numPoints; i++) {
          const outerX = radius * Math.cos(i * step);
          const outerY = radius * Math.sin(i * step);
          const innerX = innerRadius * Math.cos((i + 0.5) * step);
          const innerY = innerRadius * Math.sin((i + 0.5) * step);
          
          if (i === 0) {
            shape.moveTo(outerX, outerY);
          } else {
            shape.lineTo(outerX, outerY);
          }
          shape.lineTo(innerX, innerY);
        }
        
        shape.closePath();
        return shape;
      }
      
      function createStar(radius, innerRadius, numPoints, color, position) {
        const starShape = createStarShape(radius, innerRadius, numPoints);
        const extrudeSettings = {
          depth: 0.05,
          bevelEnabled: true,
          bevelSegments: 100,
          steps: 1,
          bevelSize: 0.04,
          bevelThickness: 0.025,
        };
        const starGeometry = new THREE.ExtrudeGeometry(
          starShape,
          extrudeSettings
        );
        const starMaterial = new THREE.MeshStandardMaterial({ color: color });
        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.set(position.x, position.y, position.z);
        scene.add(star);
        return star;
      }
      
      const stars = [];
      for (let i = 0; i < 50; i++) {
        const position = {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 25,
          z: (Math.random() - 0.5) * 20,
        };
        const star = createStar(0.1, 0.17, 5, "#ffc800", position);
        stars.push(star);
      }
      
      const pointLight = new THREE.PointLight(0xffffff, 1, 100);
      pointLight.position.set(0, 10, 10);
      scene.add(pointLight);
      
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      
      const light = new THREE.PointLight(0xff8cf5, 50, 50);
      light.position.set(55, 5, 15);
      scene.add(light);
      
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);
      
      const camera = new THREE.PerspectiveCamera(
        45,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.z = 15;
      scene.add(camera);
      
      const canvas = document.querySelector(".webgl");
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      const composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);
      
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.158,
        0.7,
        0.2
      );
      composer.addPass(bloomPass);
      
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1;
      
      window.addEventListener("resize", () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        composer.setSize(sizes.width, sizes.height);
      });
      
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        composer.render();
      };
      animate();
    }
    }, []);
    
  };
  
  export default ThreeScene;
  