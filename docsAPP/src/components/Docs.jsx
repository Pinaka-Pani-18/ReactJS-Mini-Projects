/* eslint-disable react/prop-types */

import { useState } from "react";
import Modal from "./Modal";
import { Button, Container, Grid, Typography } from "@mui/material";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/firebaseConfig";
import { useEffect, useRef } from "react";

const Docs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");

  const [docsData, setDocsData] = useState([]);
  const isMounted = useRef();

  const collectionRef = collection(database, "docsData");

  const addData = () => {
    addDoc(collectionRef, {
      title: title,
    })
      .then(() => {
        alert("Data Added");
        handleClose();
      })
      .catch(() => {
        alert("Cannot add data");
      });
  };

  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      setDocsData(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    getData();
  }, []);

  return (
    <Container
      className="docsContainer"
      sx={{
        textAlign: "center",
      }}
      fixed
    >
      <Typography variant="h3" gutterBottom>
        Docs
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          marginBottom: "3rem",
        }}
      >
        Add a Document
      </Button>
      <Modal
        open={open}
        title={title}
        setTitle={setTitle}
        addData={addData}
        handleClose={handleClose}
      />
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {docsData.map((docData, index) => {
          return (
            <Grid item key={index} xs={4}>
              <Typography
                sx={{
                  backgroundColor: "gray",
                  color: "white",
                  paddingY: "1rem ",
                }}
              >
                {docData.title}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Docs;
