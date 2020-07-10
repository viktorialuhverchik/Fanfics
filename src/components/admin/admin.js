import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 
import { Table, Button, Input } from 'reactstrap';
import userService from '../../services/user.service';

export default class Users extends Component {
    constructor() {
        super();

        this.state = {
            users: [],
            isSelected: false
        };

        this.handleChangeAll = this.handleChangeAll.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.unblockUser = this.unblockUser.bind(this);
        this.blockUser = this.blockUser.bind(this);
    }
   
    renderUsers() {
        return this.state.users.map(user => {
            return (
                <tr key={user.id}>
                    <th scope="row">
                        <Input className="input"
                                type="checkbox"
                                onChange={(event) => { this.handleChange(user.id, event); }}
                                checked={user.isSelected} />
                    </th>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{this.getStatusText(user.blocked)}</td>
                </tr>
            );
        });
    }

    getStatusText(status) {
        let text = status ? 'blocked' : 'active';

        return text;
    }

    async componentDidMount() {
        const users = await userService.getUsers();

        this.setState(() => {
            return {
                users: users.map(user => {
                    user.isSelected = false;
                    return user;
                })
            };
        });
    }

    handleChangeAll (event) {
        let users = this.state.users;
        users.forEach(user => {
            return user.isSelected = event.target.checked
        })
        this.setState({users: users});
    }

    handleChange(userId, event) {
        let users = this.state.users;
        users.forEach(user => {
            if (user.id === userId) {
                return user.isSelected = event.target.checked
            }
        })
        this.setState({users: users});
    }
   
    blockUser() {
        let users = this.state.users;
        let usersForBlock = users.filter(user => {
            if (user.isSelected) {
                return true;
            } else {
                return false;
            }
        });

        try {
            const result = userService.blockAndUnblockProfiles(usersForBlock, 'block');
            console.log(result);
            let email = localStorage.getItem('email');
            let currentUser = usersForBlock.find(user => user.email === email);
            if (currentUser) {
                return this.setState({redirect: '/login'});
            }
        } catch(error) {
            console.log(error);
        }

        let updatedUsers = users.map(user => {
            if (user.isSelected === true) {
                user.blocked = true;
            }

            return user;
            });
        this.setState(() => {
            return { users: updatedUsers };   
        });
    }
    
    unblockUser() {
        let users = this.state.users;
        let usersForUnblock = users.filter(user => {
            if (user.isSelected) {
                return true;
            } else {
                return false;
            }
        });

        try {
            const result = userService.blockAndUnblockUsers(usersForUnblock, 'unblock');
            console.log(result);
        } catch(error) {
            console.log(error);
        }

        let updatedUsers = users.map(user => {
            if (user.isSelected === true) {
                user.blocked = false;
            }
            return user;
        });
        this.setState(() => {
            return { users: updatedUsers };   
        });
    }

    deleteUser() {
        let users = this.state.users;
        let usersForDelete = users.filter(user => {
            if (user.isSelected) {
                return true;
            } else {
                return false;
            }
        });

        try {
            const result = userService.deleteUser(usersForDelete);
            console.log(result);
            let email = localStorage.getItem('email');
            let currentUser = usersForDelete.find(user => user.email === email);
            if (currentUser) {
                return this.setState({redirect: '/login'});
            }
        } catch(error) {
            console.dir(error);
        }

        let usersForSave = users.filter(user => {
            if (user.isSelected === false) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({users: usersForSave});
    }
    
    render() {
        let users = [];

        if (this.state.users.length) {
            users = this.renderUsers()
        }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h1>Users</h1>
                <div>
                    <Button
                    className="btn"
                    onClick={this.blockUser}
                    style={{
                        backgroundColor: '#1a936f',
                        border: 'none'
                    }}>
                    Block
                    </Button>
                    <Button
                    className="btn"
                    onClick={this.unblockUser}
                    style={{
                        backgroundColor: '#1a936f',
                        border: 'none'
                    }}>
                    Unblock
                    </Button>
                    <Button
                    className="btn-trash btn"
                    onClick={this.deleteUser}
                    style={{
                        backgroundColor: '#1a936f',
                        border: 'none'
                    }}>
                        <i className="fa fa-trash"></i>
                    </Button>
                </div>
                <Table>
                    <thead>
                        <tr>
                        <th><Input className="input-all" type="checkbox" onChange={this.handleChangeAll} /></th>
                        <th>id</th> 
                        <th>Name</th>
                        <th>Email</th>
                        <th className="status">Status</th>
                        </tr>
                    </thead>
                    <tbody> 
                        { users }
                    </tbody>
                </Table>
            </div>
        )
    }
}