const lib = require('../index');

async function main() {
  const { conn, publish } = await lib.registerPub({
    URL: 'amqp://localhost',
    exchange: 'logs',
  });

  publish('Hello world');
  //   setTimeout(() => {
  //     conn.close();
  //     console.log('Closing connection');
  //   }, 3000);
}

main();
