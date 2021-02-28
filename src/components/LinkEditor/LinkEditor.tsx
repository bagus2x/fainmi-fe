import { useRef, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import DragIcon from '@material-ui/icons/DragIndicatorRounded';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import { useDispatch } from 'react-redux';
import { deleteLink, updateDisplay, updateLink } from '@redux/links/actions';
import { useForm } from 'react-hook-form';
import { Link } from '@redux/links/types';
import useStyles from '@components/LinkEditor/style';
import useDebounce from '@lib/hooks/debounce';
import { SortableHandle } from 'react-sortable-hoc';
import { getAccessToken } from '@lib/access-token';

const DragHandle = SortableHandle(() => <DragIcon color="primary" />);

interface LinkEditorProps {
    linkID: number;
    title: string;
    url: string;
    display: boolean;
}

const LinkEditor: React.FC<LinkEditorProps> = ({ linkID, title, url, display }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { handleSubmit, register, setValue } = useForm<Link>();
    const dispatch = useDispatch();
    const defaultDisplay = useRef(display).current;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setValue('title', title);
        setValue('url', url);
    };

    const handleUpdateDisplay = useDebounce((ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDisplay(getAccessToken() as string, linkID, { display: ev.target.checked }));
    }, 1000);

    const handleDelete = () => {
        dispatch(deleteLink(getAccessToken() as string, linkID));
    };

    const handleSave = handleSubmit((req) => {
        if (req.title === title && req.url === url && req.display === display) setOpen(false);
        else dispatch(updateLink(getAccessToken() as string, linkID, req));
        setOpen(false);
    });

    return (
        <div className={classes.root}>
            <div className={classes.dragIndicator}>
                <DragHandle />
            </div>
            <form className={classes.editor} onSubmit={handleSave}>
                <div className={classes.inputWrapper}>
                    <TextField
                        spellCheck={false}
                        InputProps={{ disableUnderline: open }}
                        name="title"
                        disabled={!open}
                        defaultValue={title}
                        inputRef={register()}
                        placeholder="title..."
                        color="primary"
                        size="small"
                    />
                    {open ? (
                        <TextField
                            spellCheck={false}
                            InputProps={{ disableUnderline: true, className: classes.inputUrl }}
                            name="url"
                            defaultValue={url}
                            inputRef={register()}
                            placeholder="link..."
                            multiline
                            color="primary"
                            size="small"
                        />
                    ) : (
                        <div onClick={handleOpen} className={classes.phantomButton} />
                    )}
                </div>
                <div className={classes.switchMore}>
                    <Switch onChange={handleUpdateDisplay} name="display" inputRef={register()} defaultChecked={defaultDisplay} />
                </div>
                {open && (
                    <div className={classes.toolbox}>
                        <IconButton onClick={handleCancel} size="small" edge="start" color="primary">
                            <CancelIcon />
                        </IconButton>
                        <IconButton type="submit" size="small" color="primary">
                            <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleDelete} size="small" color="primary">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                )}
            </form>
        </div>
    );
};

export default LinkEditor;
