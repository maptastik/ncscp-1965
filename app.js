var map = L.map('map',{
      minZoom: 13,
      maxZoom: 19
    })
    .setView([35.780310,-78.639123], 14);

var gBase = new L.Google();

map.addLayer(gBase);

var overlay = L.tileLayer('https://api.mapbox.com/styles/v1/maptastik/cjenc1rvu7zwr2rqph3x7oygm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwdGFzdGlrIiwiYSI6IjNPMkREV1kifQ.2KGPFZD0QaGfvYzXYotTXQ', {
        attribution: '<a href="#" target="_blank"><i>Forthcoming</i></a>',
        opacity: 0.75,
        maxNativeZoom: 22,
        maxZoom: 22
      })
      .addTo(map);

  $("#opacity-control").trigger("create");
  $("#opacity-slider").on("slidestop", function(event, ui){
    var opacityNew = event.target.valueAsNumber;
    ChangeOpacity(opacityNew, overlay);
  })

  function ChangeOpacity(slider, overlay){
    var opacityValue = slider/100;
    overlay.setOpacity(opacityValue);
  }
