import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);
  console.log(loading);

  useEffect(() => {
    console.log("Inside useEffect - Loading:", loading);
  }, [loading]);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:4500/api/users/login",
        values
      );

      console.log(response);

      if (response.status === 200) {
        toast.success("User logged In Successfully !");
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else if (response.status === 211) {
        toast.error("Password or username not matched !");
      } else {
        toast.error("User does not exist");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error");
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className="authentication">
      <div className="register-form card p-2">
        <h1 className="card-title">Welcome Back !</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              placeholder="Password"
              type="password"
              className="current-password"
            />
          </Form.Item>

          <Button
            className="primary-button my-3"
            htmlType="submit"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </Button>

          <Link to="/register" className="anchor">
            Click here to Register
          </Link>
        </Form>
      </div>
    </div>
  );
};
export default Login;
