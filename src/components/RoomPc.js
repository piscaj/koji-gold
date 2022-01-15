import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import RoomPcStatus from "./RoomPcStatus";

const RoomPc = ({ websocketObject, feedbackObject, storedElements }) => {
  return (
    <>
      <Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "column" },
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box sx={{ mt: "20px" }}>
            <Header title="Room PC" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              mb: "20px",
            }}
          >
            <Box sx={{ padding: "20px" }}>
              <RoomPcStatus
                feedbackObject={feedbackObject}
                storedElements={storedElements}
                syncStatusName="sync_room_pc"
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default RoomPc;
