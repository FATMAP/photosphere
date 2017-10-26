var textureURLs = [  // URLs of the six faces of the cube map 
	"Cubemaps/Chamonix_posx.png",
	"Cubemaps/Chamonix_negx.png",
	"Cubemaps/Chamonix_posz.png",
	"Cubemaps/Chamonix_negz.png",
	"Cubemaps/Chamonix_negy.png",
	"Cubemaps/Chamonix_posy.png"
];

var cube;

var textures = loadTextures(textureURLs, render);
var materials = [];
for (var i = 0; i < 6; i++) {
	materials.push( new THREE.MeshBasicMaterial( {
		color: "white",
		side: THREE.BackSide,  // IMPORTANT: To see the inside of the cube, back faces must be rendered!
		map: textures[i]
	} ) );
}
cube = new THREE.Mesh( new THREE.CubeGeometry(100,100,100), new THREE.MeshFaceMaterial(materials) );




var webglEl = document.getElementById('sphere');
var width  = 780, height = 565;
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.x = 0.1;

var renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
renderer.setSize(width, height);

window.sphere = new THREE.Mesh(
	new THREE.SphereGeometry(100, 20, 20),
	new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture('index.jpg')
	})
);
sphere.quaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
sphere.scale.x = -1;
// scene.add(sphere);

cube.quaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
scene.add(cube);

var controls = new CameraControls(webglEl, camera);

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

function onWindowResize(){
    camera.aspect = webglEl.offsetWidth / webglEl.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( webglEl.offsetWidth, webglEl.offsetHeight );

}