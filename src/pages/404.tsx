import React from 'react';

import Main from '../components/layouts/Main';
import SEO from '../components/seo';

const NotFoundPage = () => (
    <Main>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Main>
);

export default NotFoundPage;
