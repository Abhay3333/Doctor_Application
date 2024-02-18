import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../redux/alertsSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3400/api/user/login",
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Home page");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" type="email" autoComplete="username" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              placeholder="Password"
              type="password"
              autoComplete="current-password"
            />
          </Form.Item>
          <Button className="primary-button my-3" htmlType="submit">
            Login
          </Button>
          <Link to="/register" className="anchor ">
            Click here to Register
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
