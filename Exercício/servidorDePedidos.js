var amqp = require("amqplib/callback_api");

var WebSocketServer = require("ws").Server;
wss = new WebSocketServer({ port: 7474, path: "/pedidos" });
var connections = [];
var pedidos = [];

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

    console.log("Estou à sua disposição esperando por pedidos, meu nobre.");

    channel.consume(
      queue,
      function (msg) {
        console.log("Opa, recebi o pedido %s.", msg.content.toString());
        pedidos.push(msg.content.toString());
        connections.forEach((ws) => {
          ws.send(JSON.stringify(pedidos));
        });
      },
      {
        noAck: true,
      }
    );
  });
});

wss.on("connection", function (ws) {
  ws.on("message", function (message) {
    console.log(message);
    pedidos = pedidos.filter((pedido) => pedido != message);
    connections.forEach((ws) => {
      ws.send(JSON.stringify(pedidos));
    });
  });
  console.log("new connection");
  ws.send(JSON.stringify(pedidos));
  connections.push(ws);
});
