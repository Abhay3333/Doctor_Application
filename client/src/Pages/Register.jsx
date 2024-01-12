import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);
  console.log(loading);

  useEffect(() => {
    console.log("Inside useEffect - Loading:", loading);
  }, [loading]);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        "http://localhost:4500/api/users/register",
        values
      );
      if (response.status === 200) {
        toast.success("User Created Successfully !");

        navigate("/login");
      } else if (response.status === 400) {
        toast.error("User already exist !");
      } else {
        toast("User Already Exist !");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("Error");
      toast.error("Something went wrong  !");
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className="authentication">
      <div className="register-form card p-2">
        <h1 className="card-title">Nice to meet you</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-3"
            htmlType="submit"
            disabled={loading}
          >
            {loading ? "Register" : "Register"}
          </Button>

          <Link to="/login" className="anchor">
            Click here to login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
