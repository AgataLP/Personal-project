<?php

$city =  $_POST['location'];
$api_key = "524532754a184b4487984635232801";

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://api.weatherapi.com/v1/forecast.json?key=".$api_key."&q=".$city."&days=3&aqi=no&alerts=no",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  $weather = json_decode($response);
  echo json_encode($weather->forecast->forecastday);
}
