import { IconButton, InputBase } from "@mui/material"
import { Box } from "@mui/system"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from "react";

interface IProps {
    value: string | undefined
    setValue: (str: string) => void
}

const SearchComponent = ({ value, setValue }: IProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState(false);

    const handleOpen = () => {
        setVisible(true)
        setTimeout(() => {
            inputRef.current && inputRef.current.focus();
        }, 500)
    }

    const handleClose = () => {
        setVisible(false);
        setValue('')
    }

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return <Box
        sx={{
            overflow: 'hidden',
            position: 'relative',
            height: '32px',
            my: '8px',
        }}>
        <Box
            sx={{
                position: "absolute",
                top: 0,
                right: visible ? "32px" : "-300px",
                opacity: visible ? 1 : 0,
                backgroundColor: "white",
                transition: "right 0.5s ease-in-out, opacity 0.5s ease-in-out",
            }}>
            <InputBase
                inputRef={inputRef}
                value={value}
                onChange={handleValueChange}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type character name"
                inputProps={{ 'aria-label': 'character name' }}
            />
        </Box>
        <IconButton
            sx={{
                position: 'absolute',
                borderRadius: 0,
                top: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: "white",
                height: '32px',
                width: '32px',
                "&:hover": {
                    background: '#fff'
                }
            }}
            onClick={visible ? handleClose : handleOpen}
            type="button"
            aria-label="search characters">
            {visible ? <CloseIcon /> : <SearchIcon />}
        </IconButton>
    </Box>

}

export default SearchComponent