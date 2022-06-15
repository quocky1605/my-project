// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import api from '../../services/api'
import Cookies from "js-cookie"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  const data = req.body
  // console.log(req.headers.cookie);

  //nếu khác method Post không cho truy cập
  if (method !== "POST") {
    res.statusCode = 200
    res.json({
      status: 500,
      message: "Method not alowed"
    })
  } else {
    const data = req.body
    // console.log(data);
    const currentdate = new Date()
    const nextYear = new Date(currentdate.getFullYear() + 1, currentdate.getMonth())
    try {
      const reqH = await api.callJson('member/login.php', { data, method })
      // console.log(reqH);

      if (reqH.status === 200) {
        res.statusCode = 302
        res.setHeader('Set-Cookie', `token=${reqH.token}; expires=${nextYear.toUTCString()}; Path =/`)
        res.setHeader("Location", "/")
        res.json(reqH)
      } else {
        res.statusCode = 302
        res.setHeader("Location", "/login?error=failed")
        res.json(reqH)
      }

    } catch (e) {
      res.statusCode = 200
      res.json({
        status: 500,
        message: "Internal Sever Error"
      })
    }
  }

}
