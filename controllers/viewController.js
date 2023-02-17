exports.getHomeView = (req, res) => {
    res.status(200).render('user/home', {
        title: 'Home',
        layout: 'user_layout',
    });
};

exports.getLoginView = (req, res) => {
    res.status(200).render('user/login', {
        title: 'Login',
        layout: false,
    });
};

exports.getSignUpView = (req, res) => {
    res.status(200).render('user/signup', {
        title: 'SignUp',
        layout: false,
    });
};
