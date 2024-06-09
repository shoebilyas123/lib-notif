const lib = require('../index');
async function main() {
  const execFunc = (msg) => {
    console.log(`Mesage: ${msg.content.toString()}`);
  };

  lib.registerSub({
    URL: 'amqp://localhost',
    _exchange: 'logs',
    noAck: true,
    execFunc,
  });
}

main();
