import WaveTrack from '@/components/track/wave.track'
import { sendRequest } from '@/utils/api'
import Container from '@mui/material/Container'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import type { Metadata, ResolvingMetadata } from 'next'


type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params?.slug?.split("-")?.pop()?.replace(".html", "") ?? undefined

    // fetch data
    const tracks = await sendRequest<IBackendResponse<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${slug}`
    })

    return {
        title: tracks.data?.title,
        description: tracks.data?.description,
        openGraph: {
            title: tracks.data?.title,
            description: tracks.data?.description,
            type: 'website',
            images: [`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${tracks.data?.imgUrl}`]
        },
    }
}
const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {
    const slug = params?.slug?.split("-")?.pop()?.replace(".html", "") ?? undefined
    const session = await getServerSession(authOptions)
    const res = await sendRequest<IBackendResponse<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${slug}`

    })
    const res1 = await sendRequest<IBackendResponse<IModelPaginate<ITrackComment>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
        method: 'POST',
        queryParams: {
            current: 1,
            pageSize: 10,
            trackId: slug,
            sort: '-createdAt'
        }
    })
    const res2 = await sendRequest<IBackendResponse<IModelPaginate<ITrackLike>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
        queryParams: {
            current: 1,
            pageSize: 100,
            sort: '-createdAt'
        }, headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
    })

    return (<Container>
        <WaveTrack track={res?.data ?? null} arrComments={res1.data?.result ?? null} likedTracks={res2.data?.result} />
    </Container>)
}
export default DetailTrackPage