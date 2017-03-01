console.log(tablaDeDatos)
var geojson;


//Coropleth function
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

//Style function that takes the Coropleth 
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

//Highlight on over
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

//Zoom on click
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Census Block Information</h4>' +  (props ?
        '<b> Block ID: </b>' + props.REDCODE + '<br />' + 
        '<b> Comune: </b>' + props.Comune + '<br />' + 
        '<b> % of Head of household with college education: </b>' + props.University  + '<br />' +
        '<b> Quantile: </b>' + props.q  + '<br />'
        : 'Hover over a state');
};


// create map
geojson = L.geoJson(tablaDeDatos,{
    style: style,
    onEachFeature: onEachFeature
})
geojson.addTo(map);
info.addTo(map);


