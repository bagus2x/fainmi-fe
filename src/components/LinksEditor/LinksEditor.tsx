import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import arrayMove from 'array-move';
import { SortableContainer, SortableElement, SortEndHandler } from 'react-sortable-hoc';
import useLinks from '@lib/hooks/links';
import { addLink, updateOrder } from '@redux/links/actions';
import useStyles from '@components/LinksEditor/style';
import InputLink from '@components/LinkEditor/LinkEditor';
import { Links, Link } from '@redux/links/types';
import useDebounce from '@lib/hooks/debounce';
import { getAccessToken } from '@lib/access-token';

interface SortableLinkProps {
    link: Link;
}

interface SortableLinksProps {
    className: string;
    links: Links;
}

const SortableLink = SortableElement(({ link }: SortableLinkProps) => <InputLink {...link} />);

const SortableLinks = SortableContainer(({ links, className }: SortableLinksProps) => {
    return (
        <div className={className}>
            {links.map((link, index) => (
                <SortableLink index={index} link={link} key={link.linkID} />
            ))}
        </div>
    );
});

const LinksEditor = () => {
    const classes = useStyles();
    const { data, loading } = useLinks();
    const [links, setLinks] = useState<Links>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data !== null) setLinks(data);
    }, [data]);

    const handleAddNewLink = useDebounce(() => {
        if (loading) return;
        dispatch(
            addLink(getAccessToken() as string, {
                display: false,
                order: 0,
                title: '',
                url: ''
            })
        );
    }, 1000);

    const saveOrder = useDebounce((order: Links) => {
        dispatch(updateOrder(getAccessToken() as string, order));
    }, 2500);

    const handleOnSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
        const value = arrayMove(links, oldIndex, newIndex);
        const newOrder: Links = value.map((link, index) => ({ ...link, order: index }));
        setLinks(newOrder);
        saveOrder(newOrder);
    };

    return (
        <div className={classes.root}>
            <Button onClick={handleAddNewLink} disableElevation variant="contained" color="secondary" fullWidth>
                Add new link
            </Button>
            <SortableLinks distance={1} className={classes.linkWrapper} links={links} onSortEnd={handleOnSortEnd} useDragHandle />
        </div>
    );
};

export default LinksEditor;
