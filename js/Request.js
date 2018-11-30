function Request(serverUrl)
{
    this.serverUrl = serverUrl;
}

Request.prototype.LOCAL_STORAGE_KEYS = {WORLD_MAP: "WORLD_MAP"};

Request.prototype.getGeoJSONWorldMap = function()
{
    var clientDeferred = $.Deferred();

    //Check if the information is available in the local store
    var worldMapData = this.getItemLocalStorage(this.LOCAL_STORAGE_KEYS.WORLD_MAP)

    //Acces the data online or by local storage
    if(worldMapData == null)
    {
        var request = $.ajax({
            dataType: "json",
            url: this.serverUrl + "/geoserver/worldmap",
            context: this
        });
    
        request.done(function(data) {
    
            //Save the data in the local storage with a key
            this.setItemLocalStorage(this.LOCAL_STORAGE_KEYS.WORLD_MAP, data);
            //Send the data to the requester
            clientDeferred.resolve(data);
        });
    
        request.fail(function(err) {

            clientDeferred.reject(err);
        });
    }
    else
    {
            clientDeferred.resolve(worldMapData);
    }

    return clientDeferred;
}

Request.prototype.getPlaces = function(countryKey) {

    var clientDeferred = $.Deferred();

    var request = $.ajax({
        dataType: "json",
        url: this.serverUrl + "/geoserver/sites/training/"+ countryKey,
        context: this
    });

    request.done(function(data) {

        clientDeferred.resolve(data);

    });

    request.fail(function(err) {

        clientDeferred.reject(err);
    });

    return clientDeferred;
}

Request.prototype.getItemLocalStorage = function(key) {

    try {

        return JSON.parse(window.localStorage.getItem(key));
        
    } catch (error) 
    {
        return null;    
    }

}

Request.prototype.setItemLocalStorage = function(key, object) {

    try {

        window.localStorage.setItem(key, JSON.stringify(object));

        return true;
        
    } catch (error) 
    {
        return false;    
    }

}