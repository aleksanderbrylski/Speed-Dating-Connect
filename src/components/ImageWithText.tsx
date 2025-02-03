// src/ImageWithText.tsx
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

import { useNavigate } from 'react-router-dom';
import image from '../assets/background.png';

// Custom styled component for the image container
const ImageContainer = styled(Box)({
  position: 'relative',
  textAlign: 'center',
  color: 'white',
});

// Custom styled component for the text overlay
const TextOverlay = styled(Typography)({
  position: 'absolute',
  top: '60%',
  left: '70%',
  transform: 'translate(-50%, -50%)',
  textWrap: 'nowrap',
  // padding: '10px 20px',
});

const TextOverlaySmall = styled(Typography)({
  position: 'absolute',
  top: '70%',
  left: '70%',
  transform: 'translate(-50%, -50%)',
  textWrap: 'nowrap',
  // padding: '10px 20px',
});

const ButtonOverlay = styled(Button)({
  position: 'absolute',
  top: '80%',
  left: '70%',
  transform: 'translate(-50%, -50%)',
  textWrap: 'nowrap',
  // padding: '10px 20px',
});

const ImageWithText: React.FC = () => {
  const navigate = useNavigate();
  return (
    <ImageContainer>
      <img
        src={image}
        alt="Descriptive Alt Text"
        style={{ width: '100%', height: 'auto' }}
      />
      <TextOverlay variant="h4">Speed Matching</TextOverlay>
      <TextOverlaySmall variant="h5">Fall in love with our matching algorithm</TextOverlaySmall>
      <ButtonOverlay variant="contained" onClick={() => navigate("/create")}>Get Started</ButtonOverlay>
    </ImageContainer>
  );
};

export default ImageWithText;