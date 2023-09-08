import { useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { database } from "../firebase/firebaseConfig";

const EditDoc = () => {
  const [docsDescription, setDocsDescription] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");

  let params = useParams();

  const isMounted = useRef();

  const collectionRef = collection(database, "docsData");

  const getQuillData = (value) => {
    setDocsDescription(value);
  };

  useEffect(() => {
    const updateDocsData = setTimeout(() => {
      const document = doc(collectionRef, params.id);
      updateDoc(document, {
        docsDesc: docsDescription,
      })
        .then(() => {
          alert("Saved");
        })
        .catch(() => {
          alert("Cannot Save");
        });
    }, 1000);
    return () => clearTimeout(updateDocsData);
  }, [docsDescription, params.id, collectionRef]);

  const getData = () => {
    const document = doc(collectionRef, params.id);
    onSnapshot(document, (docs) => {
      setDocumentTitle(docs.data().title);
      setDocsDescription(docs.data().docsDesc);
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
    <Container>
      <Typography
        variant="h5"
        sx={{ textTransform: "capitalize", margin: "1rem 0" }}
      >
        {documentTitle}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: doc.docsDesc }} />
      <ReactQuill value={docsDescription} onChange={getQuillData} />
    </Container>
  );
};

export default EditDoc;
