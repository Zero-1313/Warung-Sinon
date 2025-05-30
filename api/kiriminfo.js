// pages/api/kirim-wa.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { message } = req.body;

  try {
    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: process.env.FONNTE_KEY
      },
      body: new URLSearchParams({
        target: "6285814422209", // nomor WA admin bisa tetap disimpan di server
        message
      })
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengirim WA" });
  }
}
