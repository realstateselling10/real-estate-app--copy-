import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const PropertyCard = ({ property }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={property.images[0]?.url || 'default-image-url.jpg'}
        alt={property.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {property.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${property.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {property.size} sqft
        </Typography>
        <Button variant="contained" color="primary">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;