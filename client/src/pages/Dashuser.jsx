import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { Warning } from "@mui/icons-material";

function Dashuser() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [modal, setModal] = useState(false);
  const [userToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      getUsers();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      console.log(data.posts);
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
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
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>DATE CREATED</Table.HeadCell>
              <Table.HeadCell>USER PROFILE</Table.HeadCell>
              <Table.HeadCell>USERNAME</Table.HeadCell>
              <Table.HeadCell>EMAIL</Table.HeadCell>
              <Table.HeadCell>ADMIN</Table.HeadCell>
              <Table.HeadCell>DELETE</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className=" divide-y">
                <Table.Row className=" bg-white  dark:bg-gray-800 dark:border-gray-700 ">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className=" w-10 h-10 rounded-full  object-cover bg-gray-500 hover:scale-[110%] transition"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <p className=" font-semibold text-gray-900 dark:text-gray-200">
                      {user.username}
                    </p>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <p className=" text-sm text-green-400 font-extrabold">
                        √
                      </p>
                    ) : (
                      <p className=" text-sm text-red-600 font-bold">X</p>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className=" text-red-600 font-bold hover:underline cursor-pointer"
                      onClick={() => {
                        setModal(true);
                        setUserIdToDelete(user._id);
                      }}>
                      Delete
                    </span>
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
                  Are you sure you want to delete this User ?
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
          <h1>You Have No Dashuser Yet!! </h1>
        </>
      )}
    </div>
  );
}

export default Dashuser;
