import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: 'calc(100% - 60px)',
        overflow: 'auto',
    },
    searchField: {
        width: '100%',
        borderBottom: 'none !important',
    },
    paragraph: {
        textAlign: 'center',
    }
}));

const ListRender = (props) => {
    const { users, onTextFieldChange, showItems, loadMore, hasMore } = props;

    const classes = useStyles();
    return (
        <div id="scrollableDiv" className={classes.container}>
            <TextField
                id="standard-basic"
                variant="standard"
                className={classes.searchField}
                InputProps={{
                    startAdornment:
                        <SearchIcon />,
                    disableUnderline: true
                }}
                onChange={(e) => onTextFieldChange(e)}
            />
            {users.length ? (
                <InfiniteScroll
                    dataLength={showItems(users)?.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={
                        <LinearProgress color="inherit" />
                    }
                    scrollableTarget="scrollableDiv"
                    endMessage={
                        <p className={classes.paragraph}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {showItems(users)}
                </InfiniteScroll>

            ) : <p className={classes.paragraph}>There is no records for given string.</p>}
        </div>
    )
}

ListRender.propTypes = {
    users: PropTypes.array.isRequired,
    onTextFieldChange: PropTypes.func.isRequired,
    showItems: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
};

export default ListRender;