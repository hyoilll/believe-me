import Head from "next/head";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";

import profileLogo from "../images/play.png";
const Text = styled.div`
  margin-bottom: 10px;
`;

const Contact = () => {
  return (
    <>
      <Head>
        <title>BelieveMe | Contact</title>
      </Head>
      <AppLayout headerTitle={"Contact"}>
        <div>
          <div style={{ display: "flex" }}>
            <img
              src={profileLogo}
              alt="profilePhoto"
              style={{ width: "300px", height: "200px", marginRight: "20px" }}
            />
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              <Text style={{ marginTop: "15px" }}>Let's talk</Text>
              <Text>dlgydlf12345@naver.com</Text>
              <Text>dlgydlf123@gmail.com</Text>
              <Text>+82-10-8218-7111</Text>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default Contact;
