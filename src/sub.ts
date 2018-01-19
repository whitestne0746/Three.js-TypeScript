import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 10, 200);
camera.setLens(20, 100);
let key: string;
const tall = 2;

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  const light = new THREE.DirectionalLight(0xf4a460);
  light.position.set(50, 100, -100);
  light.shadow.camera.left = -1000;
  light.shadow.camera.right = 1000;
  light.shadow.camera.top = -1000;
  light.shadow.camera.bottom = 1000;
  light.shadow.camera.far = 4000;

  light.shadow.mapSize.width = 8192;
  light.shadow.mapSize.height = 8192;

  light.castShadow = true;
  scene.add(light);

  const amb = new THREE.AmbientLight("#464646");
  scene.add(amb);

  const texture1 = new THREE.TextureLoader().load("../texture/building.png");
  const geometry1 = new THREE.BoxGeometry(20, 20, 150);
  const material1 = new THREE.MeshPhongMaterial({
    map: texture1
  });
  const building1 = new THREE.Mesh(geometry1, material1);
  building1.position.set(-30, 10, 0);
  building1.castShadow = true;
  building1.receiveShadow = true;
  scene.add(building1);

  const texture2 = new THREE.TextureLoader().load("../texture/building1.png");
  const material2 = new THREE.MeshPhongMaterial({
    map: texture2
  });
  const geometry2 = new THREE.BoxGeometry(50, 30, 60);
  const building2 = new THREE.Mesh(geometry2, material2);
  building2.position.set(40, 15, 55);
  building2.castShadow = true;
  building2.receiveShadow = true;
  scene.add(building2);

  const geometry3 = new THREE.BoxGeometry(40, 10, 10);
  const material3 = new THREE.MeshPhongMaterial({
    color: 0xffffff
  });
  const building3 = new THREE.Mesh(geometry3, material3);
  building3.position.set(20, 5, 75);
  building3.castShadow = true;
  building3.receiveShadow = true;
  scene.add(building3);

  const loader = new THREE.ObjectLoader();
  loader.load("../model/standard-male-figure.json", obj => {
    const model = obj;
    model.scale.set(2, 2, 2);
    model.position.set(10, 0, 0);
    scene.add(model);
  });

  loader.load("../model/standard-female-figure.json", obj => {
    const model1 = obj;
    model1.scale.set(0.5, 0.5, 0.5);
    model1.position.set(-9, 0, 80);
    scene.add(model1);
  });

  // 地面
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshPhongMaterial({
      color: 0xdcdcdc
    })
  );
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);

  // ここからカーブ
  const sep = 720; // 3点を何分割するか

  // 太陽（光源）が表にあるとき
  const point01 = new THREE.Vector3(0, 0, 300);
  const point02 = new THREE.Vector3(200, 260, 0);
  const point03 = new THREE.Vector3(0, 0, -300);

  const curve1 = new THREE.QuadraticBezierCurve3(point01, point02, point03);
  const curvePoints1 = curve1.getPoints(sep);

  // 太陽（光源）が裏にあるとき
  const point04 = new THREE.Vector3(0, 0, -300);
  const point05 = new THREE.Vector3(-200, -260, 0);
  const point06 = new THREE.Vector3(0, 0, 300);

  // 3点をsep点で分割しカーブを得る
  const curve2 = new THREE.QuadraticBezierCurve3(point04, point05, point06);
  const curvePoints2 = curve2.getPoints(sep);

  renderer.shadowMapEnabled = true;

  // read city model
  loader.load("../model/center-city-sci-fi.json", obj => {
    const city = obj;
    city.scale.set(1.0, 1.0, 1.0);
    city.position.set(-200, 0, 500);
    scene.add(city);
  });

  document.body.appendChild(renderer.domElement);

  let front = true;
  let back = false;
  let count = 0;

  const rox = 0.02;
  const roy = 0.02;
  const roz = 0.02;

  const spx = 0.6;
  const spy = 0.6;
  const spz = 0.6;

  const animate = (): void => {
    requestAnimationFrame(animate);

    if (front) {
      light.position.x = curvePoints1[count].x;
      light.position.y = curvePoints1[count].y;
      light.position.z = curvePoints1[count].z;
      if (count === sep) {
        front = false;
        back = true;
        count = 0;
      }
    } else if (back) {
      light.position.x = curvePoints2[count].x;
      light.position.y = curvePoints2[count].y;
      light.position.z = curvePoints2[count].z;
      if (count === sep) {
        back = false;
        front = true;
        count = 0;
      }
    }

    if (key === "up") {
      // camera.rotation.x +=rox
      camera.rotation.x += rox;
      // camera.rotation.y -= camera.rotation.y
    } else {
      if (key === "down") {
        camera.rotation.x -= rox;
      }
    }
    if (key === "right") {
      camera.rotation.y -= roy;
    } else {
      if (key === "left") {
        camera.rotation.y += roy;
      }
    }

    if (key === "w") {
      console.log("w");
      camera.position.z -= Math.sin(-(camera.rotation.y - Math.PI / 2)) / 2;
      camera.position.x -= Math.cos(-(camera.rotation.y - Math.PI / 2)) / 2;
    } else {
      if (key === "s") {
        camera.position.z += Math.sin(-(camera.rotation.y - Math.PI / 2)) / 2;
        camera.position.x += Math.cos(-(camera.rotation.y - Math.PI / 2)) / 2;
      }
    }

    if (key === "d") {
      camera.position.z -= Math.sin(-(camera.rotation.y - Math.PI)) / 2;
      camera.position.x -= Math.cos(-(camera.rotation.y - Math.PI)) / 2;
    } else {
      if (key === "a") {
        camera.position.z += Math.sin(-(camera.rotation.y - Math.PI)) / 2;
        camera.position.x += Math.cos(-(camera.rotation.y - Math.PI)) / 2;
      }
    }
    if (key === "space") {
      camera.position.y += spy;
    } else {
      if (key === "shift") {
        if (camera.position.y > tall) {
          camera.position.y -= spy;
        }
      }
    }
    count = count + 1;
    // console.log(keyStatus)
    renderer.render(scene, camera);
  };
  animate();
});

document.onkeydown = KeyDown;
function KeyDown(e) {
  switch (e.keyCode) {
    case 65: // 左 A
      key = "a";
      break;
    case 83: // 下 S
      key = "s";
      break;
    case 68: // 右 D
      key = "d";
      break;
    case 87: // 上 W
      key = "w";
      break;
    case 40: // 手前 down
      key = "down";
      break;
    case 38: // 奥 up
      key = "up";
      console.log("up");
      break;
    case 37:
      key = "left";
      break;
    case 39:
      key = "right";
      break;
  }
}

document.onkeyup = KeyUp;
function KeyUp(e) {
  if (e.keyCode === 39 || e.keyCode === 37) {
    key = "rot(R or L)";
  }
  if (e.keyCode === 38 || e.keyCode === 40) {
    key = "rot(UP or DOWN)";
  }
  if (e.keyCode === 87 || e.keyCode === 83) {
    key = "pos(Forward or Back)";
  }
  if (e.keyCode === 65 || e.keyCode === 68) {
    key = "pos(R or L)";
  }
  if (e.keyCode === 32 || e.keyCode === 16) {
    key = "pos(UP or DOWN)";
  }
}
