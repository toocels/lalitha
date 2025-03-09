'use client';

import { useState } from 'react';
import styles from './internship-list.module.css';
import { internships } from './internship.js';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInternships = internships.filter((internship) =>
    internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.skillsRequired.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={styles.internshipList}>
      <h1 className={styles.pageHeading}>Internship Opportunities</h1>
      <hr className={styles.divider} />

      <input
        type="text"
        placeholder="Search internships by company, location or skills..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredInternships.map((internship) => (
        <div key={internship.id} className={styles.internshipCard}>
          <div className={styles.cardContent}>
            <div className={styles.cardLeft}>
              <h2 className={styles.cardTitle}>{internship.companyName}</h2>
              <p className={styles.cardDetail}><strong>Place:</strong> {internship.placeOfInternship}</p>
              <p className={styles.cardDetail}><strong>Location:</strong> {internship.location}</p>
              <p className={styles.cardDetail}><strong>Duration:</strong> {internship.duration}</p>
              <p className={styles.cardDetail}><strong>In Charge:</strong> {internship.inCharge}</p>
              <p className={styles.cardDetail}><strong>Referenced By:</strong> {internship.referencedBy}</p>
              <p className={styles.cardDetail}><strong>Description:</strong> {internship.description}</p>
              <p className={styles.cardDetail}>
                <strong>Skills Required:</strong>
                {internship.skillsRequired.map((skill) => (
                  <span key={skill} className={styles.skillTag}>{skill}</span>
                ))}
              </p>
            </div>

            <div className={styles.cardRight}>
              {internship.applyLink && (
                <a href={internship.applyLink} target="_blank" rel="noopener noreferrer">
                  <button className={styles.applyButton}>Apply Now</button>
                </a>
              )}

              {internship.contactInfo && (
                <div className={styles.contactInfo}>
                  <h4>Contact Info</h4>
                  <p><strong>Name:</strong> {internship.contactInfo.name}</p>
                  <p><strong>Phone:</strong> {internship.contactInfo.phone}</p>
                  <p><strong>Email:</strong> {internship.contactInfo.email}</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.skillsContainer}>
            {internship.skillsRequired.map(skill => (
              <span key={skill} className={styles.skillTag}>{skill}</span>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
