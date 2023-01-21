$('#btnRun1_VAr').click(function() {

	$.ajax({
		url: "libs/php/getTimezoneInformation.php",
		type: 'POST',
		dataType: 'json',
		data: {
			lat1: $('#selLat1_VAr').val(),
			long1: $('#selLong1_VAr').val()
		},
		success: function(result) {

			console.log(result);

			if (result.status.name == "ok") {

				$('#txtCountry1_VAr').html(result['data']['countryName']);
				$('#txtLatitude1_VAr').html(result['data']['lat']);
				$('#txtLongitude1_VAr').html(result['data']['lng']);
				$('#txtTimezone1_VAr').html(result['data']['timezoneId']);

			}
		
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// your error code
		}
	}); 


});

$('#btnRun2_VAr').click(function() {

	$.ajax({
		url: "libs/php/getOceanInformation.php",
		type: 'POST',
		dataType: 'json',
		data: {
			lat2: $('#selLat2_VAr').val(),
			long2: $('#selLong2_VAr').val()
		},
		success: function(result) {

			console.log(result);

			if (result.status.name == "ok") {

				$('#txtOcean_VAr').html(result['data']['ocean']['name']);
				$('#txtNameId_VAr').html(result['data']['ocean']['geonameId']);

			}
		
		},
		error: function(jqXHR, textStatus, errorThrown) {
	
		}
	}); 


});

$('#btnRun3_VAr').click(function() {

	$.ajax({
		url: "libs/php/getCityInformation.php",
		type: 'POST',
		dataType: 'json',
		data: {
			city: $('#selCity_VAr').val()
		},
		success: function(result) {

			console.log(result);

			if (result.status.name == "ok") {

				$('#txtCity_VAr').html(result['data']['geonames'][0]['title']);
				$('#txtCountry2_VAr').html(result['data']['geonames'][0]['countryCode']);
				$('#txtSummary_VAr').html(result['data']['geonames'][0]['summary']);


			}
		
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// your error code
		}
	}); 


});