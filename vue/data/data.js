import mapboxgl from 'mapbox-gl';
import Promise from 'bluebird';

let DataAPI = Object.create(null);
//mapboxgl.accessToken = 'sk.eyJ1IjoiY2NoYXJsaWVsaSIsImEiOiJjaW4yeGZ1bTQwYnU0dmhtNGw3cmMydXV4In0.uNjLygXz-J3nCA714HTRig';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2NoYXJsaWVsaSIsImEiOiJjaW4wMmR0ZXkwNnM0dXBra2tlN2hncmN0In0.yyZJ5tdX4SfGZg8teA_3IA'


DataAPI.MapBox = mapboxgl;
DataAPI.Source = url => {
  return new mapboxgl.GeoJSONSource({
    data: url
  });
}

export default DataAPI;