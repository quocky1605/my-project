import React, { useEffect } from 'react'
import type { NextPage, NextPageContext } from 'next'
import { GetServerSideProps } from "next"
import { InferGetServerSidePropsType } from "next"

import Image from 'next/image'
import styles from '../styles/Home.module.css'


import { PostList } from '../components/PostList'
import { HomeSidebar } from '../components/HomeSidebar'
import postsServices from '../services/postsServices'
import { getTokenSSRandCSS } from '../helpers'


export type PostType = {
  PID: string;
  USERID: string;
  fullname: string;
  profilepicture: string;
  url_image: string;
  post_content: string;
  time_added: string;
  status: string;
  count: string | null
}

type HomeDataProps = {
  listPosts: PostType[];
  userPosts: PostType[]
}
type HomeProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const Home: HomeProps = ({ listPosts, userPosts }) => {

  // useEffect(() => {
  //   console.log("ListPosts", listPosts);
  //   console.log("UserPosts", userPosts);

  // }, [])
  return (
    <div className="container">
      <div className='row'>
        <div className='col-lg-8'>
          <PostList
            listPosts={listPosts}
          />
        </div>
        <div className='col-lg-4'>
          <HomeSidebar
            userPosts={userPosts}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeDataProps> = async (context) => {

  const ctx = context as NextPageContext;
  const [token, userToken] = getTokenSSRandCSS(ctx)
  const userid = userToken?.id

  const listPostsPos = postsServices.getPostsPagging()
  const userPostsPos = postsServices.getPostByUserId({ userid, token })
  const [listPostsRes, userPostsRes] = await Promise.all([listPostsPos, userPostsPos])


  // console.log(listPostsRes);
  console.log(userPostsRes);

  const props = {
    listPosts: listPostsRes?.posts || [],
    userPosts: userPostsRes?.posts || []
  }

  return {
    props, // will be passed to the page component as props
  }
}
export default Home
