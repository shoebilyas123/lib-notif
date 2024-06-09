var amqp = require('amqplib');

exports.registerPub = async function ({ URL = '', exchange = '' }) {
  try {
    const conn = await amqp.connect(URL);
    const channel = await conn.createChannel();
    var _exchange = exchange;

    await channel.assertExchange(_exchange, 'fanout', {
      durable: false,
    });

    return {
      conn,
      publish: async (msg) => {
        channel.publish(exchange, '', Buffer.from(msg));
        console.log('Message pubished');
      },
    };
  } catch (err) {
    throw err;
  }
};

exports.registerSub = async function ({
  URL = '',
  _exchange = '',
  noAck = true,
  execFunc,
}) {
  if (!execFunc) {
    throw new Error('Consumer function not attached');
  }
  const connection = await amqp.connect(URL);
  const channel = await connection.createChannel();

  var exchange = _exchange;

  channel.assertExchange(exchange, 'fanout', {
    durable: false,
  });

  const queue = await channel.assertQueue('', {
    exclusive: true,
  });

  console.log(
    ' [*] Waiting for messages in %s. To exit press CTRL+C',
    queue.queue
  );
  channel.bindQueue(queue.queue, exchange, '');

  channel.consume(queue.queue, execFunc, {
    noAck,
  });
};
