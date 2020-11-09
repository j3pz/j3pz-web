module.exports = {
    siteMetadata: {
        title: '剑网3配装器',
        description: '始于 2013 年，做最懂剑三玩家的游戏工具。',
        author: '@魔术师胖叔叔',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-google-gtag',
            options: {
                // You can add multiple tracking ids and a pageview event will be fired for all of them.
                trackingIds: [
                    'G-HTNX630B9C', // Google Analytics / GA
                    // 'AW-CONVERSION_ID', // Google Ads / Adwords / AW
                ],
                // This object gets passed directly to the gtag config command
                // This config will be shared across all trackingIds
                gtagConfig: {
                    // optimize_id: 'OPT_CONTAINER_ID',
                    anonymize_ip: false,
                    cookie_expires: 0,
                },
                // This object is used for configuration specific to this plugin
                pluginConfig: {
                    // Puts tracking script in the head instead of the body
                    head: false,
                    // Setting this parameter is also optional
                    respectDNT: false,
                    // Avoids sending pageview hits from custom paths
                    exclude: [],
                },
            },
        },
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/images`,
            },
        },
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-plugin-less',
            options: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
        'gatsby-plugin-ts',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'gatsby-starter-default',
                short_name: 'starter',
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/images/site-icon.png', // This path is relative to the root of the site.
            },
        },
        {
            resolve: '@sentry/gatsby',
            options: {
                dsn: 'https://ff7dc3938bf84f339d410d2a67659428@o182745.ingest.sentry.io/5498631',
                sampleRate: 0.7,
                ignoreErrors: [
                    "Can't find variable: jsConnectBridge",
                    '$ is not defined',
                    "Cannot read property 'nodeName' of null",
                    "Cannot read property 'getBoundingClientRect' of undefined",
                ],
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
