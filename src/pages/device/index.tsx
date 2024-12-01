import React, { useState } from "react";
import { Table, Select, Input, Button, Tag } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./DeviceList.css";
import AddDeviceButton from "../../components/AddDeviceButton";
import Sidebar from "../../components/sidebar";
import UserSection from "../../components/userSection";
const { Option } = Select;

const DeviceList: React.FC = () => {
  const [search, setSearch] = useState("");

  // Sample data for the table
  const data = [
    {
      key: "1",
      deviceId: "KIO_01",
      deviceName: "Kiosk",
      ip: "192.168.1.10",
      status: "Ngừng hoạt động",
      connection: "Mất kết nối",
      services: "Khám tim mạch, Khám mắt",
    },
    {
      key: "2",
      deviceId: "KIO_02",
      deviceName: "Kiosk",
      ip: "192.168.1.11",
      status: "Hoạt động",
      connection: "Kết nối",
      services: "Khám tim mạch, Khám mắt",
    },
    // More rows...
  ];

  // Table columns
  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "deviceId",
      key: "deviceId",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === "Hoạt động" ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Ngừng hoạt động</Tag>
        ),
    },
    {
      title: "Trạng thái kết nối",
      dataIndex: "connection",
      key: "connection",
      render: (connection: string) =>
        connection === "Kết nối" ? (
          <Tag color="green">Kết nối</Tag>
        ) : (
          <Tag color="red">Mất kết nối</Tag>
        ),
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "services",
      key: "services",
      render: (services: string) => (
        <>
          {services} <a href="#">Xem thêm</a>
        </>
      ),
    },
    {
      title: "",
      key: "actions",
      render: () => (
        <>
          <a href="#" style={{ marginRight: 10 }}>
            Chi tiết
          </a>
          <a href="#">Cập nhật</a>
        </>
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div>
        <div className="user-section">
          <UserSection />
        </div>
        <h2>Danh sách thiết bị</h2>

        <div className="filters">
          <Select defaultValue="Tất cả" style={{ width: 180 }} className="filter">
            <Option value="all">Tất cả</Option>
            <Option value="active">Hoạt động</Option>
            <Option value="inactive">Ngừng hoạt động</Option>
          </Select>
          <Select defaultValue="Tất cả" style={{ width: 180 }} className="filter">
            <Option value="all">Tất cả</Option>
            <Option value="connected">Kết nối</Option>
            <Option value="disconnected">Mất kết nối</Option>
          </Select>
          <Input
            placeholder="Nhập từ khóa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 240 }}
            suffix={<SearchOutlined />}
          />
          {/* Table */}

        </div>
        <div className="next-to-table">
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 5 }}
            className="device-table"
          />

          <AddDeviceButton />
        </div>


      </div>
    </div>
  );
};

export default DeviceList;
