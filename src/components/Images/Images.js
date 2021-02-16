import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(26),
            height: theme.spacing(26),
        },
    },
}));

export default function SimplePaper(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                props.images.length ? props.images.map((image, index) =><Paper key={index} elevation={3} >
                    <img src={image} alt="dog" style={{objectFit: 'cover', height: (25.9*8), width: (25.9*8)}} />
                </Paper> ) : null
            }

        </div>
    );
}