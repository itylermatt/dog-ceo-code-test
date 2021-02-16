import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

 const ContainedButtons = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button onClick={props.onChange} variant="contained" color="primary">
                View Images
            </Button>
        </div>
    );
}
export default ContainedButtons;