<?php

$json = file_get_contents('../assets/js/countryBorders.geo.json');

$data = json_decode($json, true);
// echo json_encode($data);
$iso=$_GET['iso'];

foreach ($data['features'] as $entry) {
    if ($entry['properties']['iso_a2'] == $iso) {
        echo json_encode($entry['geometry']);
    }
}

exit;
?>