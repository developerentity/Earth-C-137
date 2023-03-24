import { Box } from "@mui/material";
import { ICharacter } from "../interfaces/characterInterface";

interface IProps {
  character: ICharacter
}

const OneCharacter = ({ character }: IProps) => {

  return (
    <Box sx={{
      position: 'relative',
      textAlign: 'center',
      borderRadius: '4px',
      overflow: 'hidden',
      '&:hover .text-container': {
        opacity: 1,
        cursor: 'pointer',
      },
    }}>
      <img
        style={{ width: '100%', verticalAlign: 'middle' }}
        src={character.image}
        alt={`${character.name} avatar`}
      />
      <Box
        className="text-container"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          transition: 'opacity 0.3s ease-in-out',
        }}>
        <p>
          {character.name}
        </p>
      </Box>
    </Box>
  )
}

export default OneCharacter