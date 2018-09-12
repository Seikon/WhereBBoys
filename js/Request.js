function Request(serverUrl)
{
    this.serverUrl = serverUrl;
}

Request.prototype.getGeoJSONWorldMap = function()
{
    return $.ajax({
        dataType: "json",
        url: this.serverUrl + "/geoserver/worldmap",
    });
}