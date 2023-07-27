import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewTotalTeachers } from 'src/sections/overview/total-teachers';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { TeacherChart } from 'src/sections/overview/teacher-pie';
import { OverviewSales } from 'src/sections/overview/student-bar';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalStudents } from 'src/sections/overview/total-students';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { StudentPieChart } from 'src/sections/overview/student-pie';
import CardContent from '@mui/material/CardContent';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Overview | CFTL
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalStudents
              positive
              sx={{ height: '100%' }}
              value="1.2k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalTeachers
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>
          
  <Grid item xs={12} lg={9}>
    <OverviewSales
      chartSeries={[
        {
          name: 'Districts',
          data: [7, 12, 4, 9, 15, 11, 2, 6, 13, 10, 1, 25, 20, 17, 22, 3, 8, 14, 19, 21, 16, 24, 5, 23, 18]
        },
      ]}
      sx={{ height: '100%' }}
    />
  </Grid>
  <Grid item xs={12} lg={3}>
  {/* <CardContent sx={sx}> */}
  <ul>
    <li>Colombo (CMB)</li>
    <li>Gampaha (GPH)</li>
    <li>Kalutara (KAL)</li>
    <li>Kandy (KD)</li>
    <li>Matale (MTL)</li>
    <li>Nuwara Eliya (NEL)</li>
    <li>Galle (GL)</li>
    <li>Matara (MTA)</li>
    <li>Hambantota (HBT)</li>
    <li>Jaffna (JFN)</li>
    <li>Kilinochchi (KCH)</li>
    <li>Mannar (MNR)</li>
    <li>Vavuniya (VNY)</li>
    <li>Mullaitivu (MLT)</li>
    <li>Batticaloa (BTC)</li>
    <li>Ampara (AMP)</li>
    <li>Trincomalee (TRC)</li>
    <li>Kurunegala (KGL)</li>
    <li>Puttalam (PTL)</li>
    <li>Anuradhapura (ADP)</li>
    <li>Polonnaruwa (PNW)</li>
    <li>Badulla (BDL)</li>
    <li>Monaragala (MNG)</li>
    <li>Ratnapura (RTP)</li>
    <li>Kegalle (KGL)</li>
  </ul>
{/* </CardContent> */}

  </Grid>
  <Grid item xs={12} lg={6}>
    <StudentPieChart
      chartSeries={[63, 37]}
      labels={['Advanced Level', 'Ordinary Level']}
      sx={{ height: '100%' }}
    />
  </Grid>
          
          <Grid item xs={12} lg={6}>
    <TeacherChart
      chartSeries={[50, 50]}
      labels={['Advanced Level', 'Ordinary Level']}
      sx={{ height: '100%' }}
    />
  </Grid>
          
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'DEV1049',
                  amount: 30.5,
                  customer: {
                    name: 'Ekaterina Tankova'
                  },
                  createdAt: 1555016400000,
                  status: 'pending'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'DEV1048',
                  amount: 25.1,
                  customer: {
                    name: 'Cao Yu'
                  },
                  createdAt: 1555016400000,
                  status: 'delivered'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  ref: 'DEV1047',
                  amount: 10.99,
                  customer: {
                    name: 'Alexa Richardson'
                  },
                  createdAt: 1554930000000,
                  status: 'refunded'
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  ref: 'DEV1046',
                  amount: 96.43,
                  customer: {
                    name: 'Anje Keizer'
                  },
                  createdAt: 1554757200000,
                  status: 'pending'
                },
                {
                  id: '9f974f239d29ede969367103',
                  ref: 'DEV1045',
                  amount: 32.54,
                  customer: {
                    name: 'Clarke Gillebert'
                  },
                  createdAt: 1554670800000,
                  status: 'delivered'
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  ref: 'DEV1044',
                  amount: 16.76,
                  customer: {
                    name: 'Adam Denisov'
                  },
                  createdAt: 1554670800000,
                  status: 'delivered'
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
