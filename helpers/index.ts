import { NextPageContext } from "next";
import userServices from "../services/userServices";
import Cookies from "js-cookie";
import cookie from "cookie";
import atob from "atob";

export const parseJwt = (token: string) => {
  if (token) {
    try {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.log("============");
      console.log(e);
      return null;
    }
  }
};

type UserToken = {
  id: string;
  email: string;
};

export const getTokenSSRandCSS = (
  ctx?: NextPageContext
): [string, UserToken] => {
  ///SSR
  let token = "";
  let userToken = null;
  if (typeof window === "undefined") {
    const cookieStr = ctx?.req?.headers?.cookie || "";

    token = cookie.parse(cookieStr).token;
    userToken = parseJwt(token);

    // if (userToken && userToken.id) {
    //     userRes = await userServices.getUserById(userToken.id)
    //     // console.log(userRes)
    // }
    ///CSS
  } else {
    token = Cookies.get("token") || "";
  }
  return [token, userToken];
};

export const validEmail = (email: string): boolean => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const handleError = (
  key: string,
  value: string,
  password?: string
): string => {
  let error = "";
  if (value.trim().length === 0) {
    return (error = "Trường này là bắt buộc");
  }
  switch (key) {
    case "email":
      if (!validEmail(value)) {
        error = "Email không hợp lệ";
      } else {
        error = "";
      }
      break;
    case "password":
      if (value.trim().length < 6) {
        error = "Mật khẩu quá ngắn nên từ 6 chữ số trở lên";
      } else {
        error = "";
      }
      break;
    case "re_password":
      if (value.trim().length < 6) {
        error = "Mật khẩu quá ngắn nên từ 6 chữ số trở lên";
      } else if (value !== password) {
        error = "Mật khẩu nhập lại không khớp";
      } else {
        error = "";
      }
      break;
  }

  return error;
};

export const hightlightText = (originStr: string, queryStr: string) => {
  const indexStart = originStr
    .toLowerCase()
    .lastIndexOf(queryStr.toLowerCase());
  if (indexStart === -1) return originStr;

  const beforeStr = originStr.substring(0, indexStart);
  const middleStr = originStr.substring(
    beforeStr.length,
    beforeStr.length + queryStr.length
  );
  const afterStr = originStr.substring(beforeStr.length + queryStr.length);

  return beforeStr + `<mark>${middleStr}</mark>` + afterStr;
};
