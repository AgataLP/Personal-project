<?php

$country =  $_GET['country'];
$api_key="b77d8514-5ca0-4e1c-b2ec-788c0706f341";

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://holidayapi.com/v1/holidays?country=".$country."&year=2022&key=".$api_key,
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
  echo $response;
}
