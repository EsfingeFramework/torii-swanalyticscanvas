import React , {useEffect, useState}from "react";

import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';
import {Button, Center, Grid, Image, Modal, MultiSelect, Space, Textarea, TextInput} from '@mantine/core';
import { Card, Text } from '@mantine/core';
import { Title } from '@mantine/core';
import {useDisclosure} from "@mantine/hooks";

const TaskCompV2 = () => {

    const [opened, handlers] = useDisclosure(false);
    const [openedM, setOpenedM] = useState(false);
    return(
        <div>
            <Grid>
                <Grid.Col md={4} sm={12}>

                </Grid.Col>
                <Grid.Col md={4} sm={12}>
                    <Card
                        shadow="sm"
                        p="xl"
                        component="a"
                        target="_blank"
                        style={{marginLeft:"2%", marginRight:"2%"}}
                    >
                        <Card.Section style={{cursor: "pointer"}}>
                            <Image src="https://images8.alphacoders.com/926/thumb-1920-926492.jpg" height={160} alt="No way!" />
                            <Title style={{marginBottom:"2%", marginTop:"2%"}} order={2} align="center">This is h1 title</Title>
                        </Card.Section>
                        <Card.Section>
                            <Center>
                                <IconButton style={{color:"white"}}>
                                    <EditIcon onClick={() => {setOpenedM(true)}}/>
                                </IconButton>
                                <Space w="80%" />
                                <IconButton style={{color:"red"}}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Center>
                        </Card.Section>
                    </Card>
                </Grid.Col>
                <Grid.Col md={4} sm={12}>

                </Grid.Col>
            </Grid>

            <Modal
                opened={openedM}
                onClose={() => setOpenedM(false)}
                title="New Project"
            >
                <TextInput
                    placeholder="Penguins on the moon"
                    label="Project name"
                    required
                />
                <br/>
                <Textarea
                    placeholder="Make the world a better place"
                    label="Project Description"
                    autosize
                    minRows={6}
                />
                <br/>
                <MultiSelect
                    data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
                    label="Get your buddies on board"
                    placeholder="Working all alone?"
                    searchable
                    nothingFound="Nothing found"
                />
                <br/>
                <TextInput
                    placeholder="Jumping dodos"
                    label="Img-URl"
                />
                <br/>
                <Center>
                    <Button variant="outline" text color="green">
                        Create
                    </Button>
                </Center>
            </Modal>
        </div>
    );
}
export default TaskCompV2;