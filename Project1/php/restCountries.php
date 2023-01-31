<?php
// Your API key
$apiKey = '4e75e0a053b44a2d96a3a36a8c631e52';

// The country you want to get the borders for
$country = $_GET['country'];

// Initialize cURL
$ch = curl_init();

// Set the URL
curl_setopt($ch, CURLOPT_URL, 'https://restcountries.com/v3.1/name/' . urlencode($country));

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
echo json_encode($result);
exit;

?>