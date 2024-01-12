module.exports = class KvStorage 
  

  getUrlForKey(key) {
    return `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/storage/kv/namespaces/${this.namespace}/values/${key}`;
  }

  async get(key) {
    const url = this.getUrlForKey(key);

    // eslint-disable-next-line no-undef
    const response = await fetch(url, {
      headers: {
        "X-Auth-Email": this.authEmail,
        "X-Auth-Key": this.authKey,
      },
    });

    if (response.ok) {
      return response.text();
    }

    return null;
  }

  async put(key, value) {
    const url = this.getUrlForKey(key);

    const headers = {
      "X-Auth-Email": this.authEmail,
      "X-Auth-Key": this.authKey,
    };

    // eslint-disable-next-line no-undef
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: value,
    });

    return response.ok;
  }

  async remove(key) {
    const url = this.getUrlForKey(key);

    // eslint-disable-next-line no-undef
    return fetch(url, {
      method: "DELETE",
      headers: {
        "X-Auth-Email": this.authEmail,
        "X-Auth-Key": this.authKey,
      },
    });
  }
};
