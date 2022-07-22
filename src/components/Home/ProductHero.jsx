import * as React from 'react';
import Button from './Button.jsx';
import Typography from './Typography.jsx';
import ProductHeroLayout from './ProductHeroLayout.jsx';

// const backgroundImage = 'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400';

const backgroundImage = 'https://images.squarespace-cdn.com/content/v1/58f0ecc029687fbef7b86b03/1493045721551-01K5S40PKH6I3XJVA104/93l9RDL.gif';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Relax, and leave your troubles with us.
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        We get your app working at reasonable rates.
      </Typography>

      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/login"
        sx={{ minWidth: 200 }}
      >
        Login
      </Button>

      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
