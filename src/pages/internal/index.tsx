import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Emulator from '@components/Emulator';
import { Grid, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(4)
        }
    })
);

function index() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <div>
                        <Typography variant="body1">Background</Typography>
                        <div>
                            <Button variant="contained" color="default" startIcon={<CloudUploadIcon />}>
                                Upload
                            </Button>
                            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                            <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
                                Save
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    {/* <Emulator /> */}
                </Grid>
            </Grid>
        </div>
    );
}

export default index;
