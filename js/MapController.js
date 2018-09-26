function MapController(map, worldMapLayer, containerId)
{
    this.map = map;
    this.worldMapLayer = worldMapLayer;
    this.containerId = containerId;
    this.selectedCountry;
    this.polygonCountry;
    this.cache = new Cache();
}