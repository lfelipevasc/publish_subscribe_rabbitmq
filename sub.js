const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err, conn) {

    conn.createChannel(function (err, ch) {
        //exchange assinado
        const nomeCanal = 'reuniao123';
        ch.assertExchange(nomeCanal, 'fanout', { durable: false });
        ch.assertQueue('', { exclusive: true }, function (err, q) {
            console.log(" - Esperando mensagem em %s.", q.queue);
            ch.bindQueue(q.queue, nomeCanal, '');
            //consumindo oa dados da fila
            ch.consume(q.queue, function (mensagem) {
                console.log(" - %s", mensagem.content.toString());
            }, { noAck: true });
        });
    });
})