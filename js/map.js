var mapController;
var ID_CONTAINER = "mapContainer";

$(document).ready(function(){

    initMap();
});

function initMap()
{
    var map = L.map(ID_CONTAINER).setView([46.316584, 29.882813], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var worldMapRequest = new Request(SERVER_URL);

    var deferred = worldMapRequest.getGeoJSONWorldMap();

    deferred.done(function(data) {

        //Instance the WorldMap layer throught geoserver
        var worldMapLayer = L.geoJson(data, {onEachFeature: onEachFeature}).addTo(map);

        var mapController = new MapController(map, worldMapLayer, ID_CONTAINER);

        mapController = new MapController(map, ID_CONTAINER);

    });

    deferred.fail(function(err) {

    });
}

function onEachFeature(feature, layer) {
    layer.on({
        click: function(e){ alert(e.target.feature.properties.adm0_a3);}
    });
}