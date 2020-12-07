const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err, conn) {

    conn.createChannel(function (err, ch) {
        const nomeCanal = 'reuniao123';
        const mensagem = process.argv.slice(2).join(' ') || 'Se voce esta vendo essa mensagem, foi enviada uma mensagem em branco!'; //recebendo msg via console, se estiver em branco sera enviado uma msg padrao
        //passando qual sera o nome do exchange e qual sera a forma que sera ulitizado
        ch.assertExchange(nomeCanal, 'fanout', { durable: false });
        ch.publish(nomeCanal, '', new Buffer.from(mensagem));
        console.log(" - Enviado %s", mensagem);
    });
    setTimeout(function () { conn.close(); process.exit(0) }, 500);
})