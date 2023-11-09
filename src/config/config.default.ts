import { CoolConfig, MODETYPE } from '@cool-midway/core';
import { MidwayConfig } from '@midwayjs/core';
// import * as fsStore from '@cool-midway/cache-manager-fs-hash';
import * as redisStore from 'cache-manager-ioredis';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: 'cool-admin for node',
  koa: {
    port: 8001,
  },
  // 模板渲染
  view: {
    mapping: {
      '.html': 'ejs',
    },
  },
  swagger: {
    auth: {
      authType: 'basic',
    },
  },
  consul: {
    provider: {
      // 注册本服务
      register: true,
      // 应用正常下线反注册
      deregister: true,
      // consul server 服务地址
      host: '10.18.18.27',
      // consul server 服务端口
      port: '8500',
      // 调用服务的策略(默认选取 random 具有随机性)
      strategy: 'random',
    },
    service: {
      // 此处是当前这个 midway 应用的地址
      address: '10.18.18.27',
      // 当前 midway 应用的端口
      port: 8001,
      // 做泳道隔离等使用
      // tags: ['tag1', 'tag2'],
      name: 'admin'
      // others consul service definition
    }
  },
  // 文件上传
  upload: {
    fileSize: '200mb',
    whitelist: null,
  },
  // 缓存 可切换成其他缓存如：redis http://midwayjs.org/docs/extensions/cache
  cache: {
    store:redisStore,
    options: {
      // host: '123.60.138.144',
      host: '192.168.196.100',
      password: 'sean3306',
      port: 6379,
      db: 5,
      // keyPrefix: 'cache:',
      ttl: null,
    },
    // store: fsStore,
    // options: {
    //   path: 'cache',
    //   ttl: -1,
    // },
  },
  cool: {
    file: {
      // 上传模式 本地上传或云存储
      mode: MODETYPE.LOCAL,
      // 本地上传 文件地址前缀
      domain: 'http://127.0.0.1:8001',
    },
    redis: {
      host: "192.168.196.100",
      port: 6379,
      password: "sean3306",
      db: 3
    }
  } as CoolConfig,
} as MidwayConfig;
