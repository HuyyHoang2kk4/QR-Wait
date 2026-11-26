import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface WebSocketContextValue {
  connected: boolean;
  subscribe: (topic: string, handler: (payload: unknown) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(undefined);

/**
 * Quan ly ket noi STOMP WebSocket voi auto-reconnect 3 giay (NFR-005).
 */
export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:8080/ws-qrwait';
    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      reconnectDelay: 3000,
      onConnect: () => setConnected(true),
      onDisconnect: () => setConnected(false),
      onWebSocketClose: () => setConnected(false),
    });
    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, []);

  const subscribe = (topic: string, handler: (payload: unknown) => void) => {
    const client = clientRef.current;
    if (!client || !client.connected) {
      return () => {};
    }
    const sub: StompSubscription = client.subscribe(topic, (msg: IMessage) => {
      try {
        handler(JSON.parse(msg.body));
      } catch {
        handler(msg.body);
      }
    });
    return () => sub.unsubscribe();
  };

  return (
    <WebSocketContext.Provider value={{ connected, subscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const ctx = useContext(WebSocketContext);
  if (!ctx) throw new Error('useWebSocket must be used inside WebSocketProvider');
  return ctx;
}
