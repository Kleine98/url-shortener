const shortid = require("shortid");
const Url = require("../models/Url");
const qr = require("qrcode");
const { promisify } = require("util");

const generateQrCode = promisify(qr.toDataURL);

const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.status(400).json({ error: "Full URL is required" });
    }

    // Generate a unique short ID using the shortid library
    const shortUrl = shortid.generate();

    const shortUrlQR = `http://localhost:3500/url/${shortUrl}`;

    // Generate QR code for the short URL
    const qrCode = await generateQrCode(shortUrlQR);

    // Create a new URL document with the long URL, short URL, and QR code
    const url = new Url({ longUrl, shortUrl, qrCode });

    // Save the URL document to MongoDB
    await url.save();

    res.json({ longUrl, shortUrl, qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const redirectToLongUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    // Find the URL document in the database by short URL
    const url = await Url.findOne({ shortUrl });

    // If URL document not found, return 404
    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Increment the click count for the URL
    url.clicks++;
    await url.save();

    // Redirect to the corresponding long URL
    res.redirect(url.longUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { shortenUrl, redirectToLongUrl };
