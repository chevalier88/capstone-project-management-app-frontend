import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function DashboardGridRow({ row }) {
  // if (nested === true) {
  return (
    <Grid item key={row.id} xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography gutterBottom variant="h4" component="h2">
          {row.name}
        </Typography>
        <Typography variant="h5">
          {row.user_projects.length}
          /
          {row.noEngineersRequired}
          {' '}
          Engineers Enrolled
        </Typography>
        <Typography>
          Stage:
          {' '}
          {row.stage}
          <br />
          Delivery Deadline:
          {' '}
          {row.deliveryDeadline}
        </Typography>
        <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: '10.25%',
          }}
          image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>

          <Typography>
            <br />
            {row.summary}
          </Typography>

        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
//   return (
//     <Container sx={{ py: 8 }} maxWidth="md">
//       {/* End hero unit */}
//       <h3>
//         {' '}
//         {rowName}
//         {' '}
//       </h3>
//       <Grid container spacing={4}>
//         {projects.map(({ card }) => (
//           <Grid item key={card.id} xs={12} sm={6} md={4}>
//             <Card
//               sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
//             >
//               <Typography gutterBottom variant="h4" component="h2">
//                 {card.name}
//               </Typography>
//               <Typography variant="h5">
//                 {card.user_projects.length}
//                 /
//                 {card.noEngineersRequired}
//                 {' '}
//                 Engineers Enrolled
//               </Typography>
//               <Typography>
//                 Stage:
//                 {' '}
//                 {card.stage}
//                 <br />
//                 Delivery Deadline:
//                 {' '}
//                 {card.deliveryDeadline}
//               </Typography>
//               <CardMedia
//                 component="img"
//                 sx={{
//                   // 16:9
//                   pt: '10.25%',
//                 }}
//                 image="https://source.unsplash.com/random"
//                 alt="random"
//               />
//               <CardContent sx={{ flexGrow: 1 }}>

//                 <Typography>
//                   <br />
//                   {card.summary}
//                 </Typography>

//               </CardContent>
//               <CardActions>
//                 <Button size="small">View</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }
