import AppLayout from "../components/AppLayout";
import { Form, Input, Button, Checkbox } from "antd";
import useInput from "../hooks/useInput";
import { useCallback, useEffect } from "react";

const changeInfo = () => {
  const [email, onChangeEmail] = useInput("");

  const onFinish = useCallback(() => {}, []);

  const onFinishFailed = (error) => {
    console.log("Failed: ", error);
  };
  return (
    <>
      <AppLayout>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="emailWrapper" style={{ marginBottom: "10px" }}>
            <label for="email" style={{ fontSize: "20px" }}>
              New Nickname :
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

export default changeInfo;
