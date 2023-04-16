/* eslint-disable react/jsx-boolean-value */
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import ChatBot from 'react-simple-chatbot';
// import { ThemeProvider } from '@mui/material/styles';
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const steps = [
    {
      id: '1',
      message: 'Hello, I am chatbot I am here to guide you!',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'What is Bonds Credits score?', trigger: '4' },
        { value: 2, label: 'How to buy or sell a bond.', trigger: '3' },
      ],
    },
    {
      id: '3',
      message: 'You can use our app for creating transactions, altering bonds, generating tokens and many other features !!!',
      trigger: '2',
    },
    {
      id: '4',
      message: 'We calssify your spaces in 3 levels of custom heirarchy. Blocks, Zones and racks. The can be visualized on pur mobile app.',
      end: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Number of users" total={714000} icon={'ic:outline-people'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Bonds" total={1352831} color="info" icon={'mdi:paper-check-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Todays Transaction Value" total={1723315} color="warning" icon={'ph:currency-dollar-bold' } />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Rejected Users" total={234} color="error" icon={'mdi:user-block-outline'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Users Analytics"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
              ]}
              chartData={[
                {
                  name: 'Daily Active Users',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'New Users',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
                {
                  name: 'Total Users',
                  type: 'line',
                  fill: 'solid',
                  data: [50, 80, 66, 88, 78, 66, 74, 88, 84, 72, 86],
                }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Bonds Credit Score"
              chartData={[
                { label: 'AAA Bonds', value: 4344 },
                { label: 'AA Bonds', value: 545 },
                { label: 'A Bonds', value: 1443 },
                { label: 'B Bonds', value: 443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppNewsUpdate
              title="Recent Tenders"
              list={[...Array(5)].map(() => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
              }))}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Bonds Transactions"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
              ]}
              chartData={[
                {
                  name: 'Number of Bonds Sold',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Number of Bonds Bought',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
                {
                  name: 'Number of Bonds Held',
                  type: 'line',
                  fill: 'solid',
                  data: [50, 60, 56, 78, 48, 56, 64, 48, 64, 42, 56],
                }
              ]}
            />
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="In past 24 Hours"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '524 Bonds Swapped',
                  '126 Bonds Created',
                  '12 Bonds Sold',
                  '21 Bonds Matured',
                  '4 Bonds Defaulted',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Products Putawayed"
              chartLabels={['Potholes', 'Manholes', 'Street Lights', 'Accidents']}
              chartData={[
                { name: 'Users', data: [80, 50, 30, 40] },
                { name: 'Contractors', data: [20, 30, 40, 80] },
                { name: 'Government', data: [44, 76, 78, 13] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          <ChatBot 
            steps={steps} 
            floating={true} 
            recognitionEnable={true}
            speechSynthesis={{ enable: true, lang: 'en' }}

          />
        
        </Grid>
      </Container>
    </>
  );
}
