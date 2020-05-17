let markers = []
let heat_points = []
let heat_markers = []
let map
let heat_map

function initMap()
{

	let loc = {"lat": 42.83, "lng": -79.12}
	let map_data = {
		zoom:15,
		center: loc,
		styles: map_style,
		disableDefaultUI: true
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


	document.getElementById("change_heatmap").addEventListener("click", () => {
		heat_map.setMap(map)
		for (let marker of heat_markers)
		{
			marker["marker"].setMap(null)
		}
	})

	document.getElementById("change_markers").addEventListener("click", () => {
		heat_map.setMap(null)
		for (let marker of heat_markers)
		{
			marker["marker"].setMap(map)
		}
	})

	document.getElementById("instock").addEventListener("click", () => {
		for (let marker of markers)
		{
			marker["marker"].setMap( Boolean(marker["marker"].getMap()) ? null : map)
		}
	})

}

console.log("loaded init function")

function set_pins(map)
{
	for (let point of stock)
	{
		let loc = {lat:point.location.lat, lng:point.location.long}

		let info_str = "<p>" + point.location.address + "</p>"

		for (let item of point.stock)
		{
			info_str += "<p>" + item.name + " : " + String(item.amount) + "</p>"
		}

		markers.push({
			marker: new google.maps.Marker({
				position: loc,
				map:map,
				title: point.location.address

			}),
			info: new google.maps.InfoWindow({
				content: info_str
			})
		})

	}

	for (let point of markers)
	{
		point.marker.addListener("click", () => point.info.open(map, point.marker))
	}
}

function set_heat_points(map)
{


	for (let point of needed)
	{
		let loc = {lat:point.location.lat, lng:point.location.long}

		heat_points.push({
			location: new google.maps.LatLng(loc.lat,loc.lng),
			weight: point.weight
		})

		//start of heat point markers
		let info_str = "<p>" + point.location.address + "</p>"

		for (let item of point.needed)
		{
			info_str += "<p>" + item.name + " : " + String(item.amount) + "</p>"
		}

		heat_markers.push({
			marker: new google.maps.Marker({
				position: new google.maps.LatLng(loc.lat,loc.lng),
				map: map,
				title: point.location.address,
				icon: "../static/pictures/blue_Marker.png"
			}),
			info: new google.maps.InfoWindow({
				content: info_str
			})
		})

		for (let point of heat_markers)
		{
			point.marker.setMap(null)
			point.marker.addListener("click", () => point.info.open(map, point.marker))
		}

		//end of heat point markers
	}

	heat_map = new google.maps.visualization.HeatmapLayer({data:heat_points})
	heat_map.setMap(map)
}