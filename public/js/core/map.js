var mapController;
var ID_CONTAINER = "mapContainer";

$(document).ready(function(){

    initMap();
});

function initMap()
{
    var map = L.map(ID_CONTAINER).setView([46.316584, 29.882813], 2);
    map.options.minZoom = 3;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var worldMapRequest = new Request(SERVER_URL);

    var deferred = worldMapRequest.getGeoJSONWorldMap();

    Window.mapController = mapController;

    deferred.done(function(data) {

        var mapController = new MapController(map, worldMapLayer, ID_CONTAINER);

        mapController = new MapController(map, ID_CONTAINER);
        mapController.trainingPlacesLayer = new L.LayerGroup();

        //Instance the WorldMap layer throught geoserver
        var worldMapLayer = L.geoJson(data, {style: {"color": "#dcbe37"}, onEachFeature: $.proxy(selectCounty, this, mapController)}).addTo(map);
        //Instance Training places layer
        mapController.trainingPlacesLayer.addTo(map);

    });

    deferred.fail(function(err) {
        alert("Error loading the map");
    });
}

function selectCounty(mapController, feature, layer) {
    layer.on({
        //When users click on a country, we will make zoom on the selection
        click: function(e) 
        { 
            var selectedFeature = e.target.feature;

            mapController.selectCountry = e.target.feature;

            var newCoordinates = reverseCoordinates(mapController.selectCountry.geometry.coordinates);
            
            if(mapController.polygonCountry)
            {
                mapController.map.removeLayer(mapController.polygonCountry);
            }

            mapController.polygonCountry = L.polygon(newCoordinates, {color: "red"}).addTo(mapController.map);

            //mapController.map.setView(centroid.geometry.coordinates);
            mapController.map.flyToBounds(newCoordinates, {animate: true, duration: 0.5});

            //Remove previous markers
            mapController.map.removeLayer(mapController.trainingPlacesLayer);

            mapController.map.once('moveend', function() {
                //Show training places
                mapController.showTrainingPlaces(mapController);
                //Display ToolBox
                mapController.displayToolBox();
            });


        }
    });
}

function selectMode(mapController, parameter)
{    
}



function reverseCoordinates(coordinates)
{
    var returnedCoordinates = [];

    for(var i = 0; i < coordinates.length; i++)
    {
        if(coordinates.length == 1)
        {
            returnedCoordinates.push([]);

            for(var j = 0; j < coordinates[i].length; j++)
            {
                returnedCoordinates[i].push([coordinates[i][j][1], coordinates[i][j][0]]);
            }
        }
        else
        {
            returnedCoordinates.push([]);

            for(var j = 0; j < coordinates[i][0].length; j++)
            {
                returnedCoordinates[i].push([coordinates[i][0][j][1], coordinates[i][0][j][0]]);
            }
        }
    }

    return returnedCoordinates;
}