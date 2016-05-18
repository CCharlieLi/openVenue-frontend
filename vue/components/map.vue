<template>
  <div>
   <!--  <nav id='menu'>
      <a :class='{'active' : Contours}' @click.prevent.stop='ContoursShow'>Contours</a>
      <a :class='{'active' : Museums}'  @click.prevent.stop='MuseumsShow'>Museums</a>
    </nav> -->
    <div id='map'></div>
  </div>
</template>

<script>
  import DataAPI from '../data/data';

  export default {
    name: 'MapView',
    data () {
      return {
        Map : Object.create(null),
        Markers: {
          'type': 'FeatureCollection',
          'features': [{
            'type': 'Feature',
            'properties': {
              'description': '<div class="marker-title">Make it Mount Pleasant</div><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
              'marker-symbol': 'theatre'
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [121.4691603379, 31.2223104171]
            }
          }]
        }
      };
    },
    watch: {

    },
    route: { },
    created () {},
    ready () {
      let source;
      this.Map = new DataAPI.MapBox.Map({
        container: 'map',
        style: 'mapbox://styles/ccharlieli/cio8phh7x001sadnmu988hd91',
        center: [121.4691603379, 31.2223104171],
        zoom: 13
      });

      this.Map.on('load', () => {
        // Add marker data as a new GeoJSON source.
        this.Map.addSource('markers', {
            'type': 'geojson',
            'data': this.Markers,
            'cluster': true,
            'clusterRadius': 50
        });
        // Add a layer showing the markers.
        this.Map.addLayer({
            'id': 'markers',
            'type': 'symbol',
            'source': 'markers',
            'layout': {
                'icon-image': '{marker-symbol}-15',
                'icon-allow-overlap': true
            }
        });
      });

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
    methods: {},
    filters: {}
  }
</script>

<style type='text/css'>
  #map { position:fixed; top:0px; bottom:0px; width:100%;  }

  #menu {
      background: #fff;
      position: absolute;
      z-index: 10;
      top: 80px;
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
</style>