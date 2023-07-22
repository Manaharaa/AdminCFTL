import React, { useState } from "react";
import Head from 'next/head';
// import { Note} from 'src/sections/notices/note';
// import { CreateArea} from 'src/sections/notices/CreateArea';
import CreateArea from '../sections/notices/CreateArea'; // Correct the path if needed
import Note from '../sections/notices/Note'; // Correct the path if needed
import styled from 'styled-components';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Container, Stack,Typography} from '@mui/material';

// Define the global CSS styles
const GlobalStyles = styled.div`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html {
    font-family: "Montserrat", sans-serif;
  }
  body {
    background: #eee;
    padding: 0 16px;
  }
  /* Add other global styles here */
`;


const Notes = styled.div`
.note {
    background: #fff;
    border-radius: 7px;
    box-shadow: 0 2px 5px #ccc;
    padding: 10px;
    width: 360px;
    margin: 16px;
    float: left;
  }
  .note h1 {
    font-size: 1.1em;
    margin-bottom: 6px;
  }
  .note p {
    font-size: 1.1em;
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  
  .note button {
    position: relative;
    float: right;
    margin-right: 10px;
    color: #3F72AF;
    border: none;
    width: 36px;
    height: 36px;
    cursor: pointer;
    outline: none;
    background: #fff;
  }
  
  
`;

// Define the form styles
const Form = styled.form`
  position: relative;
  width: 480px;
  height: 160px;
  margin: 30px auto 20px auto;
  background: #fff;
  padding: 15px;
  border-radius: 7px;
  box-shadow: 0 1px 5px rgb(138, 137, 137);

  input,
  textarea {
    width: 100%;
    border: none;
    padding: 4px;
    outline: none;
    font-size: 1em;
    font-family: inherit;
    resize: none;
  }

  button {
    position: absolute;
    right: 18px;
    bottom: -18px;
    background: #3F72AF;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    outline: none;
  }
`;

// Define the rest of the styles...

const Page = () => {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }


function deleteNote(id) {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }
  }
  
  function editNote(id, updatedNote) {
    setNotes(prevNotes => {
      return prevNotes.map((noteItem, index) => {
        if (index === id) {
          return updatedNote;
        }
        return noteItem;
      });
    });
  }
  

  return (
    
    
    <div>
    <Head>
      <title>
        Notices
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Notices
            </Typography>
          </div>
          </Stack>
      </Container>
    </Box><GlobalStyles>
      <Form>
      
      <CreateArea onAdd={addNote} /></Form><Notes>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        );
      })}</Notes>
        </GlobalStyles>
    </div>
   
  );
}

Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;
