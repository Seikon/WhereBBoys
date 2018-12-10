function MapController(map, worldMapLayer, containerId)
{
    this.map = map;
    this.worldMapLayer = worldMapLayer;
    this.trainingPlacesLayer;
    this.containerId = containerId;
    this.selectedCountry;
    this.polygonCountry;
    this.cache = new Cache();
    this.isToolBoxDisplayed = false;
}

MapController.prototype.showTrainingPlaces = function()
{
    var trainingPlacesRequest = new Request(SERVER_URL);

    var deferred = trainingPlacesRequest.getTrainingPlaces(this.selectCountry.properties.wb_a2);
    this.map.removeLayer(this.trainingPlacesLayer);
    this.trainingPlacesLayer = new L.LayerGroup();
    this.trainingPlacesLayer.addTo(this.map);
    deferred.done($.proxy(function(trainingPlaces) 
    {
        this.renderTrainingPlaces(trainingPlaces);
        this.displayToolBox();

    }, this));

    deferred.fail(function()
    {
        alert("Error showing training places for this country");
    });
}

MapController.prototype.renderTrainingPlaces = function(trainingPlaces)
{
    for(let i = 0; i < trainingPlaces.length; i++)
    {
        this.trainingPlacesLayer.addLayer(L.marker([trainingPlaces[i].coordinates.lat,
                                                             trainingPlaces[i].coordinates.lon]));
    }
}

MapController.prototype.displayToolBox = function()
{
    if(!this.isToolBoxDisplayed)
    {
        this.isToolBoxDisplayed = true;
        $("#" + ID_TOOLBOX).show("slow");

    }
}