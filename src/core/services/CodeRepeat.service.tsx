
function generateCode() {
    return Math.random().toString(36).substring(2, 10);
}

export { generateCode };
