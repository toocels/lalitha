'use client';

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Fuse from 'fuse.js'; // Import Fuse.js
import styles from './internship-list.module.css';

export default function Page() {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      const sheetUrl =
        'https://docs.google.com/spreadsheets/d/1VWUYLIH5iVMLN8R1vd0ktNne40xqPCIGqLvYIazSSEk/export?format=csv';

      try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();

        // Parse CSV data
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setInternships(result.data);
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Configure Fuse.js options
  const fuseOptions = {
    keys: ['Name', 'Location', 'Skills required'], // Fields to search
    threshold: 0.4, // Adjust sensitivity (lower is stricter)
  };

  // Initialize Fuse.js with the internships data
  const fuse = new Fuse(internships, fuseOptions);

  // Perform fuzzy search when filtering internships
  const filteredInternships = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item) // Extract items from Fuse results
    : internships; // Show all internships if no search term

  return (
    <div>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.navTitle}>Internship Portal</div>
        <div className={styles.navLinks}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className={styles.internshipList}>
        <h1 className={styles.pageHeading}>Internship Opportunities</h1>
        <hr className={styles.divider} />

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search internships by company, location or skills..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Internship Cards */}
        {filteredInternships.map((internship, index) => (
          <div key={index} className={styles.internshipCard}>
            <div className={styles.cardContent}>
              {/* Left Section */}
              <div className={styles.cardLeft}>
                <h2 className={styles.cardTitle}>{internship.Name}</h2>
                <p className={styles.cardDetail}>
                  <strong>Place:</strong> {internship.Place}
                </p>
                <p className={styles.cardDetail}>
                  <strong>Location:</strong> {internship.Location}
                </p>
                <p className={styles.cardDetail}>
                  <strong>Duration:</strong> {internship.Duration}
                </p>
                <p className={styles.cardDetail}>
                  <strong>In Charge:</strong> {internship.Incharge}
                </p>
                <p className={styles.cardDetail}>
                  <strong>Referenced By:</strong> {internship['Referenced by']}
                </p>
                <p className={styles.cardDetail}>
                  <strong>Description:</strong> {internship.Description}
                </p>
              </div>

              {/* Right Section */}
              <div className={styles.cardRight}>
                {internship['Google Form Link'] && (
                  <a
                    href={internship['Google Form Link']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className={styles.applyButton}>Apply Now</button>
                  </a>
                )}

                {(internship['Contact name'] ||
                  internship['Contact phone'] ||
                  internship['Contact email']) && (
                    <div className={styles.contactInfo}>
                      <h4>Contact Info</h4>
                      <p>
                        <strong>Name:</strong> {internship['Contact name']}
                      </p>
                      <p>
                        <strong>Phone:</strong> {internship['Contact phone']}
                      </p>
                      <p>
                        <strong>Email:</strong> {internship['Contact email']}
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* Skills Container */}
            {internship['Skills required'] && (
              <>
                <h4 className={styles.requirementsLabel}>Requirements:</h4>
                <div className={styles.skillsContainer}>
                  {internship['Skills required']
                    .split(',')
                    .map((skill, skillIndex) => (
                      <span key={skillIndex} className={styles.skillTag}>
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <ul className={styles.footerLinks}>
          <li><a href="/">Home</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/credits">Credits</a></li>
        </ul>
        <p>&copy; 2025 Internship Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}
