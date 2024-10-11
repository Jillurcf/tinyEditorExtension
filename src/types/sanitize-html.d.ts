declare module 'sanitize-html' {
    interface IOptions {
      allowedTags?: string[];
      allowedAttributes?: { [key: string]: string[] };
      exclusiveFilter?: (frame: any) => boolean;
      transformTags?: { [tagName: string]: any };
    }
  
    export default function sanitizeHtml(dirty: string, options?: IOptions): string;
  }
  