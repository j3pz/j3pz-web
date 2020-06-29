import React from 'react';
import { Link } from 'gatsby';

import Main from '../components/layouts/Main';
import SEO from '../components/seo';

const SecondPage = () => (
    <Main>
        <SEO title="Page two" />
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <Link to="/">Go back to the homepage</Link>
    </Main>
);

export default SecondPage;
