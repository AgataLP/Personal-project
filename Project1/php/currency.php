<?php

$api_key = "cd87110263a64f1abfd2820f6ad20823";

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://openexchangerates.org/api/latest.json?app_id=".$api_key,
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
