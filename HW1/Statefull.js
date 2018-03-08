 var net = require('net');

var server = net.createServer(function(c) {
    console.log('socket opened');
    c.setEncoding('utf8');

    c.on('end', function() {
        console.log('Statefull server connection/socket closed');
    });

    c.on('data', function(data) {

      //  console.log(state);

        data = data.slice(0,-2);

        if(data === "open"){
            console.log(state);
            if(state ==='START'){
                c.write('opened order \n');
                state = 'OPEN';
            } else{
                c.write('You have opened order \n');
            }
        }
        else  if(data === 'add'){
            console.log(state);
            if(state ==='OPEN' || state === 'ADDED'){

                i = orders.length + 1;
                orders.push('order ' + i);
                c.write('added order ' + i +' \n');
                state = 'ADDED';
            }  else {
                c.write("You haven't opened order \n");
            }

        } else if(data === 'process'){
            console.log(state);
            if (state === 'ADDED'){
                c.write('processed \n');
               orders = [];
                state = 'PROCESSED';

                if (orders.length === 0) {
                    state = 'START';
                }
            } else {
                c.write("You haven't opened or added order \n");

            }

        } else {
            c.write('Wrong command\n');
        }

    });
});

var state = 'START';
var orders = [];
var i = 0;
server.listen(8124, function() { // start server (port 8124)
    console.log('Statefull server started');
});



