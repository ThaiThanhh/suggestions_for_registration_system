exports.getHomeView = (req, res) => {
  res.status(200).render("user/home", {
    title: "Home",
    layout: "user_layout",
  });
};
