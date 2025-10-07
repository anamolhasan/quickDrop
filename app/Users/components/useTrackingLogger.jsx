'use client'

import React from 'react';
import axios from 'axios';

const useTrackingLogger = () => {

    const logTracking = async ({ tracking_id, status, details, location, updated_by }) => {
        try {
            const payload = {
                tracking_id,
                status,
                details,
                location,
                updated_by,
            };
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/trackings`, payload);
        } catch (error) {
            console.error("Failed to log tracking:", error);
        }
    };

    return { logTracking };
};

export default useTrackingLogger;