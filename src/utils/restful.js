export const CALL_TYPE_DELETE = 'DELETE';
export const CALL_TYPE_GET = 'GET';
export const CALL_TYPE_POST = 'POST';
export const CALL_TYPE_PUT = 'PUT';

export const CONTENT_TYPE_JSON = 'application/json';

export const CONTENT_TYPES = [
    CONTENT_TYPE_JSON,
];

const {REACT_APP_API_URL='http://localhost:3100/api'} = process.env;

const makeCall = (parameters) => new Promise((resolve, reject) => {
    const {
        method,
        payload,
        URL
    } = parameters;

    const headers = new Headers({
        Accept: CONTENT_TYPES.join(', '),
        'Content-Type': CONTENT_TYPE_JSON
    });

    const body = payload ? JSON.stringify(payload) : undefined;

    fetch(`${REACT_APP_API_URL}${URL}`, {
        body,
        headers,
        method
    }).then((response = {}) => {
        const {
            headers: responseHeaders,
            ok
        } = response;

        const contentType = responseHeaders.get('Content-Type');

        const isResponseJSON = contentType && contentType.includes(CONTENT_TYPE_JSON);

        if (ok) {
            if (isResponseJSON) {
                response.json().then((data) => {
                    resolve(JSON.parse(JSON.stringify(data)));
                });
            } else {
                resolve(response);
            }
        } else if (isResponseJSON) {
            response.json().then((data) => {
                reject(JSON.parse(JSON.stringify(data)));
            });
        } else {
            reject(response);
        }
    }).catch((response) => {
        reject(response);
    }).finally(() => {
    });
});

export default makeCall;
