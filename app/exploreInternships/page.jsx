'use client';

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
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

  // Filter internships based on the search term
  const filteredInternships = internships.filter((internship) =>
    internship.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.Location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship['Skills required']
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
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
              <p className={styles.cardDetail}>
                <strong>Skills Required:</strong>{' '}
                {internship['Skills required']}
              </p>
            </div>

            {/* Right Side - Apply Button and Contact Info */}
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
            <div className={styles.skillsContainer}>
              {internship['Skills required']
                .split(',')
                .map((skill, skillIndex) => (
                  <span key={skillIndex} className={styles.skillTag}>
                    {skill.trim()}
                  </span>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
