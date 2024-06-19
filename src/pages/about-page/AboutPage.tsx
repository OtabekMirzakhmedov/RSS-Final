import {
  Avatar,
  Card,
  CardHeader,
  Container,
  Grid,
  Typography,
  CardContent,
  Link,
  CardActions,
} from '@mui/material';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <Container>
        <Typography variant='h2' align='center' marginTop='30px' marginBottom='40px'>
          About us
        </Typography>
        <Typography variant='h4' align='center' marginBottom='20px'>
          Cooperation
        </Typography>
        <Typography variant='body1' align='center' marginBottom='50px'>
          Our team is an energetic group. From the first stage of the project, we established open
          and transparent communication, which became the basis of our successful partnership. Each
          team member contributed their efforts and expertise to the process, even in the most
          difficult moments. We listened to each other with respect, accepted constructive
          criticism, and were not afraid to express our thoughts. This provided us with the
          opportunity to sincerely improve the project concept and find the best solutions to all
          the challenges we faced. The rapport and collaboration within our team was excellent and
          we were able to create a seamless flow between departments. Our unity helped us
          effectively distribute tasks, coordinate actions and overcome obstacles on the way to the
          goal.
        </Typography>
        <Grid container spacing={2} justifyContent='center' paddingBottom='100px'>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader avatar={<Avatar src='/otabek.jpg'>O</Avatar>} />
              {/* Отебек поставь свою фотографию, если надо */}
              <CardContent sx={{ flex: '1 1 auto' }}>
                <Typography variant='h4'>Otabek Mirzakhmedov</Typography>
                <Typography variant='h5'>Фронтенд-разработчик</Typography>
                <Typography variant='body1' marginBottom='20px'>
                  Краткая биография о...
                </Typography>
                <Typography variant='h5'>Contribution</Typography>
                <Typography variant='body1'>Something...</Typography>
              </CardContent>
              <CardActions>
                <Link
                  href='https://github.com/OtabekMirzakhmedov'
                  underline='hover'
                  target='_blank'
                  rel='noopener'
                >
                  Profile GitHub
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader avatar={<Avatar src='/nastya.jpeg' />} />
              <CardContent sx={{ flex: '1 1 auto' }}>
                <Typography variant='h4'>Nasta Voronova</Typography>
                <Typography variant='h5'>Head of Logistics Department</Typography>
                <Typography variant='body1' marginBottom='20px'>
                  She graduated from Belarussian State Unversity in 2014 with a degree in customs
                  affairs. Since then she worked as a customs declarant for 5 years. Since 2019 till
                  now she works as head of logistics department in Hess GS(Swiss subsidiary).
                </Typography>
                <Typography variant='h5'>Contribution</Typography>
                <Typography variant='body1'>
                  She implemented a login, profile and basket pages, coped with understanding the
                  basics of react, helped to understand commerstools possibilities.
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  href='https://github.com/voronovanasta'
                  underline='hover'
                  target='_blank'
                  rel='noopener'
                >
                  Profile GitHub
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader avatar={<Avatar src='/kirill.jpg' />} />
              <CardContent sx={{ flex: '1 1 auto' }}>
                <Typography variant='h4'>Kirill Murzaev</Typography>
                <Typography variant='h5' marginBottom='10px'>
                  Teacher at skyeng
                </Typography>
                <Typography variant='body1' marginBottom='20px'>
                  He graduated from college in 2023 with a degree in computer systems and complexes.
                  In 2022, he began working at Skyeng as a programming teacher. Currently a student
                  at RS School
                </Typography>
                <Typography variant='h5'>Contribution</Typography>
                <Typography variant='body1'>
                  Implemented a registration page. Made the catalog cards beautiful. Overcame
                  difficulties in understanding server requests and learned axios
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  href='https://mui.com/material-ui/all-components/'
                  underline='hover'
                  target='_blank'
                  rel='noopener'
                >
                  Profile GitHub
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
