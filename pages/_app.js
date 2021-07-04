import '../styles/globals.css'
import '../styles/audio-player.css'
import AudioPlayer from "../src/components/audio-player";

const data = [
    {
        audio: '/data/music/hey.mp3',
        cover: '/data/images/hey.jpg',
        title: 'hey'
    },
    {
        audio: '/data/music/summer.mp3',
        cover: '/data/images/summer.jpg',
        title: 'summer'
    },
    {
        audio: '/data/music/ukulele.mp3',
        cover: '/data/images/ukulele.jpg',
        title: 'ukulele'
    }
]

function MyApp({Component, pageProps}) {
    return (
        <>
            <AudioPlayer data={data}/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
