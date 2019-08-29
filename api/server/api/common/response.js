const getBody = (msg, code) => {
    return {
        code,
        msg,
    }
};

export const sendError = (res, err, code) => {
    res.send(getBody(`request failed: ${err}`, code));
};

export const sendSuccess = (res, content) => {
    res.send(getBody(content, 200));
};