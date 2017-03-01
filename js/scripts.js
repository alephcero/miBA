// en la clase uso las dos formas, con myData y con el geojson directo
$.getJSON('data/baCensusBlocks.geojson',function(tablaDeDatos){

  L.geoJson(tablaDeDatos,{
    style: style,
    onEachFeature: function(feature,layer) {

      layer.bindPopup(feature.properties.name);
      
      layer.on('click',function(){
        console.log('click', feature)
        //$('.informacion h2').text(feature.properties.name)
      });//fin on click 
    }
  }).addTo(map);

  console.log('heres data',tablaDeDatos)
})

function getColor(d) {
    return  d == 0 ? '#67001f' :
            d == 1  ? '#b2182b' :
            d == 2  ? '#d6604d' :
            d == 3  ? '#f4a582' :
            d == 4  ? '#fddbc7' :
            d == 5  ? '#d1e5f0' :
            d == 6  ? '#92c5de' :
            d == 7  ? '#4393c3' :
            d == 8  ? '#2166ac' :
            d == 9 ? '#053061' :
           //if none
                      '#FFFFFF';
}


function style(feature) {
    return {
        fillColor: getColor(feature.properties.q),
        weight: .5,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}