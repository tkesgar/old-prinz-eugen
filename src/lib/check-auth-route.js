export default function checkAuthRoute (userFn, opts = {}) {
  const {
    auth: authFn = _defaultAuthFn,
    next: nextFn = _defaultNextFn,
    end = true
  } = opts

  return (to, from, next) => {
    const user = userFn()
    if (!authFn(user)) {
      next(nextFn(to, from, user))
      return
    }

    if (end) {
      next()
    }
  }
}

function _defaultAuthFn (user) {
  return Boolean(user)
}

function _defaultNextFn (to) {
  return {
    path: '/login',
    query: {
      next: to.fullPath
    }
  }
}
