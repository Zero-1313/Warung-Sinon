export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { nomor, kode } = req.body;
  const api_key = process.env.NETFLAZZ_API_KEY;
  const pin = process.env.NETFLAZZ_PIN;

  if (!api_key || !pin) {
    return res.status(500).json({ success: false, message: "API key or pin not configured." });
  }

  try {
    const response = await fetch("https://api.nf22.my.id/prabayar", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        key: api_key,
        pin: pin,
        action: "pemesanan",
        layanan: kode,
        target: nomor
      })
    });

    const result = await response.json();

    if (result.result === true) {
      return res.status(200).json({ success: true, status: "sukses", data: result.data });
    } else {
      return res.status(200).json({ success: false, status: "gagal", message: result.message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, status: "error", message: error.message });
  }
}
