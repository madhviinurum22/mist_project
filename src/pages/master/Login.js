import React, { useState } from "react";
import { Box, Form, Heading, Button, Anchor, Image } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {

            email: userData.email,
            password: userData.password
        };

        try {
            const response = await axios.post('http://34.229.162.248:4000/api/admin/mist/login', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = response.data; 
            if (responseData.status) {
                console.log("Login successful");
                localStorage.setItem('message', JSON.stringify(responseData.message));
                navigate('/analytics');
            } else {
                console.error('Login failed:', responseData.message);
                alert('Login failed: ' + responseData.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('An error occurred: ' + error.response.data.message);
        }
    };

    const handleInputChange = (e, type) => {
        const { value } = e.target;
        setUserData({ ...userData, [type]: value });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <Box className="mc-auth">
            <Image
                alt={data?.pattern.alt}
                className="mc-auth-pattern"
            />
            <Box className="mc-auth-group">
                <Logo
                    src={data?.logo.src}
                    alt={data?.logo.alt}
                    href={data?.logo.path}
                    className="mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{data?.title}</Heading>
                <Form className="mc-auth-form" onSubmit={handleSubmit}>
                    {data?.input.map((item, index) => (
                        <IconField
                            key={index}
                            icon={item.icon}
                            type={item.type}
                            option={item.option}
                            classes={item.fieldSize}
                            placeholder={item.placeholder}
                            passwordVisible={item.passwordVisible}
                            onChange={e => handleInputChange(e, item.type === 'email' ? 'email' : 'password')}
                            onKeyPress={handleKeyPress}
                        />
                    ))}

                    <Button className={`mc-auth-btn ${data?.button.fieldSize}`} type={data?.button.type} onClick={handleSubmit}>{data?.button.text}</Button>
                    <Anchor className="mc-auth-forgot" href={data?.forgot.path}>{data?.forgot.text}</Anchor>
                </Form>
            </Box>
        </Box>
    );
}
