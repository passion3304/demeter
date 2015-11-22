var React = require('react');
var THREE = require('three');

var Viewport = React.createClass({
  render : function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('viewport').appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0x8ead86 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var pointLight =
      new THREE.PointLight(0xFFFFFF);

    // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

    // add to the scene
        scene.add(pointLight);

    camera.position.z = 5;

    var render = function () {
      requestAnimationFrame( render );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    renderer.render( scene, camera );

    return (
      <div>
        {render()}
      </div>
    );
  }
});

module.exports = Viewport;