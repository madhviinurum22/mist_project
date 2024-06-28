import React, { useContext, useState, useRef } from 'react';
import {  ProfileDropdown } from '../components/header';
import { Button, Section, Box, Input } from "../components/elements";
import { DrawerContext } from '../context/Drawer';
import { ThemeContext } from '../context/Themes';
import { Logo } from '../components';
import data from "../data/master/header.json";

export default function Header() {

    const { drawer, toggleDrawer } = useContext(DrawerContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const searchRef = useRef();
    const [scroll, setScroll] = useState("fixed");

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) setScroll("sticky");
        else setScroll("fixed");
    });

   

    return (
        <Section as="header" className={`mc-header ${ scroll }`}>
            <Logo 
                src = { data?.logo.src }
                alt = { data?.logo.alt }
                name = { data?.logo.name }
                href = { data?.logo.path } 
            />
            <Box className="mc-header-group">
                <Box className="mc-header-left">
                    
                    <Button 
                        icon={ drawer ? "menu_open" : "menu" } 
                        className="mc-header-icon toggle" 
                        onClick={ toggleDrawer } 
                    />
                    
                </Box>
                <Box className="mc-header-right">
                    <Button 
                        icon={ theme }
                        title={ data.theme.title }
                        onClick={ toggleTheme }
                        className={`mc-header-icon ${ data.theme.addClass }`}
                    />
                    
                   
                    <ProfileDropdown 
                        name={ data.profile.name }
                        image={ data.profile.image }
                        username={ data.profile.username }
                        dropdown={ data.profile.dropdown }
                    />
                </Box>
            </Box>
        </Section>
    );
}

