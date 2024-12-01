import React, { useState } from 'react';
import './style.css';
import { Button, Form, Input, message } from 'antd';
import logo from '../../images/Logo.png'

type LayoutType = Parameters<typeof Form>[0]['layout'];
type LoginProps = {
    handleSuccess: (isLogin: boolean) => void
}
const Login = (props: LoginProps) => {
    const handleFinish = (values: any) => {
        console.log(values.userName); console.log(values.password);
        fetch('https://192.168.80.188:7251/api/Authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: values.userName,
                password: values.password,
                role: "1"
            })
        }).then(response => response.json())
            .then(data => {
                if (data == 'Invalid credentials') {
                    message.info('Incorrect user name or password');
                }
                else {
                    localStorage.setItem("token", data.token);
                    props.handleSuccess(true);
                }
            }).catch(error => message.info(error));
    }
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('vertical');

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

    const loginRequest = () => {

    }
    return (
        <div className="container">
            <div className="left">
                <img src={logo} alt="Logo" className="logo" />
                <Form
                    layout={formLayout}
                    form={form} onFinish={handleFinish}
                    initialValues={{ layout: formLayout }}
                    onValuesChange={onFormLayoutChange}
                    style={{ maxWidth: formLayout === 'inline' ? 'none' : 300 }}
                >
                    <Form.Item name="userName" label="Tên đăng nhập *">
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Mật khẩu *">
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item>
                        <a href="#" className="forgot-password">Quên mật khẩu?</a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit' className="login-button">Đăng nhập</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="right">
                <div className="info-section">
                    <p>Hệ thống</p>
                    <h2>QUẢN LÝ XẾP HÀNG</h2>
                    <img src="../../images/image2.png" alt="Queue Management Illustration" className="illustration" />
                </div>
            </div>
        </div>
    );
};

export default Login;
