require('dotenv').config();

let schema;
const mysql = require('@mysql/xdevapi');

const config = {
  user: process.env.MYSQL_USER || 'b994081f814fe2',
  password: process.env.MYSQL_PASSWORD || '29553b05',
  host: process.env.HOSTNAME || 'us-cdbr-east-02.cleardb.com',
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

module.exports = () => (schema
  ? Promise.resolve(schema)
  : mysql.getSession(config)
    .then(async (session) => {
      console.log(session)
      schema = await session.getSchema('heroku_d35758a6591c78f');
      console.log(schema)
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
);
