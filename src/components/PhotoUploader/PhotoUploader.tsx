import Image from 'next/image';
import useStyles from '@components/PhotoUploader/style';
import CameraIcon from '@material-ui/icons/CameraAltRounded';
import IconButton from '@material-ui/core/IconButton';
import { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { updatePhoto } from '@redux/profile/actions';
import { getAccessToken } from '@lib/access-token';
import { API } from '@lib/global-var';

export interface PhotoUploaderProps {
    src: string;
    size: number;
}

interface Preview {
    src: string;
    alt: string;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ src, size }) => {
    const classes = useStyles();
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<Preview | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (photoFile) {
            console.log(URL.createObjectURL(photoFile));
            setPreview({
                src: URL.createObjectURL(photoFile),
                alt: photoFile.name
            });
        }
    }, [photoFile]);

    const handleClose = () => {
        setPhotoFile(null);
        setPreview(null);
    };

    const handleSave = () => {
        setPreview(null);
        dispatch(updatePhoto(getAccessToken() as string, photoFile as File));
    };

    const handleGetPhoto = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files;
        if (files && files?.length > 0) setPhotoFile(files[0]);
    };

    return (
        <div className={classes.root}>
            <div className={classes.border}>
                <Image src={src} width={size} height={size} />
            </div>
            <span className={classes.buttonCamera}>
                <label htmlFor="photo-profile">
                    <IconButton size="small" component="span">
                        <CameraIcon />
                    </IconButton>
                </label>
                <input onChange={handleGetPhoto} id="photo-profile" name="photo" type="file" />
            </span>
            <Dialog classes={{ paper: classes.dialog }} keepMounted open={!!preview} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update photo?</DialogTitle>
                <DialogContent>
                    <img src={preview?.src || src} alt={preview?.alt || src} width={360} height={360} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="secondary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PhotoUploader;
