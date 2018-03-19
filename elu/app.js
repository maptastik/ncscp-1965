var map = L.map('map',{
      minZoom: 13,
      maxZoom: 19
    })
    .setView([35.780310,-78.639123], 15);

tileLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

function getColor(d) {
    return d == 1 ? '#64824e' :
           d == 2  ? '#93bc93' :
           d == 3  ? '#db6a7b' :
           d == 4  ? '#b5b7b8' :
           d == 5   ? '#efe7b1' :
           d == 6   ? '#d3c14e' :
           d == 7   ? '#866c52' :
                      '#f7f2e1';
}

function getClassification(c) {
    return c == 1 ? 'State' :
           c == 2 ? 'Other Public and Institutional' :
           c == 3 ? 'Commercial' :
           c == 4 ? 'Wholesale and Industrial' :
           c == 5 ? 'Residential - Single Family' :
           c == 6 ? 'Residential - Multi Family' :
           c == 7 ? 'Transportation and Utilities' :
                    'Not Classified';
}

function zoomToFeature(e) {
    map.flyToBounds(e.target.getBounds());
}

tileLayer.on('load', function(){
  tileLayer.off('load');
  elu = L.geoPackageFeatureLayer([], {
      geoPackageUrl: './../ncscp.gpkg',
      layerName: 'elu',
      style: function (feature) {
          return {
              fillColor: getColor(feature.properties.landuse),
              weight: 0.5,
              opacity: 1,
              color: 'black',
              fillOpacity: 0.7
          }
      },
      onEachFeature: function (feature, layer) {
        var classification = getClassification(feature.properties.landuse)
        layer.bindPopup(classification);
        layer.on({
          click: zoomToFeature
        })
      }
  })
  console.log(elu)
  elu.addTo(map);
})
