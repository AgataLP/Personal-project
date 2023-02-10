let currencyCode;
let border;
let groupMarkers;

//add commas
function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// preloader
$(document).ready(function ($) {
  var Body = $("body");
  Body.addClass("preloader-site");
});
$(window).on("load", function () {
  $(".preloader-wrapper").delay(2000).fadeOut(1000);
  $("body").removeClass("preloader-site");
});

// leaflet
var map = L.map("map").fitWorld();
map.locate({ setView: true, maxZoom: 7 });
var Esri_NatGeoWorldMap = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; OpenStreetMap",
    maxZoom: 12,
  }
).addTo(map);

function clearMap() {
  if (groupMarkers) {
    groupMarkers.clearLayers();
  }
  if (border) {
    border.clearLayers();
  }
}
// select
$(document).ready(function () {
  $.ajax({
    url: "php/select.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
        for (var i = 0; i < result.length; i++) {
          $("#selCountry").append(
            $("<option>", {
              value: result[i].iso,
              text: result[i].name,
            })
          );
      }
      $("#selCountry").html(
        $("#selCountry option").sort(function (a, b) {
          return a.text == b.text ? 0 : a.text < b.text ? -1 : 1;
        })
      );
    },
  });

  // user location
  const successCallback = (position) => {
    $.ajax({
      url: "php/openCage.php",
      type: "GET",
      dataType: "json",
      data: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },

      success: function (result) {
        console.log("user location", result);
        currentLat = result[0].geometry.lat;
        currentLng = result[0].geometry.lng;
        currentCountry = result[0].components["ISO_3166-1_alpha-2"];
        $("#selCountry").val(currentCountry).change();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      },
    });
  };

  const errorCallback = (error) => {
    console.log("error");
    $("#selCountry").val("AF").change();
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
});

// on change, border, api modals and markers
$("#selCountry").change(function () {
  clearMap();
  //Get Border Geocodes To show border
  $.ajax({
    type: "GET",
    url: "php/border.php",
    dataType: "json",
    data: { iso: $("#selCountry").val() },
    success: function (results) {
    
      border = L.geoJSON(results, {
        color: "#0B84C4",
        weight: 1,
        opacity: 1,
      }).addTo(map);
      map.fitBounds(border.getBounds());

    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
  //Get Country Basic data/information
  $.ajax({
    url: "php/restCountries.php",
    type: "GET",
    dataType: "json",
    data: { country: encodeURI($("#selCountry option:selected").text()) },
    success: function (results) {
      if(results[0]){
       
      let data = results[0];
      console.log("info", results);
      let flag = data["flags"]["png"];
      let lang = data["languages"];
      let languages = [];
     let capital = data["capital"];
      currencyCode = Object.keys(data["currencies"])[0];
      $("#capital").html(capital);
      $(".flag").attr("src", flag);
      $(".capital").html(capital);
      $("#continent").html(data["region"]);
      $("#capital").html(capital);
      $("#area").html(commas(data["area"] + " km<sup>2</sup>"));
      $("#population").html(commas(data["population"]));
      const multi = Object.getOwnPropertyNames(lang);
      for (let i = 0; i < multi.length; i++) {
        languages += `${
          data["languages"][Object.keys(data["languages"])[i]]
        } <br>`;
        $("#languages").html(languages);
      }
      $("#currency").html(
        data["currencies"][Object.keys(data["currencies"])[0]]["name"]
      );
      $("#symbol").html(
        data["currencies"][Object.keys(data["currencies"])[0]]["symbol"]
      );
      $("#code").html(currencyCode);

      $.ajax({
        url: "php/weather.php",
        type: "POST",
        dataType: "json",
        data: {
          location: data.capital[0],
        },
        success: function (result) {
          console.log("weather", result);
          if (result[0]) {
            $("#weatherModalLabel").html(
              "Weather for capital" + " " + data.capital[0]
            );
            $("#todayConditions").html(result[0]['day']['condition']['text']);
            $("#todayIcon").attr("src", result[0]['day']['condition']['icon']);
            $("#todayMaxTemp").html(result[0]['day']['maxtemp_c']);
            $("#todayMinTemp").html(result[0]['day']['mintemp_c']);
            $("#day1Date").text(result[1].date);

            $("#day1Icon").attr("src", result[1]['day']['condition']['icon']);
            $("#day1MinTemp").html(result[1]['day']['maxtemp_c']);
            $("#day1MaxTemp").html(result[1]['day']['mintemp_c']);
   
            $("#day2Date").text(result[2].date);
            $("#day2Icon").attr("src", result[2]['day']['condition']['icon']);
            $("#day2MinTemp").html(result[2]['day']['maxtemp_c']);
            $("#day2MaxTemp").html(result[2]['day']['mintemp_c']);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("weather", textStatus, errorThrown);
        },
      });

    }

    },
  });
  //Get Currency of Country
  $.ajax({
    url: "php/currency.php",
    type: "GET",
    dataType: "json",
    data: { country: $("#selCountry").val() },
    success: function (result) {

      exchangeRate = result.rates[currencyCode];
      $("#rate").html(
        exchangeRate.toFixed(2) + " " + currencyCode + " to 1 USD"
      );
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });

  //Get Holidays of Country
  $.ajax({
    url: "php/holiday.php",
    type: "GET",
    dataType: "JSON",
    data: { country: $("#selCountry").val() },
    success: function (results) {
      let data = results;
      if(data.holidays){
        $("#name").html(data.holidays[0].name);
        $("#date").html(
           data.holidays[0].date
        );
        $("#name1").html(data.holidays[1].name);
        $("#date1").html(
           data.holidays[1].date
        );
        $("#name2").html(data.holidays[2].name);
        $("#date2").html(
           data.holidays[2].date
        );
        $("#name3").html(data.holidays[3].name);
        $("#date3").html(
           data.holidays[3].date
        );
        $("#name4").html(data.holidays[4].name);
        $("#date4").html(
           data.holidays[4].date
        );
        $("#name5").html(data.holidays[5].name);
        $("#date5").html(
           data.holidays[5].date
        );
      }
     
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
 let country = $("#selCountry").val();
 //Get Wikipedia of Country
  $.ajax({
    url: "php/wiki.php",
    type: "GET",
    dataType: "JSON",
    data: {
      country: encodeURI($("#selCountry option:selected").text()),
      countryCode: encodeURI($("#selCountry option:selected").val()),
    },
    success: function (result) {
      if ( result.geonames[0]) {
        $("#img1").attr("src", result.geonames[0].thumbnailImg);
        $("#wiki1").html(result.geonames[0].summary);
        $("#article1").attr("href", "http://" + result.geonames[0].wikipediaUrl);

        $("#img2").attr("src", result.geonames[1].thumbnailImg);
        $("#wiki2").html(result.geonames[1].summary);
        $("#article2").attr("href", "http://" + result.geonames[1].wikipediaUrl);

        $("#img3").attr("src", result.geonames[2].thumbnailImg);
        $("#wiki3").html(result.geonames[2].summary);
        $("#article3").attr("href", "http://" + result.geonames[2].wikipediaUrl);

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("wiki", textStatus, errorThrown);
    },
  });

  //markers
  groupMarkers = L.markerClusterGroup();
  // Get Airports Data
  $.ajax({
    url: "php/airport.php",
    type: "GET",
    dataType: "JSON",
    data: { country: encodeURI($("#selCountry option:selected").text()) },

    success: function (results) {
      console.log("airports", results);
      let airports = [];
      let airportsMap = [];
      let airportM = L.ExtraMarkers.icon({
        icon: "fa-plane",
        markerColor: "blue",
        shape: "circle",
        prefix: "fa",
      });
      let data = results["geonames"];
      let leght = data.length;
      for (let i = 0; i < leght; i++) {
        let lat = data[i]["lat"];
        let long = data[i]["lng"];
        let name = data[i]["name"];
        airports.push([name, lat, long]);
      }
      for (let i = 0; i < airports.length; i++) {
        airportsMap = L.marker(new L.LatLng(airports[i][1], airports[i][2]), {
          icon: airportM,
        }).bindPopup(airports[i][0]);
        groupMarkers.addLayer(airportsMap);
      }
      map.addLayer(groupMarkers);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
  // Get Banks Data
  $.ajax({
    url: "php/banks.php",
    type: "GET",
    dataType: "JSON",
    data: { country:encodeURI($("#selCountry option:selected").text()) },

    success: function (results) {
      console.log("banks", results);
      let banks = [];
      let banksMap = [];
      let bankM = L.ExtraMarkers.icon({
        icon: "fa-university",
        markerColor: "green",
        shape: "star",
        prefix: "fa",
      });
      let data = results["geonames"];
      let leght = data.length;
      for (let i = 0; i < leght; i++) {
        let lat = data[i]["lat"];
        let long = data[i]["lng"];
        let name = data[i]["name"];
        banks.push([name, lat, long]);
      }
      for (let i = 0; i < banks.length; i++) {
        banksMap = L.marker(new L.LatLng(banks[i][1], banks[i][2]), {
          icon: bankM,
        }).bindPopup(banks[i][0]);
        groupMarkers.addLayer(banksMap);
      }
      map.addLayer(groupMarkers);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
  // Get Hospitals Data
  $.ajax({
    url: "php/hospitals.php",
    type: "GET",
    dataType: "JSON",
    data: { country: encodeURI($("#selCountry option:selected").text()) },

    success: function (results) {
      console.log("hospital", results);
      let hospitals = [];
      let hospitalsMap = [];
      let hospitalM = L.ExtraMarkers.icon({
        icon: "fa-h-square",
        markerColor: "red",
        shape: "square",
        prefix: "fa",
      });
      let data = results["geonames"];
      let leght = data.length;
      for (let i = 0; i < leght; i++) {
        let lat = data[i]["lat"];
        let long = data[i]["lng"];
        let name = data[i]["name"];
        hospitals.push([name, lat, long]);
      }
      for (let i = 0; i < hospitals.length; i++) {
        hospitalsMap = L.marker(
          new L.LatLng(hospitals[i][1], hospitals[i][2]),
          {
            icon: hospitalM,
          }
        ).bindPopup(hospitals[i][0]);
        groupMarkers.addLayer(hospitalsMap);
      }
      map.addLayer(groupMarkers);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
  // Get Schools Data
  $.ajax({
    url: "php/schools.php",
    type: "GET",
    dataType: "JSON",
    data: { country: encodeURI($("#selCountry option:selected").text()) },

    success: function (results) {
      console.log("school", results);
      let schools = [];
      let schoolsMap = [];
      let schoolM = L.ExtraMarkers.icon({
        icon: "fa-graduation-cap",
        markerColor: "yellow",
        shape: "penta",
        prefix: "fa",
      });
      let data = results["geonames"];
      let leght = data.length;
      for (let i = 0; i < leght; i++) {
        let lat = data[i]["lat"];
        let long = data[i]["lng"];
        let name = data[i]["name"];
        schools.push([name, lat, long]);
      }
      for (let i = 0; i < schools.length; i++) {
        schoolsMap = L.marker(new L.LatLng(schools[i][1], schools[i][2]), {
          icon: schoolM,
        }).bindPopup(schools[i][0]);
        groupMarkers.addLayer(schoolsMap);
      }
      map.addLayer(groupMarkers);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
});

// var select = L.countrySelect().addTo(map);



// easy button
L.easyButton(
  "fa fa-info",
  function () {
    $("#infoModal").modal("show");
  },
  "Information"
).addTo(map);

L.easyButton(
  "fa fa-dollar-sign",
  function () {
    $("#currencyModal").modal("show");
  },
  "Currency"
).addTo(map);

L.easyButton(
  "fa fa-cloud",
  function () {
    $("#weatherModal").modal("show");
  },
  "Weather"
).addTo(map);


L.easyButton(
  "fa fa-calendar",
  function () {
    $("#holidayModal").modal("show");
  },
  "Holiday"
).addTo(map);

L.easyButton(
  "fa fa-newspaper",
  function () {
    $("#wikiModal").modal("show");
  },
  "Wikipedia"
).addTo(map);
