/**
 * @implements StorageAdapter
 */
class RedisStorageAdapter {

    /**
     *
     * @param {*} redis
     * @param {Serializer} serializer
     */
    constructor(redis, serializer) {
        this.redis = redis;
        this.serializer = serializer;
    }

    /**
     *
     * @param key
     * @param valueIfNotExisted
     * @return {Promise.<*>}
     */
    async get(key, valueIfNotExisted = null) {

        let rawResult = await this.redis.get(key);

        if (!rawResult) {
            return valueIfNotExisted;
        }

        return this.serializer.deserialize(rawResult);
    }

    /**
     *
     * @param key
     * @param value
     * @param options
     * @return {Promise.<void>}
     */
    async set(key, value, options = {}) {

        let serialized = this.serializer.serialize(value);
        await this.redis.set(key, serialized);
    }

    /**
     *
     * @param key
     * @return {Promise.<void>}
     */
    async unset(key) {
        await this.redis.set(key, null);
    }

    /**
     *
     * @return {Promise.<void>}
     */
    async flush() {
        await this.redis.truncate();
    }

    /**
     *
     * @return {Promise.<void>}
     */
    async cleanup() {
        await this.redis.del();
    }

    getByTag(tag) {
        return [];
    }

    setDefaultTTL(defaultTTL) {
    }

    prepare() {

    }
}

module.exports = RedisStorageAdapter;
