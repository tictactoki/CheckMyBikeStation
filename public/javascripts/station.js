/**
 * Created by stephane on 14/03/2017.
 */
var Position = function (lat, lng) {
    this.lat = lat;
    this.lng = lng;
};

const ParisPosition = new Position(48.856614, 2.352222);

const Map = function (id, pos) {
    this.osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    this.mapBoxAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ';
    this.map = L.map(id, {
        center: [pos.lat, pos.lng],
        zoom: 12,
        layers: [L.tileLayer(this.osmUrl, {
            id: 'mapbox.streets',
            attributions: this.mapBoxAttr
        })]
    });
};

var map = new Map('mapid', ParisPosition);
const elm = React.createElement;


const Api = React.createClass({


    getInitialState: function () {
        return {
            city: "Paris",
            position: [48.856614, 2.352222],
            cities: {},
            select: [],
            stations: null,
            base: {
                "Streets": L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    id: 'mapbox.streets',
                    attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
                })
            },
            popup: null,
            popupsLayer: [new L.LayerGroup()]
        }
    },

    getCities: function () {
        var that = this;
        $.get("http://localhost:9000/cities", function (data, status, xhr) {
            if (xhr.status == 200 && data != null) {
                var map = {};
                var keys = [];
                data.forEach(function (city) {
                    keys.push({name: city.name, code: city.code});
                    map[city.name] = {lat: city.lat, lng: city.lng};
                });
                that.setState({cities: map, select: keys});
            }
        });
    },


    fillPopups: function (stations) {
        if (this.state.stations != null) {
            var that = this;
            stations.map(function (station) {
                L.marker([station.position.lat, station.position.lng]).bindPopup(station.toString()).addTo(that.state.popupsLayer[0]);
            });
            this.setState({popup: {"Stations": this.state.popupsLayer[0]}});
            L.control.layers(this.state.base, this.state.popup).addTo(this.props.map);
        }
    },

    componentDidMount: function () {
        this.refresh();
        console.log(this.state.select);
    },

    componentWillMount: function () {
        this.getCities();
    },

    refresh: function () {
        var that = this;
        $.get("http://localhost:9000/test", function (data, status, xhr) {
            if (xhr.status == 200 && data != null) {
                var s = new Stations(data);
                that.setState({stations: s.stations});
                that.fillPopups(that.state.stations);
            }
        });
    },

    cityChange: function (event) {
        event.preventDefault();
        var city = this.state.cities[event.target.value];
        //console.log(this.state.cities);
        this.props.map.panTo(new L.LatLng(city.lat, city.lng));
    },

    render: function () {
        if (this.state.cities != null && this.state.select != null) {
            return (
                elm("div", null,
                    elm("select",{onChange:this.cityChange}, this.state.select.map(function (key) {
                        return elm("option", {value: key.name}, key.name + " " + key.code);
                        })
                    ))
            );
        }
        else {
            return (elm("div",null,null));
        }
    }
});


var Stations = function (stations) {
    this.stations = stations.map(function (station) {
        return new Station(station);
    });
}

var Station = function (apiStation) {
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

Station.prototype.toString = function () {
    return "<p>Name: " + this.name +
        "<br/>Address: " + this.address +
        "<br/>Banking: " + this.banking +
        "<br/>Bike stands: " + this.bike_stands +
        "<br/>Available bike stands: " + this.available_bike_stands +
        "<br/>Available bikes: " + this.available_bikes +
        "<br/>Last update: " + new Date(this.last_update) + "</p>";
};

ReactDOM.render(
    elm(Api, {map: map.map}, null),
    document.getElementById('container')
);