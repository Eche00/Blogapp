import { Button, Textarea } from "flowbite-react";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Comments(postId) {
  const { currentUser } = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  return (
    <div className=" max-w-2xl mx-auto w-full p-3 ">
      {currentUser ? (
        <div className=" flex items-center gap-1 my-5 text-gray-500 text-sm flex-col">
          <img
            className=" w-10 h-10 object-cover rounded-full"
            src={currentUser.avatar}
            alt=""
          />
          <Link
            to="/dashboard?tab=profile"
            className=" text-xs text-cyan-600 hover:underline">
            {currentUser.username}
          </Link>
          {currentUser && (
            <form className=" border border-teal-500 rounded-md p-3 w-full">
              <Textarea
                placeholder="Add a comment..."
                rows="3"
                maxLength="200"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              <div className="flex justify-between items-center mt-5">
                <p className=" text-gray-500 text-xs">
                  {200 - content.length} characters remaining.
                </p>
                <Button outline gradientDuoTone="purpleToBlue" type="submit">
                  Send
                </Button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          <h2>You must be signed in to comment.</h2>
          <Link to="/signin" className=" text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}

export default Comments;
