import MIMEType from 'whatwg-mimetype';

interface File {
    fileName: string;
    content: Buffer;
    mimeType: MIMEType;
}

export default File;
