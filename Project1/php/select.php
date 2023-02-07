<?php

$json = file_get_contents('../assets/js/countryBorders.geo.json');
echo $json;
$data = json_decode($json, true);

?>