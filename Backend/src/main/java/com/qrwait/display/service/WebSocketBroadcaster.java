package com.qrwait.display.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.Map;

/**
 * Module M8: Bo phat su kien WebSocket STOMP chi gui sau khi DB Transaction da COMMIT thanh cong.
 */
@Component
public class WebSocketBroadcaster {

    public record WsBroadcastEvent(String destination, Map<String, Object> payload) {}

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketBroadcaster(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onAfterCommit(WsBroadcastEvent event) {
        messagingTemplate.convertAndSend(event.destination(), event.payload());
    }
}
