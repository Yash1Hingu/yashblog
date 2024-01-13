export function isUsername(value) {
    if (value.length < 6 || value.length > 16) {
        return "Username must be between 6 and 16 characters.";
    }
    if (!/^[a-zA-Z]/.test(value)) {
        return "Username must start with an upper or lower case letter.";
    }
    if (!/[0-9]/.test(value)) {
        return "Username must contain at least one number.";
    }
    return false;
}

export function isPassword(value){
    if (value.length < 8 || value.length > 16) {
        return "Password must be between 8 and 16 characters.";
    }
    if (!/[a-zA-Z]/.test(value)) {
        return "Password must contain an upper or lower case letter.";
    }
    if (!/[0-9]/.test(value)) {
        return "Password must contain at least one number.";
    }
    return false;
}
export function isEmail(value) {
    return value.includes('@') && value.includes('.com');
}

export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
    return value.length === minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
    return value === otherValue;
}