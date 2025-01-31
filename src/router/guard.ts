export const isAuthenticated = (to, from, next) => {
    const userID = localStorage.getItem("loggedInUser");

    if (userID) {
      next();
    } else {
      next('/resume-your-progress');
    }
}

export const isAlreadyLoggedIn = (to, from, next) => {
  const userID = localStorage.getItem("loggedInUser");

  if (userID) {
    next('/profile');
  } else {
    next();
  }
}

export const isAdminLoggedIn = (to, from, next) => {
  const adminID = localStorage.getItem("loggedInAdmin");

  if (adminID) {
    next('');
  } else {
    next('/resume-your-progress');
  }
}