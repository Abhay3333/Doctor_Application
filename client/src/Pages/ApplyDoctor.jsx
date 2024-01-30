import React from "react";
import Layout from "../components/Layout";
import { Button, Col, Form, Input, Row } from "antd";
import { TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        "http://localhost:4500/api/users/apply-doctor-account",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Doctor Created Successfully !");

        navigate("/");
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
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <hr />

      <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title mt-3">Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true }]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Website"
              name="Website"
              rules={[{ required: true }]}
            >
              <Input placeholder="Website" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <h1 className="card-title mt-3">Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Speacialization"
              name="speacialization"
              rules={[{ required: true }]}
            >
              <Input placeholder="Speacialization" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Fee per Consultation"
              name="feeperConsultation"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter the amount" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex">
          <Button className="primary-button" htmlType="submit">
            Apply
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
