// eslint-disable-next-line import/no-extraneous-dependencies
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

exports.onCreateWebpackConfig = ({ actions, stage }) => {
    // If production JavaScript and CSS build
    if (stage === 'build-javascript') {
        // Turn off source maps
        actions.setWebpackConfig({
            devtool: false,
            plugins: [
                new SentryWebpackPlugin({
                    // sentry-cli configuration
                    authToken: process.env.SENTRY_AUTH_TOKEN,
                    org: 'j3pz',
                    project: 'j3pzweb',

                    // webpack specific configuration
                    include: 'src',
                    ignore: ['node_modules'],
                }),
            ],
        });
    }
};
