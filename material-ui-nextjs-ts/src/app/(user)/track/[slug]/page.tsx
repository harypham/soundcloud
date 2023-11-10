'use client'
import WaveTrack from '@/components/track/wave.track'
import { Container } from '@mui/material'
import { useSearchParams } from 'next/navigation'
const DetailTrackPage = () => {
    const searchParams = useSearchParams()
    const audio = searchParams.get('audio')
    // console.log('audio', audio)
    return (<Container>
        <WaveTrack />
    </Container>)
}
export default DetailTrackPage