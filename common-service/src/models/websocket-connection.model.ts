import { Schema, model } from "mongoose";

const WebSocketConnectionSchema = new Schema(
    {
        connectionId: { type: String },
        userID: { type: String }
    }, { timestamps: true }
);

const WebSocketConnectionModel = model('webSocketConnection', WebSocketConnectionSchema);
export const webSocketConnection = WebSocketConnectionModel;

export interface WebSocketConnection {
    connectionId: string;
}