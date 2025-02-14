'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import React from 'react';
import type { Page } from '@/types';

const AccessDenied2: Page = () => {
    const router = useRouter();
    const navigateToDashboard = () => {
        router.push('/');
    };
    return (
        <>
            <div className="h-screen flex w-full">
                <div className="flex flex-1 flex-column surface-ground justify-content-center">
                    <div className="flex justify-content-center">
                        <img src="/layout/images/pages/accessDenied.png" alt="" />
                    </div>
                    <div className="flex flex-column gap-2 align-items-center">
                        <h1 className="m-0 text-orange-600 font-semibold">ACCESS DENIED!</h1>
                        <span className="text-700">Requested resource is not available.</span>
                    </div>
                    <div className="flex justify-content-center mt-6">
                        <Button type="button" label="BACK TO DASHBOARD" onClick={navigateToDashboard} text className="bg-indigo-500 text-white"></Button>
                    </div>
                </div>
                <div
                    style={{
                        backgroundImage: 'url(/layout/images/pages/accessDenied-bg.jpg)'
                    }}
                    className="hidden lg:flex flex-1 align-items-center justify-content-center bg-cover"
                >
                    <img src="/layout/images/logo/vector_logo.png" alt="" />
                </div>
            </div>
        </>
    );
};

export default AccessDenied2;
