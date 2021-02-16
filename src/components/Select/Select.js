import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SimpleSelect = (props) => {
    const classes = useStyles();
    const [selectValue, setSelectValue] = React.useState('');

    const handleChange = (event) => {
        props.handleChange(event.target.value);
        setSelectValue(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl} error={props.error}>
                <InputLabel id="demo-simple-select-helper-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectValue}
                    onChange={handleChange}
                    disabled={props.disabled}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        Array.isArray(props.menuItems) ?
                            props.menuItems.map((menuItem, index) => <MenuItem key={index}
                                                                               value={menuItem}>{menuItem}</MenuItem>) : null

                    }
                </Select>
                {!props.disabled? <FormHelperText>Required*</FormHelperText>: null}
            </FormControl>
        </div>
    );
};

export default SimpleSelect;