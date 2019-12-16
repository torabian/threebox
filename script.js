var camera, scene, renderer, controls;
var sides = [];
var clock = new THREE.Clock();
init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(-0.5, 0.5, 1).setLength(5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth - 300, window.innerHeight);
  renderer.setClearColor(0xcccccc);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  let width = 1;
  let height = 1;
  let depth = 1;
  //sides
  var geom = new THREE.PlaneGeometry(width, height);
  var side0 = new THREE.Mesh(
    geom,
    new THREE.MeshBasicMaterial({ color: 'white', wireframe: true })
  );
  side0.rotation.x = Math.PI / 2;
  scene.add(side0);

  function getPlane() {
    let side1Geom = new THREE.PlaneGeometry(depth, height);
    side1Geom.translate(-(depth / 2), 0, 0);
    let side1 = new THREE.Mesh(
      side1Geom,
      new THREE.MeshBasicMaterial({ color: 'white', wireframe: true })
    );
    return side1;
  }

  // var side2 = getPlane();
  // sides.push(side2);

  // hierarchy
  const right = getPlane();
  sides.push(right);
  right.position.set(width / 2, 0, 0);
  right.rotation.z = Math.PI;
  right.rotation.y = 1;
  side0.add(right);

  const left = getPlane();
  sides.push(left);
  left.rotation.y = -1;
  left.position.set(-(width / 2), 0, 0);
  side0.add(left);

  // side2.position.set(0, -(width / 2), 0);
  // side2.rotation.z = Math.PI / 2;
  // side0.add(side2);

  // var side3 = getPlane();
  // sides.push(side3);
  // var side4 = getPlane();
  // sides.push(side4);
  // var side5 = getPlane();
  // sides.push(side5);
  // side5.material = new THREE.MeshBasicMaterial({
  //   color: 'blue',
  //   side: THREE.DoubleSide
  // });

  // side3.position.set(0.5, 0, 0);
  // side3.rotation.z = Math.PI;
  // side0.add(side3);
  // side4.position.set(-0.5, -0.5, 0);
  // side4.rotation.z = Math.PI / 2;
  // side3.add(side4);
  // side5.position.set(-0.5, 0.5, 0);
  // side5.rotation.z = -Math.PI / 2;
  // side4.add(side5);

  document.getElementById('run').addEventListener('click', foldTheCube);
}

function foldTheCube() {
  var start = { value: 0 };
  var finish = { value: Math.PI / 2 };
  var angle = 0;
  new TWEEN.Tween(start)
    .to(finish, 3000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate(function() {
      angle = this.value;
      sides[0].rotation.y = angle;
      sides[1].rotation.y = -angle;
      // sides[2].rotation.x = angle;
      // sides[3].rotation.x = -angle;
      // sides[4].rotation.x = angle;
    })
    .start();
}

// animate
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

setInterval(() => {
  sides[2].rotation.z += 0.1;
}, 100);

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    width: 20,
    height: 20,
    depth: 20
  }
});
