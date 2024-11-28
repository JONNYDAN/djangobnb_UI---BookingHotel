"use client";

import { useState } from "react";
import apiService from "../services/apiService";

interface CancelButtonProps {
    reservationId: string;
    refreshReservations: () => Promise<void>; // Hàm để tải lại danh sách
}

const CancelButton: React.FC<CancelButtonProps> = ({ reservationId, refreshReservations }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await apiService.get(`/api/properties/reservations/${reservationId}/cancel`);
                await refreshReservations();
        } catch (error) {
            console.error("Error canceling reservation:", error);
            alert("An error occurred while canceling the reservation.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            onClick={handleCancel}
            className={`mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            {isLoading ? "Canceling..." : "Cancel"}
        </div>
    );
};

export default CancelButton;
