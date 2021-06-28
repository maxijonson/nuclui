import { ContentTypeName, FileObjectFor } from "./types";

interface FileReaderFunction<CTN extends ContentTypeName> {
    (file: File): Promise<FileObjectFor<CTN>["content"]>;
}

export const base64: FileReaderFunction<"base64"> = async (file) => {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; ++i) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

export const dataUrl: FileReaderFunction<"dataURL"> = async (file) =>
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

export const text: FileReaderFunction<"text"> = async (file) => {
    return file.text();
};

export const binaryString: FileReaderFunction<"binaryString"> = async (file) =>
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

export const arrayBuffer: FileReaderFunction<"arrayBuffer"> = async (file) => {
    return file.arrayBuffer();
};
