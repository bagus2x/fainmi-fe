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

function User({ profile, links, style }: UserProps) {
    const classes = useStyles();

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Emulator component={React.Fragment} />
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
