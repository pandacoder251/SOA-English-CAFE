import React, { useEffect, useState } from "react";
import "../styles/Newsletter.css";

const API_BASE = "http://localhost:8000";

function Newsletter() {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [newsletters, setNewsletters] = useState([]);
    const [selectedNewsletterId, setSelectedNewsletterId] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        loadNewsletterList();
    }, []);

    useEffect(() => {
        if (selectedNewsletterId) {
            loadNewsletter(selectedNewsletterId);
        }
    }, [selectedNewsletterId]);

    const loadNewsletterList = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/documents/`);
            const data = await res.json();

            if (data && data.length > 0) {
                setNewsletters(data);
                setSelectedNewsletterId(data[0].id); // Auto-select the latest newsletter
            } else {
                setError("No newsletters available yet");
                setLoading(false);
            }
        } catch (err) {
            console.error("Newsletter list load error:", err);
            setError("Failed to load newsletter list");
            setLoading(false);
        }
    };

    const loadNewsletter = async (newsletterId) => {
        setLoading(true);
        setError("");
        setIsOpen(false);
        setCurrentPage(-1);

        try {
            const res = await fetch(`${API_BASE}/api/documents/${newsletterId}/`);
            const data = await res.json();

            console.log("Newsletter data:", data); // DEBUG

            if (!data || !data.pages || data.pages.length === 0) {
                throw new Error("No pages found");
            }

            setPages(data.pages);
            setTitle(data.title || "Newsletter");

        } catch (err) {
            console.error("Newsletter load error:", err);
            setError("No newsletter pages available yet");
        } finally {
            setLoading(false);
        }
    };

    const handleNewsletterChange = (newsletterId) => {
        setSelectedNewsletterId(newsletterId);
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    const nextPage = () => {
        if (!isOpen) {
            setIsOpen(true);
            setCurrentPage(0);
            return;
        }

        if (currentPage < pages.length - 2) {
            setCurrentPage((p) => p + 1);
        }
    };

    const prevPage = () => {
        if (currentPage === 0) {
            setIsOpen(false);
            setCurrentPage(-1);
            return;
        }

        if (currentPage > 0) {
            setCurrentPage((p) => p - 1);
        }
    };

    if (loading) {
        return <p style={{ color: "white" }}>Loading newsletter...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <section className="page">
            <div className="page-capsule">
                <h1>{title}</h1>
                <p>A curated chronicle of words, voices, and moments.</p>
            </div>


     {newsletters.length > 0 && (
    <div className="newsletter-carousel">

        <button
            className="carousel-btn left"
            onClick={() =>
                document
                    .getElementById("newsletter-scroll")
                    .scrollBy({ left: -320, behavior: "smooth" })
            }
        >
            &#10094;
        </button>

        <div
            className="newsletter-scroll"
            id="newsletter-scroll"
        >
            {newsletters.map((newsletter) => (
                <div
                    key={newsletter.id}
                    className={`newsletter-card ${
                        newsletter.id === selectedNewsletterId
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        handleNewsletterChange(newsletter.id)
                    }
                >
                    <div className="card-content">
                        <h3>{newsletter.title}</h3>

                        <p>
                            {new Date(
                                newsletter.uploaded_at
                            ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>

                        <span>
                            {newsletter.id === selectedNewsletterId
                                ? "Currently Reading"
                                : "Open Newsletter"}
                        </span>
                    </div>
                </div>
            ))}
        </div>

        <button
            className="carousel-btn right"
            onClick={() =>
                document
                    .getElementById("newsletter-scroll")
                    .scrollBy({ left: 320, behavior: "smooth" })
            }
        >
            &#10095;
        </button>

    </div>
)}

            <div className="book-container">
                <div className={`book ${isOpen ? "open" : "closed"}`}>

                    {/* Cover*/}
                    {pages.length > 0 && (
                        <div
                            className={`page-sheet ${isOpen ? "flipped" : ""}`}
                            style={{ zIndex: pages.length + 1 }}
                        >
                            <div className="page-front cover">
                                <img
                                    src={pages[0].image}
                                    alt="Cover"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                            <div className="page-back" />
                        </div>
                    )}

                    {pages.slice(1).map((page, index) => (
                        <div
                            key={page.id}
                            className={`page-sheet ${isOpen && index < currentPage ? "flipped" : ""
                                }`}
                            style={{ zIndex: pages.length - index - 1 }}
                        >
                            <div className="page-front">
                                <img
                                    src={page.image}
                                    alt={`Page ${page.page_number}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>

                            <div className="page-back" />
                        </div>
                    ))}

                </div>

                <div className="book-controls">
                    <button onClick={prevPage} disabled={!isOpen}>
                        Previous
                    </button>

                    <span>
                        {isOpen
                            ? `Page ${currentPage + 2} / ${pages.length}`
                            : "Cover"}
                    </span>

                    <button onClick={nextPage} disabled={!pages.length}>
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Newsletter;