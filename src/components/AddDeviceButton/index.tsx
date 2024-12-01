// components/AddDeviceButton.tsx
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./AddDeviceButton.css";

const AddDeviceButton: React.FC = () => {
  return (
    <div className="add-device-button">
      <PlusOutlined className="icon" />
      <p>Thêm thiết bị</p>
    </div>
  );
};

export default AddDeviceButton;
