
function Cache()
{
    //these structures store the data local on  user demands
    //it will be refreshed when user reload the page
    this.countryDancePlaces = {}; // {'ES': {places: []}
                                 //   'EN': {places: []} }
}

Cache.countryKey = 

Cache.prototype.getTrainingPlaces = function(countryKey)
{
    var deferredRequest;
    var deferredData;

    deferredData = $.Deferred();

    if(this.countryDancePlaces[countryKey] == null)
    {
        var request = new Request(SERVER_URL);

        deferredRequest = request.getTrainingPlaces(countryKey);

        //Send request when the information is not cached
        deferredRequest.done($.proxy(this.onCountryDPCompleted, this, countryKey, deferredData));
        deferredRequest.fail($.proxy(this.onCountryDPFailed, this, countryKey, deferredData));
    }
    else
    {
        deferredData.resolve(this.countryDancePlaces[countryKey].places);
    }

    return deferredData;
}
Cache.prototype.onCountryDPCompleted = function(countryKey, deferredData, data)
{
    this.countryDancePlaces[countryKey] = {};
    this.countryDancePlaces[countryKey].places = data;

    deferredData.resolve(data);
}
Cache.prototype.onCountryDPFailed = function(err)
{
    deferredData.reject(err);
}