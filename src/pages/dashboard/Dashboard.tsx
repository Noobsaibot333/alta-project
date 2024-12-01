import React, { useEffect, useState } from "react";
import Calendar from "../../components/calendar/Calendar";
import "./style.css";
import { Color } from "antd/es/color-picker";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartSection from "../../components/charts";
import Sidebar from "../../components/sidebar";
import MainContent from "../../components/mainContent";

const Dashboard = () => {
    const [deviceData, setDeviceData] = useState<any>(null);
    const [serviceData, setServiceData] = useState<any>(null);

    const getDeviceInfo = () => {
        fetch('https://192.168.80.188:7251/api/Device/devicesinfor')
            .then(response => response.json())
            .then((data: any) => {
                setDeviceData(data);
            })
            .catch(error => console.log(error));
    };

    const getServiceInfo = () => {
        fetch('https://192.168.80.188:7251/api/Service/serviceinfor')
            .then(response => response.json())
            .then((data: any) => {
                setServiceData(data);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getDeviceInfo();
        getServiceInfo();
    }, []);

    const deviceCircleData = deviceData
        ? {
            label: `${deviceData.total} Thiết bị`,
            color: "#FF7506",
            value: Math.round((deviceData.active / deviceData.total) * 100),
            value2: Math.round((deviceData.inactive / deviceData.total) * 100),
            active: deviceData.active,
            inactive: deviceData.total - deviceData.active,
        }
        : {
            label: "0 Thiết bị",
            color: "#FF7506",
            value: 0,
            value2: 0,
            active: 0,
            inactive: 0,
        };

    const serviceCircleData = serviceData
        ? {
            label: `${serviceData.total} Dịch vụ`,
            color: "#4277FF",
            value: Math.round((serviceData.active / serviceData.total) * 100),
            active: serviceData.active,
            inactive: serviceData.total - serviceData.active,
        }
        : {
            label: "0 Dịch vụ",
            color: "#4277FF",
            value: 0,
            active: 0,
            inactive: 0,
        };

    const data = [
        deviceCircleData,
        serviceCircleData,
        { label: "Cấp số", color: "#35C75A", value: 86, used: 3721, waiting: 486, skipped: 32 },
    ];

    // Chart
    const dataByDay = [
        { name: "18-11", sl: 5 },
        { name: "19-11", sl: 8 },
        { name: "20-11", sl: 12 },
        { name: "21-11", sl: 7 },
    ];

    const dataByWeek = [
        { name: "Tuần 1", sl: 35 },
        { name: "Tuần 2", sl: 42 },
        { name: "Tuần 3", sl: 28 },
        { name: "Tuần 4", sl: 50 },
    ];

    const dataByMonth = [
        { name: "Tháng 1", sl: 120 },
        { name: "Tháng 2", sl: 150 },
        { name: "Tháng 3", sl: 90 },
        { name: "Tháng 4", sl: 200 },
    ];

    // Hàm dropdown để chọn Ngày, Tuần, hoặc Tháng
    const [viewType, setViewType] = useState("Ngày");
    const [chartData, setChartData] = useState(dataByDay);

    const handleViewChange = (type: string) => {
        setViewType(type);
        if (type === "Ngày") setChartData(dataByDay);
        if (type === "Tuần") setChartData(dataByWeek);
        if (type === "Tháng") setChartData(dataByMonth);
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            {/* <div className="left">
                <div className="logo">
                    <img src="images/image.png" alt="Alta Logo" />
                </div>
                <nav>
                    <ul className="menu">
                        <li className="menu-item active">Dashboard</li>
                        <li className="menu-item">Thiết bị</li>
                        <li className="menu-item">Dịch vụ</li>
                        <li className="menu-item">Cấp số</li>
                        <li className="menu-item">Báo cáo</li>
                        <li className="menu-item">Cài đặt hệ thống</li>
                    </ul>
                </nav>
                <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.reload(); }}>
                    Đăng xuất
                </button>
            </div> */}
            <div>
                {/* <h3 style={{ color: '#FF7506' }}>Dashboard</h3> */}
                {/* <h2 style={{ color: '#FF7506' }}>Biểu đồ cấp số</h2> */}
                <MainContent />
                {/* <div className="middle-container-row">
                    <div className="middle-container">
                        Số thứ tự đã cấp
                    </div>
                    <div className="middle-container">
                        Số thứ tự đã sử dụng
                    </div>
                    <div className="middle-container">
                        Số thứ tự đang chờ
                    </div>
                    <div className="middle-container">
                        Số thứ tự đã bỏ qua
                    </div>
                </div> */}


            </div>
            <div className="right">
                <h2 style={{ color: '#FF7506' }}>Tổng quan</h2>
                {data.map((item, index) => (
                    <div key={index} className="circle-container">
                        <div
                            className="circle-outer"
                            style={{
                                background: `conic-gradient(${item.color} ${item.value * 3.6}deg, #e0e0e0 0deg)`
                            }}
                        >
                            <div className="circle-white">
                                <div className="circle-inner" style={{
                                    background: `conic-gradient(${item.color} ${item.value * 3.6}deg, #e0e0e0 0deg)`
                                }}>
                                    <div className="cir">

                                    </div>
                                    <span className="circle-text">{item.value}%</span>
                                </div>
                            </div>
                        </div>
                        <div className="details">
                            <h4 style={{ color: item.color }}>{item.label}</h4>
                            {'active' in item && <p>Đang hoạt động: {item.active}</p>}
                            {'inactive' in item && <p>Ngưng hoạt động: {item.inactive}</p>}
                            {'used' in item && <p>Đã sử dụng: {item.used}</p>}
                            {'waiting' in item && <p>Đang chờ: {item.waiting}</p>}
                            {'skipped' in item && <p>Bỏ qua: {item.skipped}</p>}
                        </div>
                    </div>
                ))}
                <Calendar />
            </div>
        </div>
    );
};

export default Dashboard;
