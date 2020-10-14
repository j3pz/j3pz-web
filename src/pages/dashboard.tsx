import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { $store } from '../core/store';
import { Dashboard } from '../core/components/dashboard';
import { UserService } from '../core/service/user_service';
import { User } from '../core/model/user';

export default class DashboardPage extends Component {
    componentDidMount() {
        if (!$store.user) {
            UserService.getUser(localStorage.getItem('token') ?? '', false).then((user) => {
                if (user) {
                    $store.user = User.fromJson(user.attributes);
                } else {
                    navigate('/login');
                }
            });
        }
    }

    render() {
        return (
            <>
                <Dashboard store={$store} />
            </>
        );
    }
}
