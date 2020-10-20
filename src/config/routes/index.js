const ENV = process.env.NODE_ENV

const DEV_HOST = `http://localhost`
const PROD_HOST = `http://81.163.28.64`
const HOST = ENV === 'development' ? DEV_HOST : PROD_HOST

export { HOST }

