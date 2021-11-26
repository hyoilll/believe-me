import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Form, Input, Button, Checkbox } from "antd";
import useInput from "../hooks/useInput";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";
import Router from "next/router";

const LoginForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const { logInDone } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onFinish = useCallback(
    (e) => {
      console.log(email, password);
      dispatch(loginRequestAction({ email, password }));
    },
    [email, password]
  );

  const onFinishFailed = (error) => {
    console.log("Failed: ", error);
  };

  useEffect(() => {
    if (logInDone) {
      Router.push("/");
    }
  }, [logInDone]);

  return (
    <>
      <Head>
        <title>BelieveMe | Login</title>
      </Head>
      <AppLayout headerTitle={"Login"}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="emailWrapper">
            <label htmlFor="email" style={{ fontSize: "20px" }}>
              email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              style={{ width: "300px", marginLeft: "48px", outline: "none" }}
            ></input>
          </div>
          <div className="passwordWrapper " style={{ marginTop: "10px" }}>
            <label htmlFor="password" style={{ fontSize: "20px" }}>
              password :
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              style={{
                width: "300px",
                marginLeft: "10px",
                outline: "none",
              }}
            ></input>
          </div>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </AppLayout>
    </>
  );
};

export default LoginForm;
