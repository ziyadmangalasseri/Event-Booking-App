const dashboard = (req,res) => {
    try {
        res.status(200).json({ message: "Welcome to the Admin Dashboard", user: req.user });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

module.exports = {dashboard}