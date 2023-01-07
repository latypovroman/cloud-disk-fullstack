import { styled } from "@mui/material/styles";
import { Button, ButtonProps } from "@mui/material";

const ColorButton = styled(Button)<ButtonProps>({
  color: "#A5DCE4",
  backgroundColor: "#205980",
  "&:hover": {
    backgroundColor: "#163D57",
  },
});

export default ColorButton;
