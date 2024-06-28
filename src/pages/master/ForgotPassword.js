import React, { useState } from "react";
import axios from "axios";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/forgot.json";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);   

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post("http://34.229.162.248:4000/api/forgot-password", { email });
            const responseData = response.data; 
            if (responseData.status) {
                console.log("Password reset email sent");
                localStorage.setItem('message', JSON.stringify(responseData.message));
                // navigate('/');
            } else {
                console.error('Email is required:', responseData.message);
                alert('Email is required: ' + responseData.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('An error occurred: ' + error.response.data.message);
        }
    };


    return (
        <Box className="mc-auth">
            <Image 
                className="mc-auth-pattern" 
                src={data?.pattern.src} 
                alt={data?.pattern.alt} 
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
                            classes={item.fieldSize}
                            placeholder={item.placeholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            passwordVisible={item.passwordVisible}
                        />
                    ))}
                    <Button 
                        className={`mc-auth-btn ${data?.button.fieldSize}`} 
                        type={data?.button.type}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : data?.button.text}
                    </Button>
                </Form>
                {error && <Text className="mc-auth-error">{error}</Text>}
                {success && <Text className="mc-auth-success">Reset link sent successfully!</Text>}
                <Box className="mc-auth-navigate">
                    <Text as="span">{data?.navigate.title}</Text>
                    <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
                </Box>
            </Box>
        </Box>
    );
}
