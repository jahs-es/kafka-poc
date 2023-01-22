const env = process.env.NODE_ENV;

const development = {
  server: {
    port: 3000
  }
};

const test = {
  server: {
    port: 3333
  }
};

const config = {
  development,
  test
};

module.exports = config[env];
