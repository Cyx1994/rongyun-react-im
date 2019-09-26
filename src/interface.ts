export interface ConversationT1 {
    target: Contact,
    editing?: MessagePrototype,
    history?: RongMessage[]
}

export interface Contact {
    name: string,
}

export interface MessagePrototype {
    message: string | string[]
}

export interface RongMessage {

}