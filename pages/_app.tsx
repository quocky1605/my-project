import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/globals.css'
import "../styles/header.scss"
import "nprogress/nprogress.css"
import "../assets/css/style.css"
import "../assets/css/loading.css"


// css
import { useEffect, useMemo, useState } from "react"
import cookie from "cookie"
import App, { AppContext, AppProps } from "next/app"
import fetch from "isomorphic-fetch"
import es6Promise from "es6-promise"
import Script from 'next/script'
import Head from 'next/head'
import NPropgress from "nprogress"

import { Header } from '../components/Header'
import { Footer } from "../components/Footer"
import { parseJwt, getTokenSSRandCSS } from "../helpers"
import { useGlobalState } from "../state"
import userServices from "../services/userServices"
import Cookies from "js-cookie"
import postsServices from "../services/postsServices"

function MyApp({ Component, pageProps, router }: AppProps) {

  const pathname = router.pathname

  const [, setCategories] = useGlobalState("categories")
  const [, setToken] = useGlobalState("token")
  const [currentUser, setCurrentUser] = useGlobalState("currentUser")
  const [loadingPage, setLoadingPage] = useState(false)


  useMemo(() => {
    setCategories(pageProps.categories)
    setToken(pageProps.token)
    setCurrentUser(pageProps.userInfo)
  }, [])



  useEffect(() => {

    router.events.on('routeChangeStart', (url) => {
      // setLoadingPage(true)
      NPropgress.set(0.4)
      NPropgress.start()
    });
    router.events.on('routeChangeComplete', (url) => {
      // setLoadingPage(false)
      NPropgress.set(1)
      NPropgress.done()
    })
  }, [])


  ///Giấu header Login,Register
  const hiddenHeader = useMemo(() => {
    const include = ["/login", "/register"]
    const currentRouter = pathname
    return include.indexOf(currentRouter) !== -1
  }, [pathname])

  ///Giấu footer
  const hiddenFooter = useMemo(() => {
    const include = ["/", "/post/[postId]"]
    const currentRouter = pathname
    return include.indexOf(currentRouter) !== -1
  }, [pathname])
  // console.log(hiddenFooter);

  return (
    <div id="root">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <meta name="keywords" content="HTML5 Template" />
        <meta name="description" content="Cộng đồng chế ảnh ZendVN" />
        <meta name="author" content="etheme.com" />
        <link rel="icon" href="/favicon.ico" />
        <title>Cộng đồng chế ảnh ZendVN</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />


        <link rel="stylesheet" href="/fonts/font-awesome/css/font-awesome.css" />
        <link rel="stylesheet" href="/fonts/emotion/style.css" />

      </Head>
      {
        !hiddenHeader && <Header />
      }

      <main><Component {...pageProps} /></main>
      {
        !hiddenFooter && <Footer />
      }
      {loadingPage &&
        <div className="loadingPage">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx={50} cy={50} fill="none" stroke="#abaeb5" strokeWidth={10} r={35} strokeDasharray="164.93361431346415 56.97787143782138">
              <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
            </circle>
          </svg>
        </div>
      }




    </div>

  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`

  let userPos = null, categoriesPos = null

  const appProps = await App.getInitialProps(appContext);
  const [token, userToken] = getTokenSSRandCSS(appContext.ctx)
  // console.log("token", token);
  // console.log("user", userToken);
  if (typeof window === "undefined") {
    if (userToken?.id && userToken?.email) {

      userPos = await userServices.getUserById(userToken.id)
    }
    categoriesPos = postsServices.getListCategories()
  }

  const [userRes, categoriesRes] = await Promise.all([userPos, categoriesPos])
  return {
    pageProps: {
      ...appProps.pageProps,
      token,
      categories: categoriesRes?.categories || [],
      userInfo: userRes?.user || null
    }
  }
}


export default MyApp
