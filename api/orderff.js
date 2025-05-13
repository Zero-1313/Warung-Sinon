// /api/orderff.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const { id, kode, harga } = req.body;
  const apiKey = process.env.VIPRESELLER_API_KEY;
  const apiId = process.env.VIPRESELLER_API_ID;

  try {
    const response = await fetch("https://vip-reseller.co.id/api/game-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: apiKey,
        sign: "", // opsional, jika diminta
        type: "order",
        service: kode,
        data_no: id,
        data_zone: "", // optional
        testing: false
      }),
    });

    const result = await response.json();
    if (result.data && result.data.trxid) {
      return res.status(200).json({ status: "success", message: "Order berhasil", data: result.data });
    } else {
      return res.status(400).json({ status: "error", message: result.message || "Gagal" });
    }

  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}
