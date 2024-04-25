import CONFIG from "../../globals/config.js";
import WebSocketInitiator from "./websocket-initiator.js";

window.addEventListener('load', () => {
    WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
})