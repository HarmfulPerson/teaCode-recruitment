import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import List from '../list/list';
import HeaderBar from '../headerBar/headerBar';

const useStyles = makeStyles(() => ({
    container: {
        width: '60%',
        height: 'calc(100vh - 40px)',
        margin: '20px auto',
    }
}));


const Container = () => {
    const classes = useStyles();
    return (
        <Card className={classes.container}>
            <HeaderBar />
            <List />
        </Card>
    )
}

export default Container