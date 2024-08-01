import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { Warning } from "@mui/icons-material";

function Posts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [modal, setModal] = useState(false);
  const [postToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      getPosts();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      console.log(data.posts);
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    setModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>DATE UPDATED</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>post title</Table.HeadCell>
              <Table.HeadCell>category</Table.HeadCell>
              <Table.HeadCell>delete</Table.HeadCell>
              <Table.HeadCell>edit</Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className=" divide-y" key={post._id}>
                <Table.Row className=" bg-white  dark:bg-gray-800 dark:border-gray-700 ">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className=" w-20 h-10 object-cover bg-gray-500 hover:scale-[110%] transition"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <p className=" font-semibold text-gray-900 dark:text-gray-200">
                        {post.title}
                      </p>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      className=" text-red-600 font-bold hover:underline cursor-pointer"
                      onClick={() => {
                        setModal(true);
                        setPostIdToDelete(post._id);
                      }}>
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className=" text-teal-500 cursor-pointer font-bold"
                      to={`/update-post/${post._id}`}>
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className=" text-teal-500 font-bold text-sm w-full self-center py-10">
              Show More
            </button>
          )}
          <Modal show={modal} onClose={() => setModal(false)} popup size="md">
            <Modal.Header />
            <Modal.Body>
              <div className=" text-center text-gray-400 dark:text-gray-200 my-4 mx-auto">
                <Warning fontSize="large" />
                <h3 className=" font-semibold text-gray-500 dark:text-gray-400 text-lg text-center my-4">
                  Are you sure you want to delete Post ?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDelete}>
                    Yes, i'm sure
                  </Button>
                  <Button color="gray" onClick={() => setModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <>
          <h1>You Have No Posts Yet!! </h1>
        </>
      )}
    </div>
  );
}

export default Posts;
