mapboxgl.accessToken = 'pk.eyJ1IjoibWljb2JlciIsImEiOiJjanh1eXR0MjIwNXFjM2JtbWJxcWQ2M3VkIn0.K_rMfcqGk7UKfRobYnFZ7Q';
      
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: post.coordinates,
  zoom: 5
});

// add markers to map
// create a HTML element post location/marker
var el = document.createElement('div');
el.className = 'marker';

// make a marker for our location and add to the map
new mapboxgl.Marker(el)
  .setLngLat(post.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
  .addTo(map);

//Toggle Edit review form
let toggleFormButton = document.querySelectorAll(".toggle-edit-form");

toggleFormButton.forEach(function(btn) {
  btn.addEventListener("click", function(evt){
    // console.log(evt.target.innerText)
    evt.target.innerText === 'Edit'? evt.target.innerText = 'Cancel': evt.target.innerText='Edit'
    //toggle visibility of the edit form
    // console.log(evt.target.nextElementSibling)
    evt.target.nextElementSibling.classList.toggle('edit-review-form')
  })
})

//Add click listener for clearing rating on edit/new form
let clearButtons = document.querySelectorAll(".clear-rating");

clearButtons.forEach(function(btn){
  btn.addEventListener("click", function(evt){
    this.nextElementSibling.click();
  })
})