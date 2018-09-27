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

    Window.mapController = mapController;

    deferred.done(function(data) {

        var mapController = new MapController(map, worldMapLayer, ID_CONTAINER);

        mapController = new MapController(map, ID_CONTAINER);

        //Instance the WorldMap layer throught geoserver
        var worldMapLayer = L.geoJson(data, {onEachFeature: $.proxy(onSelectedCounty, this, mapController)}).addTo(map);

    });

    deferred.fail(function(err) {
        alert("Error loading the map");
    });
}

function onSelectedCounty(mapController, feature, layer) {
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

            mapController.map.fitBounds(newCoordinates);

            //Get the information of country date places
            mapController.cache.getcountryDancePlaces(mapController.selectCountry.properties.adm0_a3)

            .done($.proxy(paintCountryPlacesOnMap, this, mapController))
            .fail($.proxy(paintErrorCountryPlacesOnMap, this, mapController));
        }
    });
}

function paintCountryPlacesOnMap(mapController, trainingPlaces)
{
    var trainingPlacesMarkers = [];

    for(var i = 0; i < trainingPlaces.length; i++)
    {
        if(trainingPlaces[i].coordinates != null)
        {
            trainingPlacesMarkers.push(L.marker([trainingPlaces[i].coordinates.lan,
                                                 trainingPlaces[i].coordinates.lon]));
        }

    }

    if(mapController.trainingPlacesLayer != null)
    {
        mapController.map.removeLayer(mapController.trainingPlacesLayer);
    }

    mapController.trainingPlacesLayer = L.layerGroup(trainingPlacesMarkers);
    mapController.trainingPlacesLayer.addTo(mapController.map);

}

function paintErrorCountryPlacesOnMap(mapController, err)
{
    alert("Error Getting the information of training places");
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