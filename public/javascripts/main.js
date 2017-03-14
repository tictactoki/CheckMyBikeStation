


/*L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGljdGFjdG9raSIsImEiOiJjajA4Ym1wamIwMDFpMnFucjJrbWpod3FwIn0.tLoLo9-_hMaQAu--GvVd6A', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);*/

var mapUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGljdGFjdG9raSIsImEiOiJjajA4Ym1wamIwMDFpMnFucjJrbWpod3FwIn0.tLoLo9-_hMaQAu--GvVd6A';
var osm = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
var mapBoxAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ';
    //'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    //'Imagery © <a href="http://mapbox.com">Mapbox</a>'

var popup = new L.LayerGroup();

var Data = function(number,name) {
    this.number = number;
    this.name = name;
};

Data.prototype.toString = function() {
    return "number: " + this.number + "\n" + "name: " + this.name;
}

var data = new Data(12,"blabla");

var streets = L.tileLayer(osm, {id: 'mapbox.streets', attributions: mapBoxAttr});
var mymap = L.map('mapid',{
  center: [48.856614, 2.352222],
    zoom: 12,
    layers: [streets]
});

var base = {
    "Streets": streets
};

var pops = {
    "Stations": popup
};

L.marker([48.856614, 2.352222]).bindPopup(data.toString()).addTo(popup);

L.control.layers(base, pops).addTo(mymap);