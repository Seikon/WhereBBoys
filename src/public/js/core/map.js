var mapControllerGlobal;
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


    deferred.done(function(data) {

        var mapController = new MapController(map, worldMapLayer, ID_CONTAINER);

        mapControllerGlobal = mapController;

        mapControllerGlobal = new MapController(map, ID_CONTAINER);
        mapControllerGlobal.trainingPlacesLayer = new L.LayerGroup();

        //Instance the WorldMap layer throught geoserver
        var worldMapLayer = L.geoJson(data, {style: {"color": "#dcbe37"}, onEachFeature: selectCounty}).addTo(map);
        //Instance Training places layer
        mapControllerGlobal.trainingPlacesLayer.addTo(map);

    });

    deferred.fail(function(err) {
        alert("Error loading the map");
    });
}

function selectCounty( feature, layer) {
    layer.on({
        //When users click on a country, we will make zoom on the selection
        click: function(e) 
        {
            if(mapControllerGlobal.currentState != STATE.ADD)
            {
                var selectedFeature = e.target.feature;

                mapControllerGlobal.selectCountry = e.target.feature;
    
                var newCoordinates = reverseCoordinates(mapControllerGlobal.selectCountry.geometry.coordinates);
                
                if(mapControllerGlobal.polygonCountry)
                {
                    mapControllerGlobal.map.removeLayer(mapControllerGlobal.polygonCountry);
                }
    
                mapControllerGlobal.polygonCountry = L.polygon(newCoordinates, {color: "red"})
                                               .addTo(mapControllerGlobal.map)
                                               .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
                                               //.openPopup();
    
                //mapController.map.setView(centroid.geometry.coordinates);
                mapControllerGlobal.map.flyToBounds(newCoordinates, {animate: true, duration: 0.5});
    
                //Remove previous markers
                mapControllerGlobal.map.removeLayer(mapControllerGlobal.trainingPlacesLayer);
    
                mapControllerGlobal.map.once('moveend', function() {
                //Show training places
                mapControllerGlobal.showTrainingPlaces(mapControllerGlobal);
                //Display ToolBox
                mapControllerGlobal.displayToolBox();
                mapControllerGlobal.changeState(STATE.COUNTRY_SELECTED);
                });
            } 
        }
    });
}

function showAddPlaceTool()
{
    mapControllerGlobal.changeState(STATE.ADD);
    mapControllerGlobal.hideToolBox(mapControllerGlobal.displayAddTool);
}

function cancelAdd()
{
    mapControllerGlobal.changeState(STATE.COUNTRY_SELECTED);
    mapControllerGlobal.hideAddTool(mapControllerGlobal.displayToolBox);
    clearForm();
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

function clearForm()
{
    const fields = getFields();

    for(let field in fields)
    {
        fields[field][0].value = "";
    }
}

function changeEventType(element)
{
    switch(parseInt(element.value))
    {
        case EVENT_TYPE.OCASIONAL:
        break;

        case EVENT_TYPE.SCHEDULED:
        break;
    }
}

function getFields() {

    const fields = ["name", "surname", "email", "telephone", 
                    "insta", "facebook", "aka", "crew",
                    "longitude", "latitude", "address"];

    let formData = {};

    for(let indField = 0; indField < fields.length; indField++)
    {
        formData[fields[indField]] = document.getElementsByName(fields[indField]);
    }

    return formData;

}