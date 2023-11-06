import HomepageSlider from "@/components/slider/homepage.slider";
import { Container } from "@mui/material";
import { sendRequest } from '@/utils/api'
export default async function HomePage() {

  const chills = await sendRequest<IBackendResponse<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'CHILL',
      limit: 10
    },
  })
  const workouts = await sendRequest<IBackendResponse<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'WORKOUT',
      limit: 10
    },
  })
  const parties = await sendRequest<IBackendResponse<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'PARTY',
      limit: 10
    },
  })

  return (
    <Container>
      <HomepageSlider title="Top Chill" data={chills?.data ?? []} />
      <HomepageSlider title="Top Workout" data={workouts?.data ?? []} />
      <HomepageSlider title="Top Party" data={parties?.data ?? []} />
    </Container>
  );
}
