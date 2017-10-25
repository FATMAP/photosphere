class CameraControls {
	constructor(dom, camera, clickCallback) {
		this.dom = dom;
		this.camera = camera;
		this.clickCallback = clickCallback;

		dom.addEventListener( 'mousedown', this.onMouseDown.bind(this), false );
		dom.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
		dom.addEventListener( 'mouseup', this.onMouseUp.bind(this), false );

		this.raycaster = new THREE.Raycaster();
		this.mouse = false;

		this.spin = 0;
		this.tilt = Math.PI / 2;
		this.zoom = 0;
		this.position = new THREE.Vector3();
		this.mousePos = new THREE.Vector2();
	}

	getForwardVector() {
        let forward = new THREE.Vector3(0, 0, -1);
        return forward.applyQuaternion(this.camera.quaternion);
    }

	update() {
		this.camera.quaternion.setFromEuler(new THREE.Euler(this.tilt, 0, this.spin, "ZYX"));
	}

	onMouseDown(event) {
		this.mouse = true;

		this.mousePos.x = event.offsetX / this.dom.offsetWidth * 2 - 1;
		this.mousePos.y = -(event.offsetY / this.dom.offsetWidth * 2 - 1);
	}

	onMouseUp(event) {
		this.mouse = false;
	}

	onMouseMove(event) {
		if (!this.mouse)
			return;

		let lastMousePos = this.mousePos.clone();

		this.mousePos.x = event.offsetX / this.dom.offsetWidth * 2 - 1;
		this.mousePos.y = -(event.offsetY / this.dom.offsetWidth * 2 - 1);

		let diff = lastMousePos.clone().sub(this.mousePos);

		this.tilt += diff.y;
		this.spin -= diff.x;

        // this.raycaster.setFromCamera(this.mousePos, this.camera);
        // let direction = this.raycaster.ray.direction;
	}
}