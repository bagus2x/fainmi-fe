import React, { useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Router from 'next/router';

function Progress() {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		Router.events.on('routeChangeStart', () => setLoading(true));
		Router.events.on('routeChangeComplete', () => setLoading(false));
		Router.events.on('routeChangeError', () => setLoading(false));
	}, []);
	return loading ? <LinearProgress color="secondary" style={{position: 'absolute', zIndex: 999, width: '100%'}} /> : <React.Fragment />;
}

export default React.memo(Progress);
