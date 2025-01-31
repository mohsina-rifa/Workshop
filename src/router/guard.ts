import { getUserFromLocalStorage } from '../helper/localStore'
import { USER_ROLE } from '../service/enum'

export const isAuthenticated = (to, from, next) => {
    const userID = getUserFromLocalStorage().id;

    if (userID) {
      next();
    } else {
      next('/resume-your-progress');
    }
}

export const isAlreadyLoggedIn = (to, from, next) => {
  const userID = getUserFromLocalStorage().id;

  if (userID) {
    next('/profile');
  } else {
    next();
  }
}

export const isAdminLoggedIn = (to, from, next) => {
  const isAdmin = getUserFromLocalStorage().role === USER_ROLE.ADMIN || getUserFromLocalStorage().role === USER_ROLE.SUPER_ADMIN;

  if (isAdmin) {
    next('');
  } else {
    next('/resume-your-progress');
  }
}