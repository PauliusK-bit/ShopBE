const express = require("express");

const googleAuthCallback = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Neprisijungęs" });
  }
  res.json({
    message: "Sėkmingai prisijungta!",
    user: req.user,
  });
};

module.exports = {
  googleAuthCallback,
};
