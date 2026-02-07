axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(
    config => {
        const contentType = config.headers && (config.headers['Content-Type'] || config.headers['content-type']);
        if (contentType && contentType.indexOf('application/json') !== -1) {
            config.data = typeof config.data === 'string' ? config.data : JSON.stringify(config.data || {});
        } else if (config.data && typeof config.data === 'object') {
            config.data = Qs.stringify(config.data, {
                arrayFormat: 'repeat'
            });
        }
        return config;
    },
    error => Promise.reject(error)
);