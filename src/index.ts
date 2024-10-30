import { Hono } from 'hono'
import * as qrcode from 'qrcode'
import {HTTPException} from "hono/http-exception";
const app = new Hono()

app.get('/', async (c,next) => {
  const data = c.req.query('q')
  if (!data) {
    throw new HTTPException(400,{message: 'Missing query parameter "q"'})
  }
  try {
    const qrCodeDataURL = await qrcode.toDataURL(data);
  return c.html(`<img src="${qrCodeDataURL}" alt="QR Code" />`)
  } catch (error) {
    throw new Error('Failed to generate QR code.');
  }
})

export default app
