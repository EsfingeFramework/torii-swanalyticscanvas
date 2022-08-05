import React, {useEffect, useState} from "react";
import {
    AppShell,
    Navbar,
    Header,
    MediaQuery,
    Burger,
    Text,
    Aside,
    useMantineTheme,
    Grid,
    SimpleGrid,
    Space,
    Group,
    Button,
    UnstyledButton, Menu, Divider, Center, TextInput, ScrollArea
} from '@mantine/core'
import { Avatar } from '@mantine/core';
import LogoComponent from "./LogoComponent";
import {useNavigate} from "react-router-dom";
import UserInListComponent from "./UserInListComponent";



const NavbarComp = () => {

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [openedA, setOpenedA] = useState(false);
    const [openedF, setOpenedF] = useState(false);

    let navigate = useNavigate();
    function routeChange(page) {
        navigate(page);
    }

    function logOut(){
        sessionStorage.clear();
        routeChange("/login");
        window.location.reload(false);
    }

    return(
        <div>
            <AppShell
                padding="md"
                header={
                    <Header height={70} p="md">
                        <Group sx={{ height: '100%' }} px={20} position="apart">
                            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                    <Burger
                                        opened={opened}
                                        onClick={() => setOpened((o) => !o)}
                                        size="sm"
                                        color={theme.colors.gray[6]}
                                        mr="xl"
                                    />
                                </MediaQuery>
                                <LogoComponent />
                            </div>
                                {sessionStorage.getItem('username') == null ? (
                                    <Avatar src="avatar.png" alt="it's me" style={{cursor:"pointer"}} onClick={ () => {routeChange("login") }} />
                                ) : (
                                    <Avatar src={null} alt={sessionStorage.getItem('username')} color="cyan" style={{cursor:"pointer"}} onClick={() => setOpenedA((o) => !o)}>
                                        {sessionStorage.getItem('username').slice(0, 2).toUpperCase()}
                                    </Avatar>
                                )}
                        </Group>
                    </Header>
                }
                navbar={
                    <Navbar p="md" fixed hiddenBreakpoint="10000000" hidden={!opened} width={{ sm: "100%", lg: 300 }}>
                        <Button variant="filled" color="dark">
                                <Text size="lg">My Projects</Text>
                        </Button>
                        <Button variant="filled" color="dark">
                                <Text size="lg">Friends</Text>
                        </Button>
                        <Button variant="filled" color="dark">
                                <Text size="lg">Teams</Text>
                        </Button>
                    </Navbar>
                }
                aside={
                    <Aside p="md" fixed hiddenBreakpoint="10000000" hidden={!openedA} width={{ sm: 200, lg: 300 }}>
                        <Button variant="filled" color="dark">
                            <Text size="lg">Settings</Text>
                        </Button>
                        <Button onClick={() => setOpenedF((o) => !o)} variant="filled" color="dark">
                            <Text size="lg">Friends</Text>
                        </Button>
                        <div hidden={!openedF} align="center" >
                            <Divider my="sm" />
                                <UserInListComponent />
                            <Divider my="sm" />
                        </div>
                        <Button variant="filled" color="dark" onClick={() => {logOut()}}>
                            <Text color="red" size="lg">Log-Out</Text>
                        </Button>
                        <Button variant="filled" color="dark"  onClick={ () =>{alert(sessionStorage.getItem('friends'))}}>
                            Check Value
                        </Button>
                    </Aside>
                }
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
            >
            </AppShell>
        </div>
    )
}

export default NavbarComp;
