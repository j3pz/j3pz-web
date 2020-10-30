import React from 'react';

import { Main } from '../components/layouts/Main';
import { SEO } from '../components/seo';

const NotFoundPage = () => (
    <Main>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>链接似乎有误</p>
    </Main>
);

export default NotFoundPage;
