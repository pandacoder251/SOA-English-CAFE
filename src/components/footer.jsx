import React from "react";
import "./footer.css";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { getSubstackEmbedUrl } from "../utils/substackConfig";

function Footer() {
    return (
        <footer className="footer">
            {/* Articles */}
            <div className="footer-center">
                <div className="footer-articles">
                    <h1>Subscribe to our Articles</h1>
                    <p className="substack-description">
                        Get the latest updates, stories, and English learning
                        tips delivered straight to your inbox.
                    </p>
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

                <a
                    href="https://www.youtube.com/@soaenglishcafe"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                >
                    <FaYoutube />
                </a>
            </div>
        </footer>
    );
}

export default Footer;