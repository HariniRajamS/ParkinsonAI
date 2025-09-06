import React from "react";

const ImagesPage: React.FC = () => {
    // Example images array, replace with your own data or fetch from API
    const images = [
        {
            src: "/images/sample1.jpg",
            alt: "Sample Image 1",
            caption: "Brain MRI Scan 1",
        },
        {
            src: "/images/sample2.jpg",
            alt: "Sample Image 2",
            caption: "Brain MRI Scan 2",
        },
        {
            src: "/images/sample3.jpg",
            alt: "Sample Image 3",
            caption: "Brain MRI Scan 3",
        },
    ];

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Images</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
                {images.map((img, idx) => (
                    <div key={idx} style={{ width: 250, textAlign: "center" }}>
                        <img
                            src={img.src}
                            alt={img.alt}
                            style={{ width: "100%", borderRadius: 8, boxShadow: "0 2px 8px #ccc" }}
                        />
                        <div style={{ marginTop: 8, fontSize: 16 }}>{img.caption}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImagesPage;