var amqp = require("amqplib/callback_api");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "pedidos";
    channel.assertQueue(queue, {
      durable: true,
    });

    console.log("Digite o nome do pedido a ser autorizado.");
    rl.addListener("line", (line) => {
      channel.sendToQueue(queue, Buffer.from(line), { persistent: true });
      console.log(
        "Beleza, mandamos o pedido %s para ser autorizado. Digite o nome do próximo.",
        line
      );
    });
  });
});
