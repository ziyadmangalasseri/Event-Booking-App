 const userisAuthenticated = (req, res, next) => {

  if (req.session.userisLoggedIn) {
    res.json({isAuthenticated:true})
    // next(); // Proceed to the next middleware or route handler
  } else {
    res.json({isAuthenticated:false})
    // res.redirect("/"); // Redirect to login page if not logged in
  }
};

const adminisAuthenticated = (req, res, next) => {

  if (req.session.adminisLoggedIn) {
    res.json({isAuthenticated:true})
    // next(); // Proceed to the next middleware or route handler
  } else {
    res.json({isAuthenticated:false})
    // res.redirect("/"); // Redirect to login page if not logged in
  }
};


module.exports  = {userisAuthenticated,adminisAuthenticated}
