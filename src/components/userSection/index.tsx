// components/UserSection.tsx
import React from "react";
import { Avatar, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import "./UserSection.css";

const UserSection: React.FC = () => {
  return (
    <div className="user-section">
      {/* Notification Bell */}
      <Badge count={5} offset={[10, 0]}>
        <BellOutlined className="notification-icon" />
      </Badge>
      {/* User Info */}
      <div className="user-info">
        <Avatar
          src="https://via.placeholder.com/40" // Replace with actual image source
          size="large"
        />
        <div className="greeting">
          <p>Xin chào</p>
          <h3>Lê Quỳnh Ái Vân</h3>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
