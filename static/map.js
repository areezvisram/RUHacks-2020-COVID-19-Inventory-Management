let markers = []
let heat_points = []
let map
let heat_map

function initMap()
{

	let loc = {"lat": 42.83, "lng": -79.12}
	let map_data = {
		zoom:15,
		center: loc
	}

	if (navigator.geolocation)
	{
		console.log("geo")
		navigator.geolocation.getCurrentPosition(function(pos) { // if they allow location on broswer
			map_data.center.lat = pos.coords.latitude;
			map_data.center.lng = pos.coords.longitude;
			// console.log(pos.coords.latitude)
			// console.log(loc)
			map = new google.maps.Map(document.getElementById("map"), map_data)
			set_pins(map)
			set_heat_points(map)
		}, function() { // they dont allow location on browser
			map = new google.maps.Map(document.getElementById("map"), map_data)	
			set_pins(map)
			set_heat_points(map)
		})
	}
	else
	{
		console.log("no geo")
		map = new google.maps.Map(document.getElementById("map"), map_data)
		set_pins(map)
		set_heat_points(map)
		// let marker = new google.maps.Marker({position: loc, map: map})
		

	}

	
	console.log(stock)
	console.log(needed)

}

console.log("loaded init function")

function set_pins(map)
{
	for (let point of stock)
	{
		let loc = {lat:point.location.lat, lng:point.location.long}

		markers.push(new google.maps.Marker({
			position: loc,
			map:map
		}))
	}
}

function set_heat_points(map)
{
	for (let point of needed)
	{
		let loc = {lat:point.location.lat, lng:point.location.long}

		heat_points.push(new google.maps.LatLng(loc.lat,loc.lng))
	}

	heat_map = new google.maps.visualization.HeatmapLayer({data:heat_points})
	heat_map.setMap(map)
}