import {check} from 'k6';
import ws from 'k6/ws';
import http from 'k6/http';

const sessionDuration = 60000;

export const options = {
    vus: 10,
    iterations: 10,
};

export default function () {
    const wsUrl = 'ws://localhost:8000/api/v1/stream/connect/2';
    const streamUrl = 'http://localhost:8000/api/v1/stream/detect';

    const response = ws.connect(wsUrl, {}, function (socket) {
        socket.on('open', () => {
            console.log(`[VU ${__VU}] [WS] Connected`);
        });

        socket.on('close', () => {
            console.log(`[VU ${__VU}] [WS] Disconnected`);
        });

        socket.setTimeout(
            () => {
                console.log(`[VU ${__VU}] [WS] ${sessionDuration/1000}s passed, closing connection`);
                socket.close();
            },
            sessionDuration,
        );

        socket.on('message', (message) => {
            const payload = JSON.parse(message);

            const {key, hasFire} = payload;

            if (typeof hasFire === 'boolean') {
                console.log(`[VU ${__VU}] [WS] Received: detected fire`);
            }

            if (typeof key === 'string') {
                console.log(`[VU ${__VU}] [WS] Received: token ${key}`);

                const response = http.get(`${streamUrl}/${key}`);

                check(response, {
                    [`[VU ${__VU}] [HTTP] Connected successfully`]: (r) => r && r.body && r.body.length > 0,
                });
            }
        });
    });

    check(response, {
        [`[VU ${__VU}] [WS] Connected successfully`]: (r) => r && r.status === 101,
    });
}
