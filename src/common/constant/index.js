const mode = process.env.NODE_ENV || "development";
const isDev = mode === 'development';
export const BASE_NAME = 'admin'
export const API_CONFIG = {
  BASE_URL: isDev ? "http://localhost:3030/api" : "http://blog.bianyc.xyz/api",
};
export const APP_URL = isDev ? "http://localhost:3000/admin" : 'http://blog.bianyc.xyz/admin'

export const STATIC_URL = "http://qa68vnk5w.bkt.clouddn.com/";

export const ARTICLE_TYPES = [
  {
    text: "原创",
    val: 0,
  },
  {
    text: "转载",
    val: 1,
  },
  {
    text: "混合",
    val: 2,
  },
];