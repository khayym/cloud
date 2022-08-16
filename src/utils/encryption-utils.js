export async function hash256(buffer) {
    const hash = await crypto.subtle.digest('SHA-256', buffer);
    return hash;
}
