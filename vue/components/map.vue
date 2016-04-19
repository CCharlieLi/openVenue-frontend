<template>
  <div>
    <nav id="menu">
      <a :class="{'active' : Contours}" @click.prevent.stop="ContoursShow">Contours</a>
      <a :class="{'active' : Museums}"  @click.prevent.stop="MuseumsShow">Museums</a>
      <select v-model="SelectedStyle">
        <option v-for="style in Styles" v-bind:value="style">
          {{ style }}
        </option>
      </select>
    </nav>
    <div id='map'></div>
  </div>
</template>

<script>
  import DataAPI from '../data/data';

  export default {
    name: 'MapView',
    data () {
      return {
        Contours: true,
        Museums: true,
        Map : Object,
        SelectedStyle: 'dark',
        Styles: ['basic', 'streets', 'emerald', 'bright', 'light', 'dark', 'satellite']
      };
    },
    watch: {
      'SelectedStyle' (val) {
        this.Map.setStyle('mapbox://styles/mapbox/' + val + '-v8');
      }
    },
    route: { },
    created () {},
    ready () {
      let source;
      this.Map = new DataAPI.MapBox.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v8',
        center: [-71.97722138410576, -13.517379300798098],
        zoom: 0
      });
      this.Map.on('load', () => {
        this.Map.addSource('museums', {
            type: 'vector',
            url: 'mapbox://mapbox.2opop9hr'
        });
        this.Map.addLayer({
            'id': 'museums',
            'type': 'circle',
            'source': 'museums',
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'circle-radius': 8,
                'circle-color': 'rgba(55,148,179,1)'
            },
            'source-layer': 'museum-cusco'
        });

        this.Map.addSource('contours', {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-terrain-v2'
        });
        this.Map.addLayer({
            'id': 'contours',
            'type': 'line',
            'source': 'contours',
            'source-layer': 'contour',
            'layout': {
                'visibility': 'visible',
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#877b59',
                'line-width': 1
            }
        });

        source = DataAPI.Source('https://wanderdrone.appspot.com/');
        this.Map.addSource('drone', source);
        this.Map.addLayer({
          "id": "drone",
          "type": "symbol",
          "source": "drone",
          "layout": {
            "icon-image": "rocket-15",
          }
        });
      });
      
      setInterval(() => {
        source.setData('https://wanderdrone.appspot.com/');
      }, 1000);
    },
    destroyed () {},
    methods: {
      ContoursShow () {
        this.Contours = !this.Contours;
        if (this.Contours)
          this.Map.setLayoutProperty('contours', 'visibility', 'visible');
        else
          this.Map.setLayoutProperty('contours', 'visibility', 'none');
      },
      MuseumsShow () {
        this.Museums = !this.Museums;
        if (this.Museums)
          this.Map.setLayoutProperty('museums', 'visibility', 'visible');
        else
          this.Map.setLayoutProperty('museums', 'visibility', 'none');
      }
    },
    filters: {}
  }
</script>

<style type="text/css">
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