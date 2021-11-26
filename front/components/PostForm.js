import { Input } from "antd";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../hooks/useInput";

import { addPost } from "../reducers/post";

const ImageBtn = styled.button`
  width: 110px;
  height: 30px;
  color: white;
  background-color: #001529;
  font-weight: bold;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const UploadBtn = styled.button`
  width: 110px;
  height: 30px;
  color: white;
  background-color: #001529;
  font-weight: bold;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const PostForm = () => {
  const [text, onChangeText, setText] = useInput("");
  const imageInput = useRef();

  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  const nickname = me && me.nickname;
  const id = me && me.id;

  const { addPostDone } = useSelector((state) => state.post);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onClickUploadImage = useCallback((e) => {
    imageInput.current.click();
  }, []);

  const onClickUploadPost = useCallback(
    (e) => {
      dispatch(addPost(text, { id: id, nickname: nickname }));
    },
    [text, id, nickname]
  );

  useEffect(
    (e) => {
      if (addPostDone) {
        setText("");
      }
    },
    [addPostDone]
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={300}
          placeholder="건의하실 내용을 입력해주세요."
        ></Input.TextArea>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <input type="file" multiple hidden ref={imageInput}></input>
            <ImageBtn onClick={onClickUploadImage}>Upload Image</ImageBtn>
          </div>
          <UploadBtn onClick={onClickUploadPost}>Upload Post</UploadBtn>
        </div>
      </form>
    </>
  );
};

export default PostForm;
