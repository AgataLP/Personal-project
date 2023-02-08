<?php

$json = file_get_contents('../assets/js/countryBorders.geo.json');
$data = json_decode($json, true);

$countries = array();

foreach($data['features'] as $country){
// echo  json_encode($country['properties']['name']);
// exit;
    array_push($countries, ["name"=>$country['properties']['name'], "iso"=>$country['properties']['iso_a2'] ]);
}

echo  json_encode($countries);

?>