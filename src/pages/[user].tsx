import Head from 'next/head';
import useStyles from '@styles/user';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { API } from '@lib/global-var';
import Emulator from '@components/Emulator';
import React from 'react';

interface Link {
    linkID: number;
    title: string;
    url: string;
}

interface Style {
    background: string;
    button: string;
    font: {
        href: string;
        fontFamily: string;
    };
}

interface UserProps {
    userExist: boolean;
    profile?: {
        profileID: number;
        username: string;
        photo: string;
    };
    links?: Array<Link>;
    style?: Style;
}

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

function User({ profile, links, style }: UserProps) {
    const classes = useStyles();

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Emulator
                backgroundImage={dummy.style.background.image}
                backgroundSubImage={dummy.style.background.subImage}
                buttonImage={dummy.style.button.image}
                fontFamily={dummy.style.font.fontFamily}
                fontHref={dummy.style.font.href}
            />
        </div>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<{ props: UserProps }> {
    let username = ctx.params?.user as string;
    // const links = fetchLinks(username);
    // const styles = fetchStyle(username);

    return {
        props: {
            userExist: true,
            links: [
                { linkID: 1, title: 'heboh ada ikan beranak lele', url: 'lele.com' },
                { linkID: 2, title: 'argh kebelet eek', url: 'eek.com' }
            ],
            profile: {
                profileID: 1,
                photo: '/user.svg',
                username: username
            }
        }
    };
}

const fetchLinks = async (username: string) => {
    const res = await axios.get(`${API}/api/v1/link/public/${username}`);
    return res.data.data as Array<Link>;
};

const fetchStyle = async (username: string) => {
    const res = await axios.get('/api/v1/style');
    return res.data;
};

export default User;
