class File {
    name: string;
    content: Buffer;

    constructor(name: string, content: Buffer) {
        this.name = name;
        this.content = content;
    }
}

export default File;
