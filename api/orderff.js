export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { id, produk, harga, total } = req.body;
  const apiKey = process.env.FONNTE_API_KEY;
  const admin = process.env.FONNTE_ADMIN_WA;

  if (!id || !produk || !harga || !total) {
    return res.status(400).json({ success: false, message: "Data tidak lengkap" });
  }

  const pesan = `📥 PESANAN TOPUP FF\nID: ${id}\nProduk: ${produk}\nHarga: Rp ${harga.toLocaleString()}\nTotal: Rp ${total.toLocaleString()}\nStatus: PENDING`;

  try {
    const fonRes = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: { Authorization: apiKey },
      body: new URLSearchParams({
        target: admin,
        message: pesan
      })
    });

    const result = await fonRes.json();
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Gagal mengirim WA", error: error.message });
  }
}
