angular.module('WB.Constants', [])

	.constant('PATH', {
		templates: 'views/',
		widgets: 'widgets/'
	})

	.constant('NAV_CHANGE', {
		page: 'nav-page-change'
	})

	.constant('USER_ROLES', {
		all: '*',
		user: 'user-logged-in',
		guest: 'guest',
		reset: 'reset'
	})

	.constant('METHODS', {
		POST: 'POST',
		GET: 'GET',
		PUT: 'PUT',
		DELETE: 'DELETE',
		PATCH: 'POST',
		HEAD: 'HEAD',
		OPTIONS: 'OPTIONS',
		JSONP: 'JSONP'
	})

	.constant('AUTH_EVENTS', {
		loginStarted: 'auth-login-started',
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		loginCanceled: 'auth-login-canceled',
		logoutStarted: 'auth-logout-started',
		logoutSuccess: 'auth-logout-success',
		logoutFailed: 'auth-logout-failed',
		sessionTimeout: 'auth-session-timeout',
		authenticated: 'auth-is-authenticated',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized',
		profile: 'profile'
	});
