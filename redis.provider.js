const Redis = require('ioredis');
const RedisStorageAdapter = require('./storage/redis-storage-adapter');

exports.register = async (container) => {

    container.singleton('redis', async () => {
        let config = await container.make('config');
        return new Redis(config.redis);
    });

};


exports.boot = async (container) => {
    let storageFactory = await container.make('storage.factory');

    storageFactory.register('redis', async () => {
        return new RedisStorageAdapter(
            await container.make('redis'),
            await container.make('serializer')
        );
    });
};