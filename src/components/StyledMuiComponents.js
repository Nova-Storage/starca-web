import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';

  
export const StyledButton = styled(Button)(({ theme }) => ({
  width: 300,
  background: '#0C825F',
  '&:hover': {
       background: "#027251",
    },
  margin: 10,
  }));

export const StyledNegativeButton = styled(Button)(({ theme }) => ({
  width: 300,
  background: '#820C2F',
  '&:hover': {
        background: "#780729",
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

export const StyledPasswordFormControl = styled(FormControl)(({ theme }) => ({
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

export const StyledTextField = styled(TextField)(({ theme }) => ({
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