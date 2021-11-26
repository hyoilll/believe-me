import Proptypes from "prop-types";
import { Layout, Menu } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { logoutRequestAction } from "../reducers/user";

const { Header, Sider, Content, Footer } = Layout;

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  color: white;
  font-size: 25px;
  font-style: oblique;
  font-weight: bold;
  text-align: center;
  line-height: 1;
`;

const LogInOutBtn = styled.span`
  border: 1px solid black;
  padding: 5px 10px;
  background-color: #001529;
  border-radius: 15px;
  color: gray;
  :hover {
    color: white;
  }
`;

const BtnRapper = styled.div``;

const AppLayout = ({ children, headerTitle }) => {
  const { me, logInDone } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onClickLogOutBtn = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <>
      <Layout>
        <Sider>
          <Link href="/">
            <a>
              <Logo className="logo">BelieveMe</Logo>
            </a>
          </Link>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1">
              <Link href="/">
                <a>Area</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/weather">
                <a>Weather</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="/registerCourse">
                <a>Register_course</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link href="/community">
                <a>Community</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link href="/feedback">
                <a>Feedback</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{
              padding: 0,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px",
                marginRight: "30px",
              }}
            >
              <div style={{ marginRight: "20px", fontWeight: "bold" }}>
                {me && `${me.nickname} 님`}
              </div>
              {logInDone ? (
                <>
                  <BtnRapper
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    <Link href="/">
                      <a>
                        <LogInOutBtn onClick={onClickLogOutBtn}>
                          LogOut
                        </LogInOutBtn>
                      </a>
                    </Link>
                  </BtnRapper>
                  <BtnRapper>
                    <Link href="/changeInfo">
                      <a>
                        <LogInOutBtn>ChangeInfo</LogInOutBtn>
                      </a>
                    </Link>
                  </BtnRapper>
                </>
              ) : (
                <>
                  <BtnRapper
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    <Link href="/loginForm">
                      <a>
                        <LogInOutBtn>LogIn</LogInOutBtn>
                      </a>
                    </Link>
                  </BtnRapper>
                  <BtnRapper>
                    <Link href="/signUp">
                      <a>
                        <LogInOutBtn>SignUp</LogInOutBtn>
                      </a>
                    </Link>
                  </BtnRapper>
                </>
              )}
            </div>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360, backgroundColor: "#fff" }}
            >
              <h1
                style={{
                  marginBottom: "30px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {headerTitle}
              </h1>
              <div>{children}</div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Lee hyo il ©2021</Footer>
        </Layout>
      </Layout>
    </>
  );
};

AppLayout.propTypes = {
  children: Proptypes.node.isRequired,
};

export default AppLayout;
