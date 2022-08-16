import { decode as atob, encode as btoa } from "base-64";


export function decodeBase64Url(input) {
    // Replace non-url compatible chars with base64 standard chars
    input = input.replace(/\-/g, '+').replace(/_/g, '/');

    // Pad out with standard base64 required padding characters
    let pad = input.length % 4;
    if (pad) {
        if (pad === 1) {
            throw new Error('Invalid base64url string');
        }
        input += new Array(5 - pad).join('=');
    }
    return input;
}

export function base64ToBuffer(base64) {
    let binary_string = atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)]
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('');
}