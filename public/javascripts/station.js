/**
 * Created by stephane on 14/03/2017.
 */

var Api = React.createClass({

    propTypes: {

    },

    getDefaultProps: function() {
        osmUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        mapBoxAttr: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ';
        id: 'mapid';
    },

    getInitialState: function() {
        return {
            city: "Paris",
            position: [48.856614, 2.352222],
            streets: L.tileLayer(this.props.osm, {id: 'mapbox.streets', attributions: this.props.mapBoxAttr}),
            map: null,
            cities: null,
            stations: null
        }
    },

    getCities: function() {

    },

    componentDidMount: function() {

    },

    render: function() {
        return ();
   }
});



/*var Station = function (apiStation) {
    this.number = apiStation.number;
    this.contract_name = apiStation.contract_name;
    this.name = apiStation.name;
    this.address = apiStation.address;
    this.position = apiStation.position;
    this.banking = apiStation.banking;
    this.bonus = apiStation.bonus;
    this.status = apiStation.status;
    this.bike_stands = apiStation.bike_stands;
    this.available_bike_stands = apiStation.available_bike_stands;
    this.available_bikes = apiStation.available_bikes;
    this.last_update = apiStation.last_update;
};

Station.prototype.toString = function() {
    return "Number: " + this.number +
        "\nName: " + this.name +
        "\nAddress: " + this.address +
        "\nBanking: " + this.banking +
        "\nBike stands: " + this.bike_stands +
        "\nAvailable bike stands: " + this.available_bike_stands +
        "\nAvailable bikes: " + this.available_bikes +
        "\nLast update: " + new Date(this.last_update);
};


var Api = function(){};

var Stations = function(stations) {
    this.stations = stations;
};

Api.prototype.updateStations = function(stations) {
  this.stations = stations;
};

Api.prototype.getBikesFromCity = function(city) {
    var that = this;
    $.get("http://localhost:9000/test", function(data,status,xhr) {
        if(xhr.status == 200 && data != null) {

            that.updateStations(data);
        }
        /*console.log(status);
        console.log(data);
    });
};

var api = new Api();

api.getBikesFromCity("");
console.log(api.stations);*/