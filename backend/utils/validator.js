import { ApiError } from "./ApiError.js"

export const checkEmptyStringAndTrim = (str, name="Field") => {
    if (!str || !str.trim()) {
        throw new ApiError(400, `${name} is required`)
    }
    str = str.trim();
    return str;
}

export const checkRequired = (obj, name="Field") => {
    if (!obj) {
        throw new ApiError(400, `${name} is required`);
    }
}

export const checkExistence = (obj, name="Resource") => {
    if (!obj) {
        throw new ApiError(404, `${name} not found`);
    }
}