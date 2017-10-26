var texts = [
	"Canadian Bowl - Freeride - 40° - Serious",
	"Pointe de Vue - Black Piste - 4km",
	"Couloir de la Jeureumaz - Freeride - 41° - Serious"
]
var buttons = document.querySelectorAll('button');

for (var i = 0; i < 3; i++) {
	let index = i;
	buttons[i].addEventListener('click', () => {
		alert(texts[index]);
	});
}

function poiMover(pos, index) {
	buttons[index].style.top = (pos.y - 16) + "px";
	buttons[index].style.left = (pos.x - 16) + "px";
}



var textureURLs = [  // URLs of the six faces of the cube map 
	"Cubemaps/Chamonix_posx.jpg",
	"Cubemaps/Chamonix_negx.jpg",
	"Cubemaps/Chamonix_posz.jpg",
	"Cubemaps/Chamonix_negz.jpg",
	"Cubemaps/Chamonix_negy.jpg",
	"Cubemaps/Chamonix_posy.jpg"
];

var cube;

var textures = loadTextures(textureURLs, render);
var materials = [];
for (var i = 0; i < 6; i++) {
	materials.push( new THREE.MeshBasicMaterial( {
		color: "white",
		side: THREE.FrontSide,  // IMPORTANT: To see the inside of the cube, back faces must be rendered!
		map: textures[i]
	} ) );
}
cube = new THREE.Mesh( new THREE.CubeGeometry(100,100,100), new THREE.MeshFaceMaterial(materials) );
cube.scale.x = -1;

var webglEl = document.getElementById('sphere');
var width  = 780, height = 565;
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.x = 0.1;

var renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
renderer.setSize(width, height);

cube.quaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
scene.add(cube);

var controls = new CameraControls(webglEl, camera, null, poiMover);

webglEl.appendChild(renderer.domElement);

render();

function render() {
	controls.update();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

function loadTextures(textureURLs, callback) {
	var loaded = 0;
	function loadedOne() {
		loaded++;
		if (callback && loaded == textureURLs.length) {
			for (var i = 0; i < textureURLs; i++)
				textures[i].needsUpdate = true;
			callback();
		}
	}
	var textures = [];
	for (var i = 0; i < textureURLs.length; i++) {
		var tex = THREE.ImageUtils.loadTexture( textureURLs[i], undefined, loadedOne );
		textures.push(tex);
	}
	return textures;
}

window.addEventListener( 'resize', onWindowResize, false );

onWindowResize();

function onWindowResize(){
    camera.aspect = webglEl.offsetWidth / webglEl.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( webglEl.offsetWidth, webglEl.offsetHeight );

}