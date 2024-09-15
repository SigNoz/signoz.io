'use client'

import React, { useState, useEffect } from 'react';

interface TimerProps {
    eventDate: string;
}

const CountdownTimer: React.FC<TimerProps> = ({ eventDate }) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {

        const targetDate = new Date(eventDate).getTime();

        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const difference = Math.floor((targetDate - now) / 1000);

            if (difference <= 0) {
                clearInterval(intervalId);
                setTimeLeft(0);
            } else {
                setTimeLeft(difference);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [eventDate]);

    return (
        <div className="text-signoz_vanilla-400 w-[68%]">
            {timeLeft > 0 ? (
                <>
                    <span className="text-sm sm:text-base text-signoz_slate-50 font-mono font-bold">COMING UP IN :</span> 
                    <span className="font-mono ml-2 ">{timeLeft}</span>
                </>
            ) : (
                'Event Started!'
            )}
        </div>
    );
};

export default CountdownTimer;
