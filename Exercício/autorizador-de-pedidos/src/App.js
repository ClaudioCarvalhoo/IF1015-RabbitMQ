import { Box, Chip, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";

function App() {
  const [pedidos, setPedidos] = useState([]);

  const [connection] = useState(new WebSocket("ws://localhost:7474/pedidos"));
  connection.onopen = function () {
    console.log("Connection open!");
  };
  connection.onclose = function () {
    console.log("Connection closed");
  };
  connection.onmessage = function (e) {
    var server_message = e.data;
    setPedidos(JSON.parse(server_message));
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="150px">
      <Paper
        elevation={8}
        style={{
          width: "1000px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          padding: "15px",
          overflowY: "scroll",
        }}
      >
        {pedidos.map((pedido, i) => (
          <Box>
            <Chip
              key={i}
              label={pedido}
              deleteIcon={<CheckIcon />}
              onDelete={() => {
                connection.send(pedido);
              }}
              color="primary"
              style={{ margin: "5px" }}
            />
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default App;
