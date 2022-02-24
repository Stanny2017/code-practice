(() => {


	const cachedErrorList: Error[] = [];
	const cachedErrorMessageList: string[] = [];

	const errorHandler = (event: ErrorEvent | PromiseRejectionEvent) => {
		if (event instanceof PromiseRejectionEvent) {
			if (event.reason) {
				cachedErrorList.push(event.reason);
			}
		} else {
			if (event.error) {
				cachedErrorList.push(event.error);
			} else if (event.message) {
				cachedErrorMessageList.push(event.message);
			}
		}
	};
	window.addEventListener("error", errorHandler);
	window.addEventListener("unhandledrejection", errorHandler);

	setTimeout(() => {
		try {
			import(/* webpackChunkName: 'sentry-browser' */"@sentry/browser").then((Sentry) => {
				Sentry.init({
					dsn: "https://a022629d68bd49648e7064366a7e831b@sentry.kuaishou.com/1489",
					sampleRate: 1,
					environment: "production",
					release: "FANGZHOU_" + "--activitySentryFileId--",
				});
				cachedErrorList.forEach((error) => {
					Sentry.captureException(error);
				});
				cachedErrorMessageList.forEach((message) => {
					Sentry.captureMessage(message);
				});
				cachedErrorList.splice(0, cachedErrorList.length);
				cachedErrorMessageList.splice(0, cachedErrorMessageList.length);
			});
		} catch (e) {}
	}, 0);
})();
