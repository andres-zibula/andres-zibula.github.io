$(document).ready(function() {
  var canvas = document.getElementById('canvasTag');
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

   if( ! $('#canvasTag').tagcanvas({
     textColour : '#14FF14',
     outlineThickness : 1,
     maxSpeed : 0.02,
     depth : 0.75,
     initial: [0.5, 0],
     noMouse: true,
     noSelect: true,
     textHeight: 18,
     txtScale: 1,
     radiusX: 1.5,
     wheelZoom: false
   })) {
     // TagCanvas failed to load
     $('#canvasTagContainer').hide();
   }
   // your other jQuery stuff here...
 });