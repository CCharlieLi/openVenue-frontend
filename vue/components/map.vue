<template>
  <div>
    <div id="map"></div>
    <a @click.prevent.stop="onFlag" target="_blank" id="add-venue" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--accent mdl-color-text--accent-contrast">添加地址</a>
    <pre id='output' class='ui-output'></pre>
  </div>
</template>

<script>
  import mdl from 'material-design-lite/material.js';
  import geo from 'gps-util';
  import auth from '../auth';

  export default {
    name: 'MapView',
    data () {
      return {
        Map : null,
        Markers: {
          type: 'FeatureCollection',
          features: []
        },
        VenuesLayer: L.mapbox.featureLayer(),
        GeoHash: '',
        AddFlag: false,
        Marker: null
      };
    },
    watch: {
      'Markers.features' () {
        this.VenuesLayer.setGeoJSON(this.Markers);
      }
    },
    route: { 
      data ({ to }) {
        this.AddFlag = false;
        if(this.Map && this.Marker) {
          this.Map.removeLayer(this.Marker);
          this.Marker = Object.create(null);
        }
        this.getVenues();
      }
    },
    created () {},
    ready () {
      // MDL
      this.$nextTick(function(){
        componentHandler.upgradeAllRegistered();
      });

      // Map Source
      let source;
      L.mapbox.accessToken = 'pk.eyJ1IjoiY2NoYXJsaWVsaSIsImEiOiJjaW4wMmR0ZXkwNnM0dXBra2tlN2hncmN0In0.yyZJ5tdX4SfGZg8teA_3IA';
      this.Map = L.mapbox.map('map', 'mapbox.streets').setView([31.2223104171, 121.4691603379], 13);
        
      // Add venues layer
      this.VenuesLayer.setGeoJSON(this.Markers)
      .on('click', (e) => {
        this.GeoHash = geo.geohashEncode(e.latlng.lat, e.latlng.lng, 18);
      })
      .addTo(this.Map);

      // Add geocoderControl
      var geocoderControl = L.mapbox.geocoderControl('mapbox.places');
      geocoderControl.addTo(this.Map);


      // Add Venue
      $('#map').on('click', '.trigger', () => {
        auth.redirectUrl('/venue/'+this.GeoHash);
      });
      this.Map.on('click', (e) => {
        this.GeoHash = geo.geohashEncode(e.latlng.lat, e.latlng.lng, 18);
        if(this.AddFlag) {
          this.Marker = L.marker(e.latlng, {
            icon: L.mapbox.marker.icon({
                'marker-color': '3887be'
            }),
            draggable: true
          })
          .bindPopup('<button class="trigger">添加信息</button>')
          .addTo(this.Map);
          this.AddFlag = false;
        }
      });
    },
    destroyed () {},
    methods: {
      getVenues () {
        // Venue Source
        this.Markers.features = [];
        auth.findAllVenues(this).then((res) => {
          res.forEach((re) => {
            this.Markers.features.push({
              'type': 'Feature',
              'properties': {
                'description': '<div class="demo-card-wide mdl-card mdl-shadow--2dp"><div class="mdl-card__title"><h2 class="mdl-card__title-text">'+ re.venueName +'</h2></div><div class="mdl-card__supporting-text">'+ re.other +'</div><div class="mdl-card__actions mdl-card--border"><button class="trigger mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">详细信息</button></div><div class="mdl-card__menu"></div></div>',
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
        this.AddFlag = !this.AddFlag;
        if(!this.AddFlag){
          this.getVenues();
        }
      }
    },
    filters: {}
  }
</script>

<style type='text/css'>
  #map { position:fixed; top:0px; bottom:0px; width:100%;  }

  .demo-card-wide.mdl-card {
    width: 280px;
  }
  .demo-card-wide > .mdl-card__title {
    color: #fff;
    height: 156px;
    background: url('../assets/welcome_card.jpg') center / cover;
  }
  .demo-card-wide > .mdl-card__menu {
    color: #fff;
  }

  #add-venue {
    position: fixed;
    display: block;
    right: 0;
    bottom: 0;
    margin-right: 40px;
    margin-bottom: 40px;
    z-index: 900;
  }
</style>