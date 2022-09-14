import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    bar: {
        width: '100%',
        height: '60px',
        textAlign: 'center',
        background: 'linear-gradient(90deg, rgba(52,206,255,1) 0%, rgba(0,255,192,1) 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    barText: {
        fontWeight: 500,
        color: 'white'
    }
}));

const HeaderBar = () => {
    const classes = useStyles();
    return (<div className={classes.bar}>
        <p className={classes.barText}>Contacts</p>
    </div>)
}

export default HeaderBar;