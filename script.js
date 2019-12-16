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
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.setClearColor(0xCCCCCC);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //sides
  var geom = new THREE.PlaneGeometry(1, 1);
  var side0 = new THREE.Mesh(
    geom,
    new THREE.MeshBasicMaterial({ color: 'white', wireframe: true })
  );
  scene.add(side0);

  var side1Geom = new THREE.PlaneGeometry(1, 1);
  side1Geom.translate(-0.5, 0, 0);
  var side1 = new THREE.Mesh(
    side1Geom,
    new THREE.MeshBasicMaterial({ color: 'white', wireframe: true })
  );
  sides.push(side1);

  var side2 = side1.clone();
  sides.push(side2);
  var side3 = side1.clone();
  sides.push(side3);
  var side4 = side1.clone();
  sides.push(side4);
  var side5 = side1.clone();
  sides.push(side5);
  side5.material = new THREE.MeshBasicMaterial({
    color: 'blue',
    side: THREE.DoubleSide
  });

  // hierarchy
  side1.position.set(-0.5, 0, 0);
  side0.add(side1);
  side2.position.set(0, -0.5, 0);
  side2.rotation.z = Math.PI / 2;
  side0.add(side2);
  side3.position.set(0.5, 0, 0);
  side3.rotation.z = Math.PI;
  side0.add(side3);
  side4.position.set(-0.5, -0.5, 0);
  side4.rotation.z = Math.PI / 2;
  side3.add(side4);
  side5.position.set(-0.5, 0.5, 0);
  side5.rotation.z = -Math.PI / 2;
  side4.add(side5);

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
      sides[1].rotation.x = -angle;
      sides[2].rotation.y = -angle;
      sides[3].rotation.x = -angle;
      sides[4].rotation.x = angle;
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
  sides[3].rotation.x += 0.01;
}, 100);
