import React from 'react';
import { recruitmentChallengeUrl } from '../consts/urls'
import ListRender from './listRender';
import ListItem from '../common/listItem';
const axios = require('axios');

const sortListAlphabetically = (users) => {
    const newUsers = [...users];
    return newUsers.sort((a, b) => a.last_name.localeCompare(b.last_name))
}

const filterUsers = (users, userInput) => {
    const parsedUserInput = userInput.split(' ');
    switch (parsedUserInput.length) {
        case 1:
            return users.filter(user => user.first_name.includes(userInput) || user.last_name.includes(userInput))
        case 2:
            return users.filter(user => user.first_name.includes(parsedUserInput[0]) && user.last_name.includes(parsedUserInput[1]))
        default:
            return [];
    }
}

const addCheckedKey = (users) => {
    const usersWithCheckedKey = [...users];
    return usersWithCheckedKey.map(user => ({ ...user, checked: false }))
}



const List = () => {
    const users = React.useRef([])
    const [filteredUsers, setFilteredUsers] = React.useState([])
    const itemsPerPage = 20;
    const loadNewPageTimer = 1000;
    const [hasMore, setHasMore] = React.useState(true);
    const [records, setrecords] = React.useState(itemsPerPage);
    const loadMore = () => {
        if (records === users.length) {
            setHasMore(false);
        }
        else if (users.length < itemsPerPage) {
            setrecords(users.length);
            setHasMore(false);
        }
        else {
            setTimeout(() => {
                const nextPage = records + itemsPerPage > users.length
                    ? records + (users.length - records)
                    : records + itemsPerPage;
                setrecords(nextPage);
            }, loadNewPageTimer);
        }
    };

    const showItems = (users) => {
        var items = [];
        const test = users.length > records ? records : users.length;
        for (var i = 0; i < test; i++) {
            items.push(
                <ListItem key={records.id} item={users[i]} clickCheckBox={clickCheckBox} />
            );
        }
        return items;
    };

    const onTextFieldChange = (e) => {
        setrecords(itemsPerPage)
        setHasMore(true)
        handleFilterByUserInput(e)
    }

    const handleFilterByUserInput = (event) => {
        const { target } = event;
        setFilteredUsers(filterUsers(users.current, target.value))
    };

    const getUsers = () => {
        axios.get(recruitmentChallengeUrl).then(resp => {
            setFilteredUsers(addCheckedKey(sortListAlphabetically(resp.data)));
            users.current = sortListAlphabetically(resp.data);
        });
    }

    const clickCheckBox = (id) => {
        const newFilteredUsers = [...filteredUsers];
        newFilteredUsers[filteredUsers.findIndex(user => user.id === id)].checked = !newFilteredUsers[filteredUsers.findIndex(user => user.id === id)].checked;
        setFilteredUsers(newFilteredUsers);
    }

    React.useEffect(() => {
        getUsers();
    }, [])

    return <ListRender
        users={filteredUsers}
        onTextFieldChange={onTextFieldChange}
        loadMore={loadMore}
        hasMore={hasMore}
        showItems={showItems}
    />
}

export default List;