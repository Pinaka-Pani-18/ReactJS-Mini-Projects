/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "25px",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function ModalComponent({
  open,
  handleClose,
  title,
  setTitle,
  addData,
}) {
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-basic"
            label="Add Title"
            sx={{
              width: "100%",
            }}
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              marginTop: "2rem",
              paddingX: "4rem",
            }}
            onClick={addData}
          >
            ADD
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
