/**
 * Created by stephane on 14/03/2017.
 */

const elm = React.createElement;


var Api = React.createClass({

    /*getDefaultProps: function () {
        return {
            osmUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            mapBoxAttr: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ',
            id: 'mapid',
            popupsLayer: new L.LayerGroup(),
            streets: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                id: 'mapbox.streets',
                attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
            }),
            map: L.map('mapid', {
                center: [48.856614, 2.352222],
                zoom: 12,
                layers: [L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    id: 'mapbox.streets',
                    attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
                })]
            }),
        };
    },*/

    getInitialState: function () {
        return {
            city: "Paris",
            position: [48.856614, 2.352222],
            cities: null,
            stations: null,
            base: {
              "Streets": L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {id: 'mapbox.streets', attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '})
            },
            popup: null,
            map: L.map('mapid', {
                center: [48.856614, 2.352222],
                zoom: 12,
                layers: [L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    id: 'mapbox.streets',
                    attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
                })]
            }),
            popupsLayer: new L.LayerGroup()
        }
    },

    getCities: function () {

    },


    fillPopups: function (stations) {
        if (this.state.stations != null) {
            var that = this;
            stations.map(function (station) {
                L.marker([station.position.lat, station.position.lng]).bindPopup(station.toString()).addTo(that.state.popupsLayer);
            });
            this.setState({popup: { "Stations": this.state.popupsLayer}});
            console.log(this.state.popup);
            L.control.layers(this.state.base, this.state.popup).addTo(this.state.map);
        }
    },

    componentDidMount: function () {
        this.refresh();
    },

    refresh: function() {
        var that = this;
        $.get("http://localhost:9000/test", function (data, status, xhr) {
            if (xhr.status == 200 && data != null) {
                var s = new Stations(data);
                that.setState({stations: s.stations});
                that.fillPopups(that.state.stations);
            }
        });
    },

    render: function () {
        return elm('div', {id: this.props.id}, null);
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
    elm(Api, {
        osmUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        mapBoxAttr: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ',
        id: 'mapid'
    }, null),
    document.getElementById('container')
);