import React from 'react';
import SEO from '../components/seo';
import Header from '../components/header/Header';
import CoreEdit from '../core/edit';
import $store from '../core/store';

const AppPage = () => (
    <>
        <Header type="border" mode="simple" />
        <SEO title="配装" />
        <CoreEdit store={$store} />
    </>
);

export default AppPage;
