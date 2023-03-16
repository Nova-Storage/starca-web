import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
  
export const StyledButton = styled(Button)(({ theme }) => ({
  width: 300,
  background: '#0C825F',
  '&:hover': {
       background: "#027251",
    },
  margin: 10,
  }));
  
export const LoginTextField = styled(TextField)(({ theme }) => ({
  width: 300,
  "& label.Mui-focused": {
    color: "#0C825F"
  },
  "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray"
      },
      "&:hover fieldset": {
        borderColor: "gray"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0C825F"
      }
    },
  margin: 10,
}));