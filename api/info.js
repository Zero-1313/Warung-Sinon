// /api/kirim-wa.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { nomor, pesan } = req.body;
  const apiKey = process.env.FONNTE_API_KEY; // Simpan di .env
  const adminWA = process.env.FONNTE_ADMIN_WA; // Atur default

  if (!apiKey || !nomor || !pesan) {
    return res.status(400).json({ success: false, message: "Data tidak lengkap" });
  }

  try {
    const fonRes = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: apiKey
      },
      body: new URLSearchParams({
        target: adminWA,
        message: pesan
      })
    });

    const result = await fonRes.json();
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Gagal mengirim WA", error: error.message });
  }
}
