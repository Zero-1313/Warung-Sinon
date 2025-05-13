// /api/orderff.js
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const { id, kode } = req.body;
  const apiKey = process.env.VIPRESELLER_API_KEY;
  const apiId = process.env.VIPRESELLER_API_ID;

  // Pastikan semua variabel ada
  if (!apiKey || !apiId) {
    return res.status(500).json({ status: 'error', message: 'API credentials missing' });
  }

  // Buat sign
  const sign = crypto.createHash('md5').update(apiId + apiKey).digest('hex');

  try {
    const response = await fetch("https://vip-reseller.co.id/api/game-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: apiKey,
        sign: sign,
        type: "order",
        service: kode,
        data_no: id,
        testing: false
      }),
    });

    const result = await response.json();

    if (result.data && result.data.trxid) {
      return res.status(200).json({ status: "success", message: "Order berhasil", data: result.data });
    } else {
      return res.status(400).json({ status: "error", message: result.message || "Gagal melakukan order" });
    }

  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}
