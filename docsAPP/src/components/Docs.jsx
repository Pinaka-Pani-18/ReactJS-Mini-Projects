/* eslint-disable react/prop-types */

import { useState } from "react";
import Modal from "./Modal";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/firebaseConfig";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

const Docs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");

  const [docsData, setDocsData] = useState([]);
  const isMounted = useRef();

  const collectionRef = collection(database, "docsData");

  let navigate = useNavigate();

  const addData = () => {
    addDoc(collectionRef, {
      title: title,
      docsDesc: "",
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

  function getId(id) {
    navigate(`/editDoc/${id}`);
  }

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    getData();
  }, []);

  return (
    <Box sx={{ background: "rgb(245,2,254)", minHeight: "100vh" }}>
      <Container
        className="docsContainer"
        sx={{
          textAlign: "center",
        }}
        fixed
      >
        <Typography
          variant="h1"
          sx={{
            paddingTop: "1rem",
            marginBottom: ".5rem",
            fontWeight: "700",
            color: "white",
          }}
        >
          DOCS APP
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<AddIcon />}
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
        <Grid
          container
          spacing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            marginTop: "1rem",
          }}
        >
          {docsData.map((docData, index) => {
            return (
              <Grid item key={index} xs={4}>
                <Stack
                  sx={{
                    border: "2px solid black",
                    borderRadius: "10px",
                    color: "rgb(245,2,254)",
                    backgroundColor: "white",
                    paddingY: ".5rem ",
                    cursor: "pointer",
                    height: "6rem",
                    overflowY: "auto",
                    boxShadow: "0 0 20px white",
                  }}
                  onClick={() => getId(docData.id)}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "500",
                      textTransform: "capitalize",
                      color: "black",
                    }}
                  >
                    {docData.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "gray",
                    }}
                    dangerouslySetInnerHTML={{ __html: docData.docsDesc }}
                  />
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Docs;
