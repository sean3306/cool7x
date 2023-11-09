import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import * as ipdb from 'ipip-ipdb';
import * as _ from 'lodash';
import axios from "axios";
import * as path from "path";
import * as fs from "fs";
import {Reader} from "@maxmind/geoip2-node";
import IP2Region from "ip2region";
import * as CryptoJS from 'crypto-js';

/**
 * 帮助类
 */
@Provide()
export class Utils {
  @Inject()
  baseDir;

  @Inject()
  appDir;

  /**
   * aes解密
   * @param pass
   * @param value
   */
  async aesDecrypt(pass:string,value:string){
    const bytes = CryptoJS.AES.decrypt(value, pass, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  /**
   * aes 加密
   * @param pass
   * @param value
   */
  async aesEncrypt(pass:string,value:string){
    const cipherText = CryptoJS.AES.encrypt(value, pass, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return cipherText.toString();
  }


  /**
   * 获得请求IP
   */
  async getReqIP(ctx: Context) {
    const ips =
        (ctx.req.headers['x-forwarded-for'] as string) ||
        (ctx.req.headers['X-Real-IP'] as string) ||
        (ctx.req.headers['x-real-ip'] as string) ||
        (ctx.req.headers['x-natapp-ip'] as string) ||
        (ctx.ip.replace('::ffff:', '') as string) ||
        (ctx.req.socket.remoteAddress.replace('::ffff:', '') as string);

    return ips;
    // return ( req.headers['x-forwarded-for'] || req.socket.remoteAddress.replace('::ffff:', ''));
  }

  async getIp2region(ip?:string){
    const query = new IP2Region();
    const res = query.search(ip);
    return res;
  }

  /**
   * 通过第三方工具获取具体的IP信息
   * {
   *     "coordinates": {
   *         "latitude": 30.6498,
   *         "longitude": 104.0555
   *     },
   *     "ip": "182.148.59.150",
   *     "isp": "China Telecom",
   *     "host": {
   *         "ip_address": "182.148.59.150",
   *         "prefix_len": 13
   *     },
   *     "status": false,
   *     "country": "China",
   *     "region": "Sichuan",
   *     "city": "Chengdu",
   *     "location": "China, Sichuan, Chengdu",
   *     "area_code": "Unknown",
   *     "country_code": "CN"
   * }
   */
  async getNordVPNByIP(ip?:string){
    const ipInfo = await axios.get("https://nordvpn.com/wp-admin/admin-ajax.php",
        {
          params:{
            action:"get_user_info_data",
            ip: ip
          }
        });
    return ipInfo.data;
  }

  /**
   * 通过mmdb获取IP的具体信息
   */
  async getMMDBByIP(ip?:string){
    const dbBuffer = fs.readFileSync(path.join(`${this.appDir}/Country.mmdb`));
    const reader = Reader.openBuffer(dbBuffer);
    const ipDetail = reader.country(ip);
    return ipDetail;
  }



  /**
   * 根据IP获得请求地址
   * @param ip 为空时则为当前请求的IP地址
   */
  async getIpAddr(ctx: Context, ip?: string | string[]) {
    try {
      if (!ip) {
        ip = await this.getReqIP(ctx);
      }
      const bst = new ipdb.BaseStation(`${this.baseDir}/comm/ipipfree.ipdb`);
      const result = bst.findInfo(ip, 'CN');
      const addArr: any = [];
      if (result) {
        addArr.push(result.countryName);
        addArr.push(result.regionName);
        addArr.push(result.cityName);
        return _.uniq(addArr).join('');
      }
    } catch (err) {
      return '无法获取地址信息';
    }
  }

  /**
   * 去除对象的空值属性
   * @param obj
   */
  async removeEmptyP(obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === '' || obj[key] === 'undefined') {
        delete obj[key];
      }
    });
  }

  /**
   * 线程阻塞毫秒数
   * @param ms
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
