declare module sha1 {
    constructor(message)
    create: () => any;
    update: (message: string, ...props) => any;
}