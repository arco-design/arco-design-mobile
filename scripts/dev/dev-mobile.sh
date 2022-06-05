export NODE_ENV=development
export FILTER_COMP=$@
# echo "$FILTER_COMP"
webpack-dev-server --colors --progress --config scripts/sites/webpack.dev.mobile.js
