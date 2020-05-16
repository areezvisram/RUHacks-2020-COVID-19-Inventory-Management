function initMap()
{
	let map

	let loc = {"lat": 42.83, "lng": -79.12}
	let map_data = {
		zoom:15,
		center: loc
	}

	if (navigator.geolocation)
	{
		console.log("geo")
		navigator.geolocation.getCurrentPosition(function(pos) {
			map_data["center"]["lat"] = pos.coords.latitude;
			map_data["center"]["lng"] = pos.coords.longitude;
			console.log(pos.coords.latitude)
			console.log(loc)
			map = new google.maps.Map(document.getElementById("map"), map_data)
		})
	}
	else
	{
		console.log("no geo")
		map = new google.maps.Map(document.getElementById("map"), map_data)
		// let marker = new google.maps.Marker({position: loc, map: map})
		

	}
}

console.log("loaded init function")
// console.log(global_var)