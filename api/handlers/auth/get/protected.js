function protected(req, res) {
  return res.json({ user: { name: req.userName } });
}

module.exports = { protected };
