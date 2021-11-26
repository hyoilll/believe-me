import PropTypes from "prop-types";
import { Form, Input } from "antd";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";

import { addComment } from "../reducers/post";

const AddCommentBtn = styled.button`
  width: 110px;
  height: 30px;
  color: white;
  background-color: #001529;
  font-weight: bold;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const nickname = useSelector((state) => state.user.me?.nickname);

  const [commentText, onChangeCommentText, setCommentText] = useInput();

  const dispatch = useDispatch();

  const onSubmitComment = useCallback((e) => {
    console.log("comment");
    dispatch(
      addComment({
        content: commentText,
        postId: post.id,
        userId: id,
        nickname,
      })
    );
  });

  const { addCommentDone } = useSelector((state) => state.post);
  useEffect(
    (e) => {
      if (addCommentDone) {
        setCommentText("");
      }
    },
    [addCommentDone]
  );

  return (
    <>
      <Form onFinish={onSubmitComment}>
        <Form.Item style={{ position: "relative", margin: "0" }}>
          <Input.TextArea
            value={commentText}
            onChange={onChangeCommentText}
            rows={4}
          ></Input.TextArea>
          <AddCommentBtn>Add</AddCommentBtn>
        </Form.Item>
      </Form>
    </>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    User: PropTypes.object,
    content: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default CommentForm;
