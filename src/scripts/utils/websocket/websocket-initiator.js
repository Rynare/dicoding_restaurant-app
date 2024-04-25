const WebSocketInitiator = {
    init(url) {
        const webSocket = new WebSocket(url);
        webSocket.onopen = this._onOpenHandler;
        webSocket.onmessage = this._onMessageHandler;
        webSocket.onerror = this._onErrorHandler;
    },
    _onOpenHandler(event) {
        console.log('WebSocket connection opened.');
    },
    _onMessageHandler(event) {
        console.log('Received message:', event.data);
        console.log('Parsed message:', JSON.parse(event.data));
    },
    _onErrorHandler(error) {
        console.error('WebSocket error:', error);
    },
};


export default WebSocketInitiator;