import Head from "next/head";
import { useCallback } from "react";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { weatherRequestAction } from "../reducers/weather";

const InputTextField = styled.div``;

const PopularAreaField = styled.div`
  padding: 10px 0;
  margin: 20px 0;
  border-top: 1px solid #d9dedd;
  border-bottom: 1px solid #d9dedd;
`;

const DisplayWeather = styled.div``;

const Weather = () => {
  const popularAreaObj = {
    서울: "seoul",
    부산: "busan",
    대전: "daejeon",
    인천: "incheon",
    아산: "asan",
    제주: "jeju",
    대구: "daegu",
    광주: "gwangju",
    천안: "cheonan",
    세종: "sejong",
    수원: "suwon",
    전주: "jeonju",
  };
  const inputTextAreaObj = {
    ...popularAreaObj,
  };

  const { weatherInfo } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const [text, onChangeText, setText] = useInput("");

  const onSubmitInputText = useCallback(
    (e) => {
      e.preventDefault();
      console.log("onSubmitInputText : ", text);
      setText("");
      dispatch(weatherRequestAction(inputTextAreaObj[`${text}`]));
    },
    [text]
  );

  const onSubmitPopularArea = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onSubmitAreaBtn = (area) =>
    useCallback(
      (e) => {
        dispatch(weatherRequestAction(area));
      },
      [area]
    );

  return (
    <>
      <Head>
        <title>BelieveMe | Weather</title>
      </Head>
      <AppLayout headerTitle={"Weather"}>
        <InputTextField>
          <form onSubmit={onSubmitInputText} id="InputText">
            <label htmlFor="area" style={{ fontSize: "20px" }}>
              Area :{" "}
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={text}
              onChange={onChangeText}
              placeholder="Required Field"
              required
              style={{
                width: "400px",
                height: "40px",
                outline: "none",
                border: "1px #001529 solid",
              }}
            ></input>
            <button
              type="submit"
              form="InputText"
              style={{
                padding: "10px",
                backgroundColor: "#001529",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "13px",
                border: 0,
                outline: 0,
                cursor: "pointer",
                width: "60px",
              }}
            >
              submit
            </button>
          </form>
        </InputTextField>
        <PopularAreaField>
          <form id="popularArea" onSubmit={onSubmitPopularArea}>
            <h3>자주 찾는 지역</h3>
            <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
              {Object.keys(popularAreaObj).map((v, i) => {
                return (
                  <li key={i} style={{ marginRight: "10px" }}>
                    <input
                      type="button"
                      onClick={onSubmitAreaBtn(popularAreaObj[`${v}`])}
                      value={v}
                      style={{
                        padding: "5px",
                        backgroundColor: "#001529",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "13px",
                        border: 0,
                        outline: 0,
                        cursor: "pointer",
                        width: "50px",
                        borderRadius: "10px",
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </form>
        </PopularAreaField>
        {weatherInfo && (
          <DisplayWeather>
            <div>{weatherInfo.temp}</div>
            <div>{weatherInfo.humidity}</div>
            <div>{weatherInfo.weather}</div>
            <div>{weatherInfo.description}</div>
            <div>{weatherInfo.image}</div>
            <div>{weatherInfo.wind}</div>
            <div>{weatherInfo.clouds}</div>
            <div>{weatherInfo.country}</div>
            <div>{weatherInfo.area}</div>
          </DisplayWeather>
        )}
      </AppLayout>
    </>
  );
};

export default Weather;
