function clamp(value, min, max) {
    return value <= min ? min : (value >= max ? max : value);
}

class CameraControls {
	constructor(dom, camera, clickCallback, poiCallback) {
		this.dom = dom;
		this.camera = camera;
		this.clickCallback = clickCallback;

		dom.addEventListener( 'mousedown', this.onMouseDown.bind(this), false );
		dom.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
		dom.addEventListener( 'mouseup', this.onMouseUp.bind(this), false );
		dom.addEventListener( 'mouseout', this.onMouseUp.bind(this), false );
		dom.addEventListener( 'wheel', this.onMouseWheel.bind(this), false );
		dom.addEventListener( 'click', this.onMouseClick.bind(this), false );

		this.raycaster = new THREE.Raycaster();
		this.mouse = false;

		this.spin = -0.9633459269569827;
		this.tilt = 0.812635402027862;
		this.zoom = 0;
		this.position = new THREE.Vector3();
		this.mousePos = new THREE.Vector2();

		this.pois = [
			new THREE.Vector3(0.9239058997615655, 0.4449943946544958, -0.35094024714210814),
			new THREE.Vector3(0.7894983995014908, 0.6595067953962015, -0.2994039811210184),
			new THREE.Vector3(0.5625950543402208, 0.18146993616821464, -0.8677986390673083)
		]

		this.poiCallback = poiCallback;
		this.update();
		this.camera.updateMatrixWorld();
		this.reportPositions();
	}

	getForwardVector() {
        let forward = new THREE.Vector3(0, 0, -1);
        return forward.applyQuaternion(this.camera.quaternion);
    }

	update() {
		this.camera.quaternion.setFromEuler(new THREE.Euler(this.tilt, 0, this.spin, "ZYX"));
		this.reportPositions();
	}

	onMouseDown(event) {
		this.mouse = true;

		this.mousePos.x = event.offsetX / this.dom.offsetWidth * 2 - 1;
		this.mousePos.y = -(event.offsetY / this.dom.offsetHeight * 2 - 1);
	}

	onMouseUp(event) {
		this.mouse = false;
	}

	onMouseMove(event) {
		if (!this.mouse)
			return;

		let lastMousePos = this.mousePos.clone();

		this.mousePos.x = event.offsetX / this.dom.offsetWidth * 2 - 1;
		this.mousePos.y = -(event.offsetY / this.dom.offsetHeight * 2 - 1);

		let diff = lastMousePos.clone().sub(this.mousePos);

		this.tilt += diff.y * this.camera.fov * 0.01;
		this.spin -= diff.x * this.camera.fov * 0.012 * this.camera.aspect;

		this.tilt = clamp(this.tilt, Math.PI * 0.1, Math.PI * 0.9);
	}

	reportPositions() {
		for (var i = 0; i < this.pois.length; i++) {
			let vector = this.pois[i].clone();
			vector.project(this.camera);

			vector.x = (vector.x + 1) * this.dom.offsetWidth / 2;
			vector.y = (1 - vector.y) * this.dom.offsetHeight / 2;

			this.poiCallback(vector.clone(), i)
		}
	}

	onMouseWheel(event) {
		event.preventDefault();
		event.stopPropagation();

		let fov = this.camera.fov;
		fov = clamp(fov + event.deltaY * 0.0004 * fov, 10, 70);
		this.camera.fov = fov;
		camera.updateProjectionMatrix();
	}

	onMouseClick(event) {
		// let pos = new THREE.Vector2;
		// pos.x = event.offsetX / this.dom.offsetWidth * 2 - 1;
		// pos.y = -(event.offsetY / this.dom.offsetHeight * 2 - 1);

  //       this.raycaster.setFromCamera(pos, this.camera);
  //       let direction = this.raycaster.ray.direction;

  //       console.log(direction)
	}
}
