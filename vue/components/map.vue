<template>
  <div>
    <nav id="menu">
      <a :class="{'active' : addFlag}" @click.prevent.stop="onFlag">添加地点</a>
    </nav>
    <div id="map"></div>
    <div id="snackbar" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>
  </div>
</template>

<script>
  import DataAPI from '../data/data';
  import mdl from 'material-design-lite/material.js';
  import geo from 'gps-util';
  import auth from '../auth';
  let clickFlag = false;

  export default {
    name: 'MapView',
    data () {
      return {
        Map : Object.create(null),
        Markers: {
          type: 'FeatureCollection',
          features: []
        },
        Source: {
          setData () {}
        },
        geoHash: '',
        addFlag: false
      };
    },
    watch: {
      'Markers.features' () {
        this.Source.setData(this.Markers);
      }
    },
    route: { 
      data ({ to }) {
        clickFlag = false;
        this.getVenues();
      }
    },
    created () {},
    ready () {
      // MDL
      this.$nextTick(function(){
        componentHandler.upgradeAllRegistered();
      })

      if (!DataAPI.MapBox.supported()) {
        alert('Your browser does not support Mapbox GL');
      }

      // Map Source
      let source;
      this.Map = new DataAPI.MapBox.Map({
        container: 'map',
        style: 'mapbox://styles/ccharlieli/cio8phh7x001sadnmu988hd91',
        center: [121.4691603379, 31.2223104171],
        zoom: 13
      });

      this.Map.on('load', () => {
        this.Source = new DataAPI.MapBox.GeoJSONSource({
          data: this.Markers,
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });
        this.Map.addSource('markers', this.Source);
        this.Map.addLayer({
          'id': 'markers',
          'type': 'symbol',
          'source': 'markers',
          'layout': {
            'icon-image': '{marker-symbol}-15',
            'icon-allow-overlap': true
          }
        });

        let layers = [
          [150, '#f28cb1'],
          [20, '#f1f075'],
          [0, '#6ab344']
        ];
        layers.forEach((layer, i) => {
          this.Map.addLayer({
            "id": "cluster-" + i,
            "type": "circle",
            "source": "markers",
            "paint": {
              "circle-color": layer[1],
              "circle-radius": 18
            },
            "filter": i == 0 ?
              [">=", "point_count", layer[0]] :
              ["all",
                [">=", "point_count", layer[0]],
                ["<", "point_count", layers[i - 1][0]]]
          });
        });
        // Add a layer for the clusters' count labels
        this.Map.addLayer({
          "id": "cluster-count",
          "type": "symbol",
          "source": "markers",
          "layout": {
            "text-field": "{point_count}",
            "text-font": [
              "DIN Offc Pro Medium",
              "Arial Unicode MS Bold"
            ],
            "text-size": 12
          }
        });
      });

      this.Map.on('click', (e) => {
        if(this.addFlag) {
          if (clickFlag){
            this.Markers.features.pop();
          }
          this.geoHash = geo.geohashEncode(e.lngLat.lat, e.lngLat.lng, 7);
          this.Markers.features.push({
            'type': 'Feature',
            'properties': {
              'description': '<div class="demo-card-wide mdl-card mdl-shadow--2dp"><div class="mdl-card__title"><h2 class="mdl-card__title-text">[待完善]</h2></div><div class="mdl-card__supporting-text">[待完善]</div><div class="mdl-card__actions mdl-card--border"><a href="#!/venue/' + this.geoHash + '" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">详细信息</a></div><div class="mdl-card__menu"></div></div>',
              "marker-symbol": "star",
              "marker-size": "large",
              "marker-color": "#f44"
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [e.lngLat.lng, e.lngLat.lat]
            }
          });
          clickFlag = true;
        }
      });

      // Pop up
      var popup = new DataAPI.MapBox.Popup({
        closeButton: false,
        closeOnClick: false
      });
      this.Map.on('mousemove', (e) => {
        var features = this.Map.queryRenderedFeatures(e.point, { layers: ['markers'] });
        this.Map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
        if (!features.length) {
          popup.remove();
          return;
        }
        var feature = features[0];
        popup.setLngLat(feature.geometry.coordinates)
          .setHTML(feature.properties.description)
          .addTo(this.Map);
      });
    },
    destroyed () {},
    methods: {
      onDetail () {
        window.console.log(123);
      },
      popUp (msg) {
        let snackbarContainer = document.querySelector('#snackbar');
        let data = {message: msg};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
      },
      getVenues () {
        // Venue Source
        this.Markers.features = [];
        auth.findAllVenues(this).then((res) => {
          res.forEach((re) => {
            this.Markers.features.push({
              'type': 'Feature',
              'properties': {
                'description': '<div class="demo-card-wide mdl-card mdl-shadow--2dp"><div class="mdl-card__title"><h2 class="mdl-card__title-text">'+ re.venueName +'</h2></div><div class="mdl-card__supporting-text">'+ re.other +'</div><div class="mdl-card__actions mdl-card--border"><a href="#!/venue/' + re.geoHash + '" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">详细信息</a></div><div class="mdl-card__menu"></div></div>',
                "marker-symbol": "star",
                "marker-size": "large",
                "marker-color": "#f44"
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [re.coordinate.lng, re.coordinate.lat]
              }
            });
          });
        });
      },
      onFlag () {
        this.addFlag = !this.addFlag;
        if(!this.addFlag){
          clickFlag = false;
          this.getVenues();
        }
      }
    },
    filters: {}
  }
</script>

<style type='text/css'>
  #map { position:fixed; top:0px; bottom:0px; width:100%;  }

  #menu {
      background: #fff;
      position: absolute;
      z-index: 10;
      top: 10px;
      right: 10px;
      border-radius: 3px;
      width: 120px;
      border: 1px solid rgba(0,0,0,0.4);
      font-family: 'Open Sans', sans-serif;
  }

  #menu a,#menu select{
      font-size: 13px;
      color: #404040;
      display: block;
      margin: 0;
      padding: 0;
      padding: 10px;
      text-decoration: none;
      border-bottom: 1px solid rgba(0,0,0,0.25);
      text-align: center;
  }

  #menu a:last-child {
      border: none;
  }

  #menu a:hover {
      background-color: #f8f8f8;
      color: #404040;
  }

  #menu a.active {
      background-color: #3887be;
      color: #ffffff;
  }

  #menu a.active:hover {
      background: #3074a4;
  }

  .demo-card-wide.mdl-card {
    width: 312px;
  }
  .demo-card-wide > .mdl-card__title {
    color: #fff;
    height: 156px;
    background: url('../assets/welcome_card.jpg') center / cover;
  }
  .demo-card-wide > .mdl-card__menu {
    color: #fff;
  }
</style>