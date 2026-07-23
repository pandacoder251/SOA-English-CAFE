import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { getSubstackEmbedUrl } from "../utils/substackConfig";

const API_BASE = "http://localhost:8000";

function Footer() {
    const [latestNewsletter, setLatestNewsletter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadLatestNewsletter = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/documents/latest/`);
                if (!res.ok) {
                    throw new Error("Failed to load latest newsletter");
                }
                const data = await res.json();
                setLatestNewsletter(data);
            } catch (err) {
                console.error("Footer latest newsletter load error:", err);
                setError("Unable to load latest newsletter");
            } finally {
                setLoading(false);
            }
        };

        loadLatestNewsletter();
    }, []);

    return (
        <footer className="footer">
            

            {/* Newsletter */}
            <div className="footer-center" >
                <div className="footer-newsletter">
                    <h1> Our Newsletter</h1>
                </div>  
                <div className="card-main">  
                    <div className="substack-container">
                            <iframe
                                src={getSubstackEmbedUrl()}
                                title="Substack Newsletter Subscribe"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                            />
                    </div>
                     <div className="sub-card">
                        <h4>
                            {loading
                                ? "Loading latest newsletter..."
                                : error
                                    ? error
                                    : latestNewsletter?.title || "Sign up to our newsletter"
                            }
                        </h4>
                        {!loading && latestNewsletter && !error && (
                            <div className="footer-newsletter-meta">
                                <span>{new Date(latestNewsletter.uploaded_at).toLocaleDateString()}</span>
                                <span>{latestNewsletter.total_pages} pages</span>
                            </div>
                        )}
                        <Link to="/newsletter" className="footer-newsletter-link">
                            {latestNewsletter ? "Read latest issue" : "View newsletter page"}
                        </Link>
                    </div>
                </div>    
            </div>
             {/* Social Icons */}
            <div className="footer-socials">
                <a
                    href="https://www.instagram.com/soaenglishcafe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>

                <a
                    href="https://www.linkedin.com/company/soa-english-cafe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                >
                    <FaLinkedin />
                </a>
            </div>
        </footer>
    );
}

export default Footer;