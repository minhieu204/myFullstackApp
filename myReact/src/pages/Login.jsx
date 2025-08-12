import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { loginApi } from '../util/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const onFinish = async(values) => {
        const {email, password} = values;
        const res = await loginApi(email, password);

        if (res && res.EC === 0){
            localStorage.setItem("accessToken", res.accessToken);
            api.success({
                message: "LOGIN",
                description: "Success"
            });
            navigate("/");
        }else{
            api.error({
                message: "LOGIN",
                description: res?.EM ?? "Error"
            })
        } 


        console.log(res);
    };
    return (
        <div style={{margin: 50}}>
            {contextHolder}
            <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="off"
            layout='vertical'
            >
            <Form.Item
            label="Email"
            name="email"
            rules={[
            {
            required: true,
            message: 'Please input your email!',
            },
            ]}
            >
            <Input />
            </Form.Item>
            <Form.Item
            label="Password"
            name="password"
            rules={[
            {
            required: true,
            message: 'Please input your password!',
            },
            ]}
            >
            <Input.Password />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit">
                Login
            </Button>
            </Form.Item>
            </Form>
        </div>
    )
}