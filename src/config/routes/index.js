const ENV = process.env.NODE_ENV
const port = 3000

const DEV_HOST = `http://localhost:${port}`
const PROD_HOST = `http://81.163.28.64:${port}`
const HOST = ENV === 'development' ? DEV_HOST : PROD_HOST

export { HOST }

