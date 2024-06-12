const gerCurrentUserCTRL = async (req, res) => {
  const user = req.user;

  const { status } = req.query;
  if (status === "getStatus") {
    return res.status(200).json(user.status);
  }

  return res.status(200).json(user);
};

module.exports = gerCurrentUserCTRL;
