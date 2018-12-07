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
        mapController.trainingPlacesLayer = new L.LayerGroup();

        //Instance the WorldMap layer throught geoserver
        var worldMapLayer = L.geoJson(data, {onEachFeature: $.proxy(selectCounty, this, mapController)}).addTo(map);
        //Instance Training places layer
        mapController.trainingPlacesLayer.addTo(map);
        //Show the first step that user has to make
        $("#" + ID_FIRST_STEP).css('display', 'inline');

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
            mapController.map.fitBounds(newCoordinates);
            
            //alert(.properties.adm0_a3);

            //Show the second step that user has to make
            $("#" + ID_SECOND_STEP).css('display', 'inline');
            //Show all the options
            $("#" + ID_OPTION_SEARCH).unbind("click");
            $("#" + ID_OPTION_ADD).unbind("click");

            $("#" + ID_OPTION_SEARCH).click($.proxy(selectMode, this, mapController,INTERACTION_MODE.SEARCH));
            $("#" + ID_OPTION_ADD).click($.proxy(selectMode, this, mapController,INTERACTION_MODE.ADD));
        }
    });
}

function selectMode(mapController, parameter)
{
    //Show step three
    $("#" + ID_THIRD_STEP).css('display', 'inline');
    //Show training places
    showTrainingPlaces(mapController);
    
}

function showTrainingPlaces(mapController)
{
    var trainingPlacesRequest = new Request(SERVER_URL);

    var deferred = trainingPlacesRequest.getTrainingPlaces(mapController.selectCountry.properties.wb_a2);
    mapController.map.removeLayer(mapController.trainingPlacesLayer);
    mapController.trainingPlacesLayer = new L.LayerGroup();
    mapController.trainingPlacesLayer.addTo(mapController.map);
    deferred.done(function(trainingPlaces)
    {

        for(let i = 0; i < trainingPlaces.length; i++)
        {
            mapController.trainingPlacesLayer.addLayer(L.marker([trainingPlaces[i].coordinates.lat,
                                                                 trainingPlaces[i].coordinates.lon]));
        }
    });

    deferred.fail(function()
    {
        alert("Error showing training places for this country");
    });
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