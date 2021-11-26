import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";
import Router from "next/router";

const ErrorMsg = styled.div`
  color: red;
`;

const SignUp = () => {
  const [email, onChangeEmail] = useInput();
  const [pw, onChangePw] = useInput();
  const [nickname, onChangeNickname] = useInput();

  const [pwCheck, setPwCheck] = useState("");
  const [pwError, setPwError] = useState("");
  const onChangePwCheck = useCallback(
    (e) => {
      setPwCheck(e.target.value);
      setPwError(e.target.value !== pw);
    },
    [pw]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState("");
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const dispatch = useDispatch();
  const { signUpDone } = useSelector((state) => state.user);

  const onSubmit = useCallback(
    (e) => {
      if (pw !== pwCheck) {
        return setPwError(true);
      }
      if (!term) {
        return setTermError(true);
      }

      dispatch({
        type: SIGN_UP_REQUEST,
      });
    },
    [pw, pwCheck, term]
  );

  useEffect(
    (e) => {
      if (signUpDone) {
        Router.push("/");
      }
    },
    [signUpDone]
  );

  return (
    <>
      <Head>
        <title>BelieveMe | SignUp</title>
      </Head>
      <AppLayout headerTitle={"Sign Up"}>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">E-mail</label>
            <br />
            <Input
              name="user-email"
              type={email} //email type을 추가해줘야 HTML에서 알아서 Email 형식인지 확인해줌
              value={email}
              required
              onChange={onChangeEmail}
            ></Input>
          </div>
          <div>
            <label htmlFor="user-nickName">nickName</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={onChangeNickname}
            ></Input>
          </div>
          <div>
            <label htmlFor="user-pw">Password</label>
            <br />
            <Input
              name="user-pw"
              type="password"
              value={pw}
              required
              onChange={onChangePw}
            ></Input>
          </div>
          <div>
            <label htmlFor="user-pw-check">check Password</label>
            <br />
            <Input
              name="user-pw-check"
              type="password"
              value={pwCheck}
              required
              onChange={onChangePwCheck}
            ></Input>
            {pwError && <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              로봇이 아닙니다.
            </Checkbox>
            {termError && <ErrorMsg>체크박스에 체크해주세요.</ErrorMsg>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit">
              SignUp
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default SignUp;
