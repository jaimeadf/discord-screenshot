import MIMEType from 'whatwg-mimetype';

interface File {
    filename: string;
    content: Buffer;
    mimeType: MIMEType;
}

export default File;
