<?php

// Your API key
$apiKey = '4e75e0a053b44a2d96a3a36a8c631e52';

// The latitude and longitude you want to reverse geocode
$lat = $_GET['lat'];
$lng = $_GET['lng'];

// Initialize cURL
$ch = curl_init();

// Set the URL
curl_setopt($ch, CURLOPT_URL, 'https://api.opencagedata.com/geocode/v1/json?q=' . $lat . '+' . $lng . '&key=' . $apiKey);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

// Execute the request
$data = curl_exec($ch);

// Close the cURL session
curl_close($ch);

// Decode the JSON data
$result = json_decode($data, true);

// Access the ISO code of the country
echo json_encode($result['results']);

// Print the country ISO code
?>