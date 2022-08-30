type Queries = Record<string, string | number | boolean>;
type Headers = Record<string, string>;

enum Method {
  GET = 'GET',
  POST = 'POST',
}

enum ResponseType {
  Text = 'text',
  JSON = 'json',
  Blob = 'blob',
  ArrayBuffer = 'arraybuffer',
}

interface Options {
  method?: Method;
  body?: string | FormData | Blob | ArrayBuffer | null;
  queries?: Queries;
  headers?: Headers;
  responseType?: ResponseType;
  timeout?: number;
  withCredentials?: boolean;
}

const getQueryString = (queries: Queries) => {
  return Object.entries(queries)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

const appendQueryStringToUrl = (url: string, qs: string) => {
  if (!qs || !url) return url;
  const questionMarkIndex = url.indexOf('?');
  if (questionMarkIndex === -1) {
    return `${url}?${qs}`;
  }
  if (questionMarkIndex === url.length - 1) {
    return `${url}${qs}`;
  }
  return url[url.length - 1] === '&' ? `${url}${qs}` : `${url}&${qs}`;
};

// 重点关注 request 方法
const request = <T = any>(url: string, options?: Options): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const {
      method = Method.GET,
      body = null,
      queries = {},
      headers = {},
      responseType = ResponseType.JSON,
      timeout = 0,
      withCredentials = true,
    } = options || {};
    const requestUrl = appendQueryStringToUrl(url, getQueryString(queries));

    const xhr = new XMLHttpRequest();
    xhr.open(method, requestUrl);

    // 设置响应类型
    xhr.responseType = responseType;

    // 设置请求头
    if (responseType === ResponseType.JSON) {
      xhr.setRequestHeader('Accept', 'application/json');
    }
    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    // 设置超时时间和 Credentials
    xhr.timeout = timeout;
    xhr.withCredentials = withCredentials;

    // 绑定事件回调
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = () => {
      reject(new Error(xhr.statusText));
    };

    xhr.send(body);
  });
};

const xhrGet = <T = any>(url: string, options?: Options): Promise<T> => {
  return request<T>(url, { ...options, method: Method.GET });
};

const xhrPost = <T = any>(url: string, options?: Options): Promise<T> => {
  return request<T>(url, { ...options, method: Method.POST });
};

export const XHR = {
  get: xhrGet,
  post: xhrPost,
};
