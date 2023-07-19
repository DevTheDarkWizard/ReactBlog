import React, { useState, useEffect } from "react";
import Image from 'next/image';
import moment from "moment";
import Link from "next/link";

import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if(slug) {
      getSimilarPosts(categories, slug)
        .then((result) => setRelatedPosts(result));
    } else {
      getRecentPosts()
        .then((result) => setRelatedPosts(result));
    }
  }, [slug]);



  return (
	  <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <div className="inline-block w-full overflow-hidden relative box-border m-0">
              <div className="w-[64px] h-[64px]">
                <Image 
                  unoptimized
                  alt={post.title}
                  className="align-middle rounded-full"
                  src={post.featuredImage.url}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format("MMM DD, YYYY")}</p>
            <Link href={`/post/${post.slug}`} key={post.title} className="text-md">{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
};

export default PostWidget;