let scene, camera, renderer, starGeo, stars;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1, 1000);
            /*camera.position.z = 1;
            camera.position.x = Math.PI/2;*/
            camera.position.set(0,-200,0); // Set position like this
            camera.lookAt(new THREE.Vector3(0,0,0));


            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth,window.innerHeight);
            document.body.appendChild(renderer.domElement);

            starGeo = new THREE.Geometry();
            for(let i=0;i<6000;i++) {
                star = new THREE.Vector3(
                    Math.random() * 600 - 300,
                    Math.random() * 600 - 300,
                    Math.random() * 600 - 300
                );
                star.velocity = 2;
                star.acceleration = 0;
                starGeo.vertices.push(star);
            }
            let sprite = new THREE.TextureLoader().load('data:image/png;base64,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');
            let starMaterial = new THREE.PointsMaterial({
                color: 0xaaaaaa,
                size: 0.7,
                map: sprite
            });

            stars = new THREE.Points(starGeo,starMaterial);
            scene.add(stars);
            animate();
        }
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth,window.innerHeight);
        }
        function animate() {
            starGeo.vertices.forEach(p=>{
                p.velocity += p.acceleration;
                p.y -= p.velocity;
                if(p.y < -200 ){
                    p.y = 200;
                    p.velocity = 0;
                }
            })
            starGeo.verticesNeedUpdate = true;
            stars.rotation.y += 0.001;
            renderer.render(scene,camera);
            requestAnimationFrame(animate);
        }
        init();