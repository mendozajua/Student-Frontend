import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, makeStyles, Paper} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import axios from "axios"
import * as events from "events";


// @ts-ignore
// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//
//         },
//     },
// }));

interface Istudent{
    id:number;
    name:string;
    address:string
}
export default function Student() {
    const paperStyle = {padding:"50px 20px", width:600, margin:"20px auto"}
    const[name,setName] = useState("")
    const[address, setAddress] = useState("")
    const[student, setStudents] = useState<Istudent[]>([])
    //const classes = useStyles();

    const handleClick=async (e:any)=>{
        e.preventDefault()
        const student={name,address}
        console.log(student)
        // fetch("http://localhost:8080/student/add",{
        //     method:"POST",
        //     headers:{"Content-Type":"application/json"},
        //     body:JSON.stringify(student)
        // }).then(()=>{
        //     console.log("New Student Added")
        // })

        await axios.post("http://localhost:8080/student/add",student)
    }

    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res => res.json())
        .then(result => {
            setStudents(result)
        })
    },[])

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:"Purple"}}><u>Add Student</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1},
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                    value={name} onChange={(e) => setName(e.target.value)}/>
                    <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
                    value={address} onChange={(e) => setAddress(e.target.value)}/>
                    <Button variant="outlined" onClick={handleClick}>Submit</Button>
                </Box>
                <Paper elevation={3} style={paperStyle}>
                    <h1>Students</h1>
                    {student.map?.(student =>(
                        <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={student.id}>
                            Id:{student.id}<br/>
                            Name:{student.name}<br/>
                            Address:{student.address}
                        </Paper>
                    ))}
                </Paper>
            </Paper>
        </Container>
    );
}
