module.exports = class KvStorage {
constructor ({accountId, namespace, authEmail, authkey, ttl}) {

this.accountId = '4d0c2f790a9c822bf8627c782d9eb866';
this. namespace = '0591f8fd08d1434cbe12c0fd06d92a7b';
this.authEmail = 'josh@bysshe.co.uk';
this.authKey = '62bf903855da183ebcac537adbf059027a029';
this.ttl = 60;
}
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
