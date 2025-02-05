import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { getUserFromLocalStorage } from '../helper/localStore';
import { USER_ROLE } from '../service/enum';

export const isAuthenticated = (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const userID = getUserFromLocalStorage()?.id;

    if (userID) {
      next();
    } else {
      next('/resume-your-progress');
    }
}

export const isAlreadyLoggedIn = (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userID = getUserFromLocalStorage()?.id;

  if (userID) {
    next('/profile');
  } else {
    next();
  }
}

export const isAuthorized = (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const isAdmin = getUserFromLocalStorage()?.role === USER_ROLE.ADMIN || getUserFromLocalStorage()?.role === USER_ROLE.OWNER || getUserFromLocalStorage()?.role === USER_ROLE.VIEWER;

  if (isAdmin) {
    next();
  } else {
    next('/resume-your-progress');
  }
}