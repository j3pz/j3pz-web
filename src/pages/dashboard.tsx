import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { $store } from '../store';
import { Dashboard } from '../components/dashboard/dashboard';
import { UserService } from '../service/user_service';
import { User } from '../model/user';
import { SEO } from '../components/seo';

interface DashboardPageState {
    logged: boolean;
}

export default class DashboardPage extends Component<{}, DashboardPageState> {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
        };
    }


    componentDidMount() {
        if (!$store.user) {
            UserService.getUser(localStorage.getItem('token') ?? '', false).then((user) => {
                if (user) {
                    $store.user = User.fromJson(user.attributes);
                    this.setState({ logged: true });
                } else {
                    navigate('/login');
                }
            });
        }
    }

    render() {
        const { logged } = this.state;
        return (
            <>
                <SEO title="剑网3配装器" />
                <Dashboard store={$store} logged={logged} />
            </>
        );
    }
}
