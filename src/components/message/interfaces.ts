import { IChunkData, IChunkMetaData } from "@/api/query";

export interface IMessage{
    role: string,
    content: string,
}

export interface IUserMessage extends IMessage {
}


export interface IAssistantMessage extends IMessage {
    sources?: Array<IChunkData>
}