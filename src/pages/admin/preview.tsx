import React from 'react';
import Layout from '@components/common/Layout';
import Head from 'next/head';
import Auth from '@components/common/Auth';
import Emulator from '@components/Emulator';
import useStyles from '@styles/preview';

let dummy = {
    links: [{ title: 'My Facebook', href: 'http://facebook.com' }],
    style: {
        background: {
            image: '/sign_background.svg',
            subImage: '/circuit_boarad.svg',
            name: 'wdw'
        },
        button: {
            image: '/contour_line.svg',
            name: 'wdwd'
        },
        font: {
            fontFamily: `'Akaya Telivigala', cursive;`,
            href: `https://fonts.googleapis.com/css2?family=Akaya+Telivigala&display=swap`,
            name: 'wdwd'
        }
    },
    username: 'bagus'
};

function Preview() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Head>
                <title>Preview</title>
            </Head>
            <Emulator
                component={React.Fragment}
                backgroundImage={dummy.style.background.image}
                backgroundSubImage={dummy.style.background.subImage}
                buttonImage={dummy.style.button.image}
                fontFamily={dummy.style.font.fontFamily}
                fontHref={dummy.style.font.href}
            />
        </div>
    );
}

Preview.XLayout = Layout;
Preview.XAuth = Auth;

export default Preview;
