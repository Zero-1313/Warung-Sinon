export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { nomor, kode } = req.body;
  if (!nomor || !kode) {
    return res.status(400).json({ success: false, message: "Nomor dan kode diperlukan." });
  }

  const api_key = process.env.NETFLAZZ_API_KEY; // simpan di .env
  const pin = process.env.NETFLAZZ_PIN;         // simpan di .env

  try {
    const response = await fetch("https://api.nf22.my.id/prabayar", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        key: api_key,
        pin: pin,
        action: "pemesanan",
        layanan: kode,
        target: nomor
      })
    });

    const data = await response.json();

    if (data.result === true || data.status === "success") {
      return res.status(200).json({ success: true, status: "sukses", data });
    } else {
      return res.status(200).json({ success: false, status: "gagal", message: data.message || "Gagal memesan" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: "error",
      message: error.message || "Terjadi kesalahan"
    });
  }
}
