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
        var group = new L.LayerGroup();
        var button = elm("button", {value: "refresh", onClick:this.refreshButton}, "Refresh");
        return {
            button: button,
            city: "Paris",
            //position: [48.856614, 2.352222],
            cities: {},
            select: [],
            stations: null,
            base: {
                "Streets": L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    id: 'mapbox.streets',
                    attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
                })
            },
            markers: {},
            popupsLayer: group,
            popup: { "Stations": group}
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
            this.state.popupsLayer.clearLayers();
            stations.map(function (station) {
                L.marker([station.position.lat, station.position.lng]).bindPopup(station.toString()).addTo(that.state.popupsLayer);
            });
            this.forceUpdate();
        }
    },

    componentDidMount: function () {
        this.getCities();
        this.refresh(this.state.city);
        L.control.layers(this.state.base, this.state.popup).addTo(this.props.map);
    },

    refresh: function (city) {
        var that = this;
        $.get("http://localhost:9000/bikes?name=" + city, function (data, status, xhr) {
            if (xhr.status == 200 && data != null) {
                var s = new Stations(data);
                that.setState({city: city, stations: s.stations});
                that.fillPopups(that.state.stations);
            }
        });
    },

    cityChange: function (event) {
        event.preventDefault();
        var value = event.target.value;
        var city = this.state.cities[value];
        this.refresh(value);
        //console.log(this.state.cities);
        this.props.map.panTo(new L.LatLng(city.lat, city.lng));
    },

    refreshButton: function(event) {
        event.preventDefault();
        this.refresh(this.state.city);
    },

    render: function () {
        var that = this;
        //var button = elm("button", {value: "refresh", onClick:this.refresh(this.state.city)}, "Refresh");
        if (this.state.cities != null && this.state.select != null && this.state.button != null) {
            return (
                elm("div", null,
                    this.state.button,
                    elm("select",{onChange:this.cityChange}, this.state.select.map(function (key) {
                        if(key.name == that.state.city) {
                            return elm("option", {value: key.name ,selected: "selected"}, key.name + " " + key.code);
                        }
                        else return elm("option", {value: key.name}, key.name + " " + key.code);
                        })
                    )
                )
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
    return "<br/>Address: " + this.address +
        "<br/>Banking: " + this.banking +
        "<br/>Bike stands: " + this.bike_stands +
        "<br/>Available bike stands: " + this.available_bike_stands +
        "<br/>Available bikes: " + this.available_bikes +
        "<br/>Last update: " + new Date(this.last_update) + "</p>";
};

ReactDOM.render(
    elm(Api, {map: map.map, control: L.control}, null),
    document.getElementById('container')
);