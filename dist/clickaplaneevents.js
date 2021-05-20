/* To add interactivity to the site with Javascript */

let isVideoPlaying = false;

<script>
AFRAME.registerComponent('vidhandler', {
		init: function() {
			this.toggle = false;
			this.vid = document.querySelector("#vid");
			this.vid.pause();
		},
		tick: function() {
			if (this.el.object3D.visible == true) {
				if (!this.toggle) {
					this.toggle = true;
					this.vid.pause();
				}
			} else {
				this.toggle = false;
				this.vid.pause();
			}
		}
	});

	function refrespage() {
		location.reload();
	}

	function playvid() {
		vid.play();
	}
	this.el.addEventListener('click', function playPause() {
 var v = document.querySelector('#vid');
 if (v.paused)
v.play(); 
else 
v.pause();
});
</script>

/* Videohandler Function: to let the video play when the arSession is ready */
AFRAME.registerComponent("vidhandler", {
	init: function() {
		// the clicks may fire prematurely for some reason
		this.el.sceneEl.addEventListener("arSessionReady", this.addListeners.call(this));
	},
	addListeners: function() {
		this.video_src_1 = document.querySelector("#vid");
		this.button_play_1 = document.querySelector("#button_play_1");
		
		
	    	const marker = document.querySelector("#marker");
		this.video_plane_1 = document.querySelector("#video_1");
		
			
		marker.addEventListener("markerFound", function () {
			this.video_src_1.pause(); //needs to be set or otherwise the video will start automatically
			isVideoPlaying = false;
			
    		}.bind(this));
    
   		 marker.addEventListener("markerLost", function () {
			 if (this.video_plane_1.getAttribute("visible") == true && isVideoPlaying) {
				this.video_src_1.pause();
			 	isVideoPlaying = false;
			 } 
    		}.bind(this));
			
		this.el.addEventListener("click", e => {
			if (this.el === this.video_plane_1) {
				var v = document.querySelector('#vid');
				 if (v.paused)
				v.play(); 
				else 
				v.pause();
			} 
			
			
		})
	}
})


/* Logohandler Function: to let the image of the logo show. Otherwise it would start to flicker or hide when the user clicks somewhere
   It still disappears sometimes on iOS (Vers. 13.5.1, Safari) */
AFRAME.registerComponent("logohandler", {
	init: function () {
    		const marker = document.querySelector("#marker");
    		const logo = document.querySelector("#logo");

    		marker.addEventListener('markerFound', function () {
       			logo.hidden = false;
    		}.bind(this));
    
    		marker.addEventListener('markerLost', function () {
       			logo.hidden = false;
    		}.bind(this));
  	}
});

/* Scannerhandler Function: to let the image of the scanner show or hide when marker is tracked or not tracked */
AFRAME.registerComponent("scannerhandler", {
	init: function () {
    		const marker = document.querySelector("#marker");
    		const scanner = document.querySelector("#scanner");

    		marker.addEventListener('markerFound', function () {
       			scanner.hidden = true;
    		}.bind(this));
    
    		marker.addEventListener('markerLost', function () {
       			scanner.hidden = false;
    		}.bind(this));
  	}
});

/* Ar-session-notifier Function: to set a flag when the arSession is ready 
   "ready"-state means: when other components can access the system, and use the ar.js core. */
AFRAME.registerComponent("ar-session-notifier", {
	init: function() {
		var scene = this.el.sceneEl
		var arSession = null
		// wait until the arSession is ready
		var idx = setInterval(function() {
			arSession = scene.systems["arjs"]._arSession
			if (!arSession) return; // It just checks when the _arSession is not undefined, or null - and emits a signal.
			scene.emit("arSessionReady")
			clearInterval(idx)
		})
	}
})

/* Cursor-hack Function: to adjust the jsartoolkit5 projection matrix and the threejs projection matrix and emitting click-events */
AFRAME.registerComponent("cursor-modifier", {
	init: function() {
		var scene = this.el

		// wait until the arSession is ready
		scene.addEventListener("arSessionReady", function() {
			var arSession = scene.systems["arjs"]._arSession
			// helpers
			var raycaster = new THREE.Raycaster();
			var mouse = new THREE.Vector2();
			// useful references
			var cursorElement = document.querySelector("[cursor]")
			var arToolkitContext = arSession.arContext
			var camera = scene.camera

			function mousedown(event) {
				// core of this 'hack' - using the arToolkitContext projection matrix
				// makes sure that jsartoolkit5 projection matrix is not out of sync with the threejs projection matrix
				camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
				camera.projectionMatrixInverse.getInverse(camera.projectionMatrix);

				var point
				if (event.type === "touchmove" || event.type === "touchstart") {
					// Track the first touch for simplicity.
					point = event.touches.item(0);
				} else {
					point = event;
				}
				// Calculate mouse position based on the canvas element
				var rect = scene.renderer.domElement.getBoundingClientRect();
				mouse.x = ((point.clientX - rect.left) / rect.width) * 2 - 1  
				mouse.y = -((point.clientY - rect.top) / rect.height) * 2 + 1 
				raycaster.setFromCamera(mouse, camera); 		     
				// if there are any intersections - send the clicks
				var intersects = raycaster.intersectObjects(scene.object3D.children, true);
				if (intersects.length > 0) {
					// this click is stripped of any info it should have
					intersects[0].object.el.emit("click")
				}
				event.stopPropagation();
			}
			window.addEventListener('mousedown', mousedown, false);
			//window.addEventListener('touchstart', mousedown, false);
		})
	}
})