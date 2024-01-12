import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
const Home = () => {
  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4500/api/users/get-user-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  );
};

export default Home;
