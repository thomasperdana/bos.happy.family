// test-api.js
// Run with: node test-api.js

async function testVoucherApi() {
  const email = "test_verification_" + Date.now() + "@example.com";
  const voucherType = "hotel"; // or 'restaurant'

  console.log(`Testing Voucher API for ${email} (${voucherType})...`);

  // Logic copied from api/claim-voucher.js for verification
  const HOTEL_API_KEY = "e9f7559a82ae91a1bf2ee3bbb86d7439";
  const RESTAURANT_API_KEY = "4329cab67283057a3df0925832ba6704";

  const apiKey = voucherType === 'hotel' ? HOTEL_API_KEY : RESTAURANT_API_KEY;
  const apiUrl = `https://www.creativemarketingincentives.biz/certapi?apikey=${apiKey}&email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(apiUrl);
    const text = await response.text();

    console.log("Response:", text);

    if (text.includes("SUCCESS")) {
      console.log("✅ API SUCCESS");
    } else {
      console.error("❌ API FAILED");
    }

  } catch (error) {
    console.error("❌ Network Error:", error);
  }
}

testVoucherApi();
