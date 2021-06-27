import { ContentType } from "./types";

interface FileReaderFunction<C extends ContentType> {
    (file: File): Promise<C>;
}

export const base64: FileReaderFunction<string> = async (file) => {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; ++i) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

export const dataUrl: FileReaderFunction<string> = async (file) =>
    new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function load() {
            resolve(this.result as string);
        };
        fileReader.onerror = function error() {
            reject(this.error);
        };
        fileReader.readAsDataURL(file);
    });

export const text: FileReaderFunction<string> = async (file) => {
    return file.text();
};

export const binaryString: FileReaderFunction<string> = async (file) =>
    new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function load() {
            resolve(this.result as string);
        };
        fileReader.onerror = function error() {
            reject(this.error);
        };
        fileReader.readAsBinaryString(file);
    });

export const arrayBuffer: FileReaderFunction<ArrayBuffer> = async (file) => {
    return file.arrayBuffer();
};
