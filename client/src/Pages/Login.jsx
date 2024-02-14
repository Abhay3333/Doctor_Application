import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" />
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
