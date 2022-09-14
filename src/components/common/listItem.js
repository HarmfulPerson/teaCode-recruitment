import React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles((avatar) => ({
    eachListItem: {
        width: '100%',
        height: '60px',
        backgroundColor: '#d7d7d7',
        borderBottom: '1px solid #b1b1b1',
        color: 'black',
        display: 'flex',
        alignItems: 'center'
    },
    nameSurnameText: {
        fontWeight: 500,
    },
    normalAvatar: {
        height: '50px',
        width: '50px',
        borderRadius: '50%',
        background: props => `url(${props.item.avatar})`,
        margin: '0px 5px',
    },
    noAvatarCase: {
        height: '48px',
        width: '48px',
        borderRadius: '50%',
        color: '#b1b1b1',
        margin: '0px 5px',
        border: '1px solid #b1b1b1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        backgroundColor: 'white'
    },
    nameEmailContainer: {
        display: 'block',
        width: '100%'
    },
    checkbox: {
        marginLeft: 'auto'
    }
}));

const ListItem = (props) => {
    const { item, clickCheckBox } = props;
    const classes = useStyles(props);
    return (
        <div key={item.id} className={classes.eachListItem}>
            {item.avatar
                ? <div className={classes.normalAvatar} />
                : (<div className={classes.noAvatarCase}>
                    <span>{`${item.first_name.charAt(0)}${item.last_name.charAt(0)}`}</span>
                </div>)}
            <div className={classes.nameEmailContainer}>
                <span className={classes.nameSurnameText}>{`${item.first_name} ${item.last_name}`}</span><br></br>
                <span>{item.email}</span>
            </div>
            <div>
                <Checkbox onClick={() => clickCheckBox(item.id)} className={classes.checkbox} checked={item.checked} />
            </div>
        </div >
    )
}

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default ListItem;