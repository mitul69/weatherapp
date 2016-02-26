define(function () {
    return {
        getLocation: function () {
			if(navigator.geolocation){
				this.getCurrentLocation();
			}
			else 
			{
				this.locationNotFound();
			}
        },
		getCurrentLocation:function (){
				var currentObjct = this;
				navigator.geolocation.getCurrentPosition(function(position) {
					currentObjct.getWeatheByPositon(position);					
				}, function() {
					currentObjct.locationNotFound();
				});
		},
		getWeatheByPositon: function(position){
			var currentObjct = this;
			var geocoder = new google.maps.Geocoder;
			var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
			geocoder.geocode({'location': latlng}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
				  if (results[1]) {
					address = results[1].formatted_address;
					currentObjct.getWeatherByLocationName(address);
				  } else {
					currentObjct.locationNotFound();
				  }
				} else {
				  currentObjct.locationNotFound();
				}
			});
		},	
		getWeatherByLocationName: function(locationName){
			$("#locatioName").html(locationName);
			var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&appid=44db6a862fba0b067b1930da0d769e98";
			
			$.getJSON( weatherUrl, function( weatherInfo ) {
			  debugger;
			  if( weatherInfo.main ){
				$("#humidity").html(weatherInfo.main.humidity);
				$("#pressure").html(weatherInfo.main.pressure);
				$("#temp").html(weatherInfo.main.temp);
				$("#temp_max").html(weatherInfo.main.temp_max);
				$("#temp_min").html(weatherInfo.main.temp_min);
				$("#visibility").html(weatherInfo.visibility);
			  }
			}); 
		}, 
		locationNotFound : function(){
			$("#locatioInput").show();
			autocomplete = new google.maps.places.Autocomplete(
				(document.getElementById('locationName')),
				{types: ['geocode']}
			);
			var currentObject = this;
			autocomplete.addListener('place_changed', function(){
				var place = autocomplete.getPlace();
				var locationName = place.formatted_address;
				currentObject.getWeatherByLocationName(locationName);
			});
		}
    };
});