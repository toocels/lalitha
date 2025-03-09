'use client';

import { useState } from 'react';
import styles from './faq.module.css';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  // FAQ Data
  const faqs = [
    {
      question: 'What is this Internship Portal?',
      answer: 'This portal provides internship opportunities for students across various domains, including law, technology, and more.',
    },
    {
      question: 'How can I apply for an internship?',
      answer: 'You can search for internships on the Explore Internships page and click the "Apply Now" button to fill out the application form.',
    },
    {
      question: 'Are these internships paid?',
      answer: 'Some internships are paid, while others may be unpaid. Please check the details of each internship for more information.',
    },
    {
      question: 'Can I apply for multiple internships?',
      answer: 'Yes, you can apply for as many internships as you like. However, make sure to tailor your application for each position.',
    },
    {
      question: 'Who can I contact for support?',
      answer: 'You can contact us through the Contact page or email us at support@internshipportal.com.',
    },
  ];

  // Toggle active question
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.pageHeading}>Frequently Asked Questions</h1>
      <hr className={styles.divider} />

      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            {/* Question */}
            <div
              className={styles.question}
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
              <span className={styles.toggleIcon}>
                {activeIndex === index ? '-' : '+'}
              </span>
            </div>

            {/* Answer */}
            {activeIndex === index && (
              <div className={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
