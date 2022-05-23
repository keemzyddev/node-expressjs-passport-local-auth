welcomeData = (req, res) => {
  res.render("welcome");
};

dashboardData = (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
};

module.exports = { welcomeData, dashboardData };
