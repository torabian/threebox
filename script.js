var camera, scene, renderer, controls;
var sides = [];
var clock = new THREE.Clock();
init(1, 1, 2);
animate();

function getPlane(t = 'x', height, depth, width) {
  let side1Geom;
  if (t === 'x') {
    side1Geom = new THREE.PlaneGeometry(depth, height);
  }
  if (t === 'y') {
    side1Geom = new THREE.PlaneGeometry(width, depth);
  }
  side1Geom.translate(
    t === 'x' ? -(depth / 2) : 0,
    t === 'y' ? -(depth / 2) : 0,
    t === 'z' ? -(depth / 2) : 0
  );
  let side1 = new THREE.Mesh(
    side1Geom,
    new THREE.MeshBasicMaterial({ color: 'white', wireframe: true })
  );
  return side1;
}

function init(width, height, depth) {
  sides = [];
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(-0.5, 0.5, 1).setLength(10);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth - 300, window.innerHeight);
  renderer.setClearColor(0xcccccc);
  document.getElementById('render').innerHTML = '';
  document.getElementById('render').appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  draw(height, depth, width);
}

function draw(height, depth, width) {
  var geom = new THREE.PlaneGeometry(width, height);
  var side0 = new THREE.Mesh(
    geom,
    new THREE.MeshBasicMaterial({ color: 'white', wireframe: true })
  );
  side0.rotation.x = Math.PI / 2;
  scene.add(side0);

  const right = getPlane('x', height, depth, width);
  sides.push(right);
  right.position.set(width / 2, 0, 0);
  right.rotation.z = Math.PI;
  side0.add(right);

  const left = getPlane('x', height, depth, width);
  sides.push(left);
  left.position.set(-(width / 2), 0, 0);
  side0.add(left);

  const up = getPlane('y', height, depth, width);
  sides.push(up);
  up.position.set(0, -(height / 2), 0);
  side0.add(up);

  const down = getPlane('y', height, depth, width);
  sides.push(down);
  down.position.set(0, height / 2, 0);
  down.rotation.z = Math.PI;
  side0.add(down);
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
      sides[2].rotation.x = angle;
      sides[3].rotation.x = -angle;
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
  renderer.clear();
  renderer.render(scene, camera);
}

setInterval(() => {
  // sides[2].rotation.z += 0.1;
}, 100);

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    width: 4,
    height: 2,
    depth: 2
  },
  watch: {
    width: function(value) {
      init(this.width, this.height, this.depth);
      foldTheCube();
    },
    height: function(value) {
      init(this.width, this.height, this.depth);
      foldTheCube();
    },
    depth: function(value) {
      init(this.width, this.height, this.depth);
      foldTheCube();
    }
  },
  created() {
    init(this.width, this.height, this.depth);
    foldTheCube();
  }
});
