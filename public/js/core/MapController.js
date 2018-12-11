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
    var deferred = this.cache.getTrainingPlaces(this.selectCountry.properties.wb_a2);
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
                                                    trainingPlaces[i].coordinates.lon])
                                                    .bindPopup(this.getPopUp(trainingPlaces[i]))
                                                    .on("click", $.proxy(this.showTrainingPlaceDetails, this)));
    }
}

MapController.prototype.getPopUp = function(trainingPlace)
{
    return "<h3 class='h4 has-line'>Lugar de entrenamiento</h3>" +
    "<div class='row'>" +
        "<div class='col-lg-12'><b style='color: white;'>+ Dónde</b></div>" +
    "</div>" +
    "<div class='row'>" +
        "<div class='col-lg-12'><b style='color: #fc4103;'>"+ trainingPlace.address +"</b></div>" +
    "</div>" +
    "<div class='row'>" +
        "<div class='col-lg-12'><b style='color: white;'>+ Cuándo</b></div>" +
    "</div>" +
    "<div class='row'>" +
        "<div class='col-lg-12'><b style='color: #fc4103;'>"+ trainingPlace.type +"</b></div>" +
    "</div>" +
    "<div class='row'>" +
        "<div class='col-lg-12'><b style='color: white;'>+ Contacto</b></div>" +
    "</div>" +
    "<div class='row'>" +
        "<div class='col-lg-12'><strong style='color: #fc4103;'><small style='color: white;'>- Nombre  </small> "+ trainingPlace.contactPerson.aka + "</strong></div>" +
        "<div class='col-lg-12'><strong style='color: #fc4103;'><small style='color: white;'>- Teléfono  </small> "+ trainingPlace.contactPerson.telefon + "</strong></div>" +
        "<div class='col-lg-12'><strong style='color: #fc4103;'><small style='color: white;'>- Email  </small> "+ trainingPlace.contactPerson.email + "</strong></div>" +
    "</div>";
}

MapController.prototype.showTrainingPlaceDetails = function(e)
{
    e.target.getPopup();
}

MapController.prototype.displayToolBox = function()
{
    if(!this.isToolBoxDisplayed)
    {
        this.isToolBoxDisplayed = true;
        $("#" + ID_TOOLBOX).show("slow");

    }
}