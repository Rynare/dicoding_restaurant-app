const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onopen = this.onOpenHandler;
    webSocket.onmessage = this.onMessageHandler;
    webSocket.onerror = this.onErrorHandler;
  },
  onOpenHandler(event) {
    console.log(event, "WebSocket connection opened.");
  },
  onMessageHandler(event) {
    console.log("Received message:", event.data);
    console.log("Parsed message:", JSON.parse(event.data));
  },
  onErrorHandler(error) {
    console.error("WebSocket error:", error);
  },
};

export default WebSocketInitiator;
