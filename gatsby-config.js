module.exports = {
    siteMetadata: {
        title: '剑网3配装器',
        description: '始于 2013 年，做最懂剑三玩家的游戏工具。',
        author: '@魔术师胖叔叔',
    },
    plugins: [
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
            },
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                // The property ID; the tracking code won't be generated without it
                trackingId: 'UA-17530182-11',
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: true,
                // Setting this parameter is optional
                anonymize: true,
                // Setting this parameter is also optional
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                exclude: [],
                // Delays sending pageview hits on route update (in milliseconds)
                pageTransitionDelay: 0,
                // Enables Google Optimize using your container Id
                // optimizeId: 'YOUR_GOOGLE_OPTIMIZE_TRACKING_ID',
                // Enables Google Optimize Experiment ID
                // experimentId: 'YOUR_GOOGLE_EXPERIMENT_ID',
                // Set Variation ID. 0 for original 1,2,3....
                // variationId: 'YOUR_GOOGLE_OPTIMIZE_VARIATION_ID',
                // Defers execution of google analytics script after page load
                defer: false,
                // Any additional optional fields
                sampleRate: 5,
                siteSpeedSampleRate: 10,
                cookieDomain: 'j3pz.com',
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
