import { useState } from "react";
import { Modal } from "./Modal";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function PostComp({ post }: { post: any }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="card bg-base-100 w-96 shadow-2xl" key={post.id as string}>
      {post.imageLink && post.imageLink != "" ? (
        <figure>
          <img src={post.imageLink as string} alt="Post Image" />
        </figure>
      ) : null}
      <div className="card-body">
        <div className="flex items-center gap-[2vw]">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={post.author.avatarLink} />
            </div>
          </div>
          <h1 className="font-semibold">Username: {post.author.username}</h1>
        </div>
        <h2 className="card-title">Title: {post.title}</h2>
        <p className="capitalize">{post.content}</p>
        <button className="btn btn-error" onClick={() => setOpenModal(true)}>
          Delete
        </button>
        <Modal
          openModal={openModal}
          closeModal={() => {
            setOpenModal(false);
          }}
        >
          <h1>Are you sure you want to delete this post?</h1>
          <div className="flex justify-center gap-[3vw]">
            <button
              className="btn btn-error"
              onClick={() => {
                axios
                  .delete(`/api/posts/${post.id}`, {
                    headers: {
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  })
                  .then((res) => {
                    alert("Deleted");
                    window.location.reload();
                  })
                  .catch((err) => {
                    alert(err.response.data);
                  });
              }}
            >
              Delete
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-neutral"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
