import { Button } from "antd";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import { addCourse, INITIALIZE_VALUES } from "../reducers/course";
import Router from "next/router";

const CheckArea = styled.ul``;

const WritingTitle = styled.div`
  margin-top: 30px;
`;

const FileUpload = styled.div`
  margin-top: 30px;
`;

const FileBtn = styled.button`
  width: 120px;
  height: 40px;
  color: white;
  background-color: #001529;
  font-weight: bold;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const Description = styled.div`
  margin-top: 40px;
`;

const RapperTitle = styled.div`
  display: flex;
  /* font-size: 20px;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: red;
  color: #fff; */
`;

const ButtonRapper = styled.div`
  margin-top: 30px;
  padding-right: 5%;
  display: flex;
  justify-content: flex-end;
`;

const RegisterCourse = () => {
  const areaArr = [
    "서울/경기",
    "충청남도",
    "충청북도",
    "강원도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주도",
  ];
  let areaIdx = 0;

  const me = useSelector((state) => state.user?.me);
  const id = me && me.id;
  const nickname = me && me.nickname;

  const { addCourseDone } = useSelector((state) => state.course);

  const [title, onChangeTitle, setTitle] = useInput("");
  const [description, onChangeDescription, setDescription] = useInput("");
  const [areas, setArea] = useState([]);
  const [inputCheck, setInputCheck] = useState("");

  const dispatch = useDispatch();

  const fileInput = useRef();

  const onClickFileUpload = useCallback((e) => {
    fileInput.current.click();
  }, []);

  const onClickBtnSave = useCallback(
    (e) => {
      console.log("save");
      dispatch(
        addCourse({
          userId: id,
          userNickname: nickname,
          title: title,
          area: areas,
          filePath: "filepath",
          description: description,
        })
      );
    },
    [id, nickname, title, description]
  );

  const onChangeInputCheck = (idx) => (e) => {
    areaIdx = idx;
    setArea((prev) => {
      return [areaArr[areaIdx], ...prev];
    });
  };

  const onClickBtnCancel = useCallback((e) => {
    console.log("cancel");
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  useEffect(
    (e) => {
      if (addCourseDone) {
        Router.push("/");
      }
      dispatch({
        type: INITIALIZE_VALUES,
      });
    },
    [addCourseDone]
  );

  return (
    <>
      <Head>
        <title>BelieveMe | RegisterCourse</title>
      </Head>
      <AppLayout headerTitle={"Register Course"}>
        {me ? (
          <form onSubmit={onSubmit}>
            <CheckArea
              style={{ display: "flex", listStyle: "none", paddingLeft: "0px" }}
            >
              {areaArr.map((e, i) => {
                return (
                  <li key={i} style={{ marginRight: "20px" }}>
                    <input
                      type="checkbox"
                      id={i}
                      name="Area"
                      value={inputCheck}
                      onChange={onChangeInputCheck(i)}
                    />
                    <label htmlFor={i}>{e}</label>
                  </li>
                );
              })}
            </CheckArea>
            <WritingTitle>
              <RapperTitle>
                <label
                  htmlFor="Title"
                  style={{
                    width: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#001529",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  <span>Title</span>
                </label>
                <input
                  type="text"
                  id="Title"
                  name="Title"
                  value={title}
                  onChange={onChangeTitle}
                  style={{
                    width: "85%",
                    border: "1px #001529 solid",
                    outline: "none",
                  }}
                  placeholder="Required Field"
                  required
                ></input>
              </RapperTitle>
            </WritingTitle>
            <FileUpload>
              <input type="file" multiple hidden ref={fileInput}></input>
              <FileBtn onClick={onClickFileUpload} style={{ width: "100px" }}>
                File Upload
              </FileBtn>
            </FileUpload>
            <Description>
              <label
                htmlFor="Description"
                style={{
                  display: "block",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                <span
                  style={{
                    padding: "10px",
                    backgroundColor: "#001529",
                    color: "#fff",
                  }}
                >
                  Description
                </span>
              </label>
              <textarea
                id="Description"
                name="Description"
                value={description}
                onChange={onChangeDescription}
                rows="8"
                style={{ marginTop: "5px", width: "95%", outline: "none" }}
                required
              ></textarea>
            </Description>
            <ButtonRapper>
              <input
                type="button"
                value="Save"
                style={{
                  padding: "10px",
                  backgroundColor: "#001529",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "13px",
                  border: 0,
                  outline: 0,
                  cursor: "pointer",
                  marginRight: "10px",
                  width: "60px",
                }}
                onClick={onClickBtnSave}
              ></input>
              <input
                type="button"
                value="Cancel"
                style={{
                  padding: "10px",
                  backgroundColor: "#001529",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "13px",
                  border: 0,
                  outline: 0,
                  cursor: "pointer",
                }}
                onClick={onClickBtnCancel}
              ></input>
            </ButtonRapper>
          </form>
        ) : (
          <div>로그인해주세요.</div>
        )}
      </AppLayout>
    </>
  );
};

export default RegisterCourse;
