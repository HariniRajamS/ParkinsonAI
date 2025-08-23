import React from "react";

const SpectrogramsPage: React.FC = () => {
    return (
        <div>
            <h1>Spectrograms</h1>
            <p>
                This page will display spectrograms generated from audio data. Please upload or select an audio file to view its spectrogram.
            </p>
            {/* TODO: Add spectrogram upload, visualization, and analysis components here */}
        </div>
    );
};

export default SpectrogramsPage;