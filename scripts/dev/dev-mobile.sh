cross-env NODE_ENV=development \
cross-env FILTER_COMP=$@ \
webpack-dev-server --colors --progress --config scripts/sites/webpack.dev.mobile.js
