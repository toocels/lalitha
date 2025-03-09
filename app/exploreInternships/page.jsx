'use client';

import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import Fuse from 'fuse.js';
import styles from './internship-list.module.css';

export default function Page() {
  const [internships, setInternships] = useState([]);
  const [searchCombined, setSearchCombined] = useState('');
  const [searchDuration, setSearchDuration] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      const sheetUrl =
        'https://docs.google.com/spreadsheets/d/1VWUYLIH5iVMLN8R1vd0ktNne40xqPCIGqLvYIazSSEk/export?format=csv';

      try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();

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

  // Fuse.js options for fuzzy matching
  const fuseOptions = {
    keys: ['Name', 'Description', 'Skills required'],
    threshold: 0.4,
    includeScore: true,
  };

  // Memoized Fuse instance
  const fuse = useMemo(() => new Fuse(internships, fuseOptions), [internships]);

  // Filtering logic with exact match prioritization
  const filteredInternships = useMemo(() => {
    if (!searchCombined && !searchDuration && !searchLocation) {
      return internships;
    }

    let results = internships;

    // Combined search (Name, Description, Requirements)
    if (searchCombined) {
      const exactMatches = internships.filter((internship) => {
        const combinedFields =
          `${internship.Name} ${internship.Description} ${internship['Skills required']}`.toLowerCase();
        return combinedFields.includes(searchCombined.toLowerCase());
      });

      if (exactMatches.length > 0) {
        results = exactMatches;
      } else {
        // Fuzzy search if no exact matches found
        results = fuse.search(searchCombined).map((result) => result.item);
      }
    }

    // Filter by Duration
    if (searchDuration) {
      results = results.filter((internship) =>
        internship.Duration?.toLowerCase().includes(searchDuration.toLowerCase())
      );
    }

    // Filter by Location
    if (searchLocation) {
      results = results.filter((internship) =>
        internship.Location?.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    return results;
  }, [internships, searchCombined, searchDuration, searchLocation, fuse]);

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

        {/* Search Inputs */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by Name, Description or Requirements"
            className={styles.searchInput}
            value={searchCombined}
            onChange={(e) => setSearchCombined(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Duration"
            className={styles.searchInput}
            value={searchDuration}
            onChange={(e) => setSearchDuration(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Location"
            className={styles.searchInput}
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>

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
                {(internship['Contact name'] ||
                  internship['Contact phone'] ||
                  internship['Contact email']) && (
                  <div className={styles.contactInfo}>
                    <h4>Contact Info</h4>
                    {internship['Contact name'] && (
                      <p><strong>Name:</strong> {internship['Contact name']}</p>
                    )}
                    {internship['Contact phone'] && (
                      <p><strong>Phone:</strong> {internship['Contact phone']}</p>
                    )}
                    {internship['Contact email'] && (
                      <p><strong>Email:</strong> {internship['Contact email']}</p>
                    )}
                  </div>
                )}

                {/* Apply Now Button Below Contact Info */}
                {internship['Apply Link'] && (
                  <a href={internship['Google Form Link']} target="_blank" rel="noopener noreferrer">
                    <button className={styles.applyButton}>Apply Now</button>
                  </a>
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
