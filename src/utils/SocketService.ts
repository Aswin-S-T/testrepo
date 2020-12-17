import socket from 'socket.io';
let io: { sockets: { emit: (event: any, values: any) => void; }; } | null = null;

/**
 * Create socket connection
 *
 * @param
 */
export const socketConnection = (server: import("http").Server | import("https").Server) => {
    io = socket(server);
    console.log("Made socket connection");
}

/**
 * Emit messages
 *
 * @param
 */
export const socketEmit = (event: any, values: any) => {
    if (io) {
        // console.log(values);
        io.sockets.emit(event, values);
    }
}