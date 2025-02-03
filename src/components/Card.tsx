import { CardActionArea, CardContent, styled, Typography } from "@mui/material";
import { FC } from "preact/compat";

const CustomAppBar = styled(CardActionArea)({
  height: '100%',
  borderRadius: '8px',
  border: '1px solid #E8D1D6',
});

type CardCustomProps = {
  title: string,
  text: string,
  icon: any,
}

const CardCustom: FC<CardCustomProps> = ({ title, text, icon }) => {
  return (
    <CustomAppBar>
      <CardContent>
        {icon}
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, height: '126px' }}>
          {text}
        </Typography>
      </CardContent>
    </CustomAppBar>
  );
}

export default CardCustom;
