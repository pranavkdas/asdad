"use client"
// components/YouTubeBackground.js
import { useEffect, useRef, useState } from 'react';

const YouTubeBackground = ({ videoId } : {videoId:string}) => {
    const videoRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState<number>(186400);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Load the YouTube API script
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            new window.YT.Player(videoRef.current, {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1,
                    'autoplay': 1,
                    'mute': 1,
                    'loop': 1,
                    'controls': 0,
                    'showinfo': 0,
                    'modestbranding': 1,
                    'playlist': videoId, // Use playlist to enable looping
                },
                events: {
                    'onReady': (event) => {
                        event.target.playVideo();
                    },
                    'onStateChange': (event) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            event.target.playVideo(); // Restart the video
                        }
                    },
                },
            });
        };
    }, [videoId]);

    // useEffect hook to manage the countdown interval
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                // If time is up, clear the interval
                if (prevTime <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                // Decrease the time left by one second
                return prevTime - 1;
            });
        }, 1000); // Interval of 1 second

        // Cleanup function to clear the interval
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const formatTime = (time: number): string => {
        const days = Math.floor(time / (24 * 3600)); // Calculate days
        const hours = Math.floor((time % (24 * 3600)) / 3600); // Calculate hours
        const minutes = Math.floor((time % 3600) / 60); // Calculate minutes
        const seconds = time % 60; // Calculate seconds

        // Return the formatted string
        return `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: -1, // Ensure it stays behind other content
            }}
        >
            <div
                ref={videoRef}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    zIndex: 1, // Ensure it stays above the video
                }}
                className='flex flex-col'
            >
                <div className='text-sm font-bold text-white-800 mb-8 text-center'>
                    Tournament begins in
                </div>
                <div className='text-6xl font-bold text-white-800 mb-8 text-center'>
                    {formatTime(timeLeft)}
                </div>
            </div>
        </div>
    );
};

export default YouTubeBackground;


//
//https://www.youtube.com/watch?v=oJDesm--wss
//https://www.youtube.com/watch?v=kwB4ycDxyco
//https://www.youtube.com/watch?v=qAlD8eNIfr8
