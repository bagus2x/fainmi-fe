import Auth from '@components/common/Auth';
import Layout from '@components/common/Layout';
import Head from 'next/head';

function Stats() {
	return (
		<div>
			<Head>
				<title>Statistics</title>
			</Head>
		</div>
	);
}

Stats.XLayout = Layout;
Stats.XAuth = Auth;

export default Stats;
