var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10', // replace this with your style URL
  center: [15.6355, 60.6065], // center of a map on first render
  zoom: 4.1,
  mapboxgl: mapboxgl
});


// add SEarch bar on a map
map.addControl(new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
  
}))

map.on('load', function() {
  // Add new source from our GeoJSON data and set the 'cluster option to true
  // GL-JS will add the point_count prop to our source data
  map.addSource('posts', {
    type: 'geojson',
    data: posts, // our source data
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to our cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points(def: 50)
  });
  //
  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "posts", // we created with addSource, above
    filter: ["has", "point_count"],
    paint: {
    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    // with three steps to implement three types of circles:
    //   * Blue, 20px circles when point count is less than 100
    //   * Yellow, 30px circles when point count is between 100 and 750
    //   * Pink, 40px circles when point count is greater than or equal to 750
    "circle-color": [
    "step",
    ["get", "point_count"],
    "#51bbd6",
    100,
    "#f1f075",
    750,
    "#f28cb1"
    ],
    "circle-radius": [
    "step",
    ["get", "point_count"],
    20,
    100,
    30,
    750,
    40
    ]
    }
    });

    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "posts",
      filter: ["has", "point_count"],
      layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12
      }
      });
    
    //
    map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "posts",
      filter: ["!", ["has", "point_count"]],
      paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff"
      }
      });
    // inspect a cluster on click
    map.on('click', 'clusters', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
      var clusterId = features[0].properties.cluster_id;
      map.getSource('posts').getClusterExpansionZoom(clusterId, function (err, zoom) {
      if (err) return;
      
      map.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom
      });
    });
    });

    // inspect a cluster on click
    map.on('click', 'unclustered-point', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });
      console.log('features:', features)
      var description = features[0].properties.description;
      console.log('description:', description)
    //   map.getSource('posts').getClusterExpansionZoom(clusterId, function (err, zoom) {
      
    // });
    var feature = features[0];
    var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(`<p>${description}</p>`)
        .addTo(map);

    });
   

    map.on('mouseenter', 'clusters', function () {
      map.getCanvas().style.cursor = 'pointer';
      });
    map.on('mouseleave', 'clusters', function () {
      map.getCanvas().style.cursor = '';
    });
  
    //mouse pointer for unclustered
    map.on('mouseenter', 'unclustered-point', function () {
      map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'unclustered-point', function () {
      map.getCanvas().style.cursor = '';
      });

});