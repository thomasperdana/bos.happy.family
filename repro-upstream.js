// repro-upstream.js

async function testEmail(email, description) {
  console.log(`\n--- Testing ${description} [${email}] ---`);
  
  // Hardcoded key from .env.local (Hotel Key)
  const HOTEL_API_KEY = "e9f7559a82ae91a1bf2ee3bbb86d7439";
  const apiUrl = `https://www.creativemarketingincentives.biz/certapi?apikey=${HOTEL_API_KEY}&email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(apiUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        }
    });

    const text = await response.text();
    console.log(`Status: ${response.status}`);
    console.log(`Body: "${text}"`);

    if (text.includes("SUCCESS")) {
      console.log("✅ Result: SUCCESS");
    } else {
      console.log("❌ Result: FAILED");
    }

  } catch (error) {
    console.error("❌ Network Error:", error.message);
  }
}

async function runTests() {
  // 1. Random fresh email
  await testEmail(`fresh_test_${Date.now()}@example.com`, "Fresh Random Email");
  
  // 2. The user's specific failing email
  await testEmail("EstherPerdana123@gmail.com", "User's Failing Email");
}

runTests();
