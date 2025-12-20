$apikey = 9a5cc14d0e9b7f6fde1683e81

$apiEmail = urlencode( "example@customerdomain.com");

$apiURL = "https://www.creativemarketingincentives.biz/certapi?apikey={$apiKey}&email={$apiEmail}";

$curl=curl_init($serviceurl);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($curl);

curl_close($curl);

if($response='SUCCESS'){

//The ecertificate was successfully sent via the API

}else{

//The e-certificate failed, with a message indicating if invalid API key, Invalid Email, Unsubscribe Email

}