export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  // --- SECURITY CHECK: Origin Verification ---
  // In production, verify that the request comes from our allowed domain (NEXT_PUBLIC_URL)
  const allowedOrigin = process.env.NEXT_PUBLIC_URL; // e.g., "https://bos-happy-family.vercel.app/"
  const origin = request.headers.get('origin');
  const host = request.headers.get('host'); // Fallback check

  // If NEXT_PUBLIC_URL is set, we strictly check origin/host for production security
  if (allowedOrigin) {
    // Basic normalization to strip trailing slash for comparison
    const normalizedAllowed = allowedOrigin.replace(/\/$/, '');
    
    // We allow if origin matches allowed, or if it's a local dev environment (localhost)
    const isLocal = host && host.includes('localhost');
    const isAllowed = origin && origin.replace(/\/$/, '') === normalizedAllowed;
    
    if (!isLocal && !isAllowed) {
        console.warn(`Blocked request from unauthorized origin: ${origin}`);
        // Return 403 Forbidden
        return response.status(403).json({ error: 'Forbidden' });
    }
  }
  // ------------------------------------------

  const { email, voucherType } = request.body;

  if (!email || !voucherType) {
    return response.status(400).json({ error: 'Missing email or voucher type' });
  }

  // Use environment variables for sensitive keys
  const HOTEL_API_KEY = process.env.HOTEL_API_KEY;
  const RESTAURANT_API_KEY = process.env.RESTAURANT_API_KEY;

  if (!HOTEL_API_KEY || !RESTAURANT_API_KEY) {
    console.error("Server API keys are not configured in environment variables.");
    return response.status(500).json({ error: 'Server misconfiguration' });
  }

  const apiKey = voucherType === 'hotel' ? HOTEL_API_KEY : RESTAURANT_API_KEY;
  const apiUrl = `https://www.creativemarketingincentives.biz/certapi?apikey=${apiKey}&email=${encodeURIComponent(email)}`;

  try {
    const apiResponse = await fetch(apiUrl);
    const text = await apiResponse.text();

    console.log(`Voucher API Response for ${email} (${voucherType}):`, text);

    if (text.includes("SUCCESS")) {
      return response.status(200).json({ success: true, message: "Voucher sent successfully" });
    } else {
      return response.status(400).json({ success: false, message: "Voucher API failed", error: text });
    }

  } catch (error) {
    console.error("Voucher API Error:", error);
    return response.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
