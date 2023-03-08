import { Button, Paper } from "@mui/material";


const CarouselItem = (props: any) => {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">
        Check it out!
      </Button>
    </Paper>
  )
};

export default CarouselItem
