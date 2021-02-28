import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';
import Progress from '@components/common/Progress';
import { wrapper } from 'src/redux/store';
import { APP_NAME } from '@lib/global-var';
import theme from '@lib/theme';

interface FainmiApp extends AppProps {
    Component: React.ComponentType<{}> & {
        XLayout: React.ComponentType;
        XAuth: React.ComponentType;
    };
}

function Fainmi(props: FainmiApp) {
    const { Component, pageProps } = props;
    const Layout = Component.XLayout ?? React.Fragment;
    const Auth = Component.XAuth ?? React.Fragment;

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles !== null) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{APP_NAME}</title>
            </Head>
            <ThemeProvider theme={theme}>
                <Progress />
                <CssBaseline />
                <Layout>
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default wrapper.withRedux(Fainmi);
