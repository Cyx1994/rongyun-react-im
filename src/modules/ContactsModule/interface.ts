
export interface Contacts {
    id: string,
    targetId?: string,
    name: string,
    children?: Contacts[],
}