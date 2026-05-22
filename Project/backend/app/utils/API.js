import http from "http";
import https from "https";

class API {
  constructor({ baseURL, headers = {}, useHttps = false }) {
    try {
      console.log(baseURL)
        this.baseURL = new URL(baseURL);
        this.defaultHeaders = headers;
        this.client = useHttps ? https : http;
        
    } catch (error) {
        console.log({error})
    }
  }

  request(method, path, body = null, headers = {}) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.baseURL.hostname,
        port: this.baseURL.port,
        path,
        method,
        headers: {
          "Content-Type": "application/json",
          ...this.defaultHeaders,
          ...headers,
        },
      };
      const req = this.client.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const parsed = data ? JSON.parse(data) : {};
            resolve({ status: res.statusCode, data: parsed });
          } catch (err) {
            resolve({ status: res.statusCode, data });
          }
        });
      });

      req.on("error", (err) => reject(err));

      if (body) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }

  get(path, headers = {}) {
    return this.request("GET", path, null, headers);
  }

  post(path, body, headers = {}) {
    return this.request("POST", path, body, headers);
  }

  put(path, body, headers = {}) {
    return this.request("PUT", path, body, headers);
  }

  patch(path, body, headers = {}) {
    return this.request("PATCH", path, body, headers);
  }

  delete(path, headers = {}) {
    return this.request("DELETE", path, null, headers);
  }
}

export default API;
