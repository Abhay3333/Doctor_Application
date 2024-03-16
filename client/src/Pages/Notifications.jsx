import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor"> Mark all as seen</h1>
          </div>
          {user?.unseenNotification.map((notification) => (
            <div
              className="card p-2"
              onClick={() => navigate(notification.onClickPath)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor"> Delete All</h1>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
