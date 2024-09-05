"use client";

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Banner = () => {
    const [visible, setVisible] = useState(true);
    const pathname = usePathname();
    const [isHomePage, setIsHomePage] = useState(false);

    useEffect(() => {
        setIsHomePage(pathname === '/');
    }, [pathname]);

    if (!visible || !isHomePage) return null;

    return (
        <div className="w-full bg-indigo-500 flex items-center justify-center py-2">
            <div className="w-full flex justify-between items-center px-4 md:justify-center">
                <Link href="/launch-week/" className="text-base font-medium text-white leading-5">
                    Join us for a week of exciting new features - SigNoz Launch Week 2.0 🚀
                </Link>
                <button className="text-white md:absolute md:right-4" onClick={() => setVisible(false)}>
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default Banner;
