import Head from 'next/head';
import dynamic from 'next/dynamic';
import Hidden from '@material-ui/core/Hidden';
import useStyles from '@styles/admin-index';
import Layout from '@components/common/Layout';
import Auth from '@components/common/Auth';
import Emulator from '@components/Emulator';

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

const LinksEditor = dynamic(() => import('@components/LinksEditor'));

function Index() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Head>
                <title>Links</title>
            </Head>
            <div className={classes.linksEditor}>
                <LinksEditor />
            </div>
            <Hidden smDown>
                <div className={classes.emulator}>
                    <Emulator
                        backgroundImage={dummy.style.background.image}
                        backgroundSubImage={dummy.style.background.subImage}
                        buttonImage={dummy.style.button.image}
                        fontFamily={dummy.style.font.fontFamily}
                        fontHref={dummy.style.font.href}
                    />
                </div>
            </Hidden>
        </div>
    );
}

Index.XLayout = Layout;
Index.XAuth = Auth;

export default Index;
