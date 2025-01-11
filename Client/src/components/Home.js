import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

// Placeholder images (replace with actual images or URLs)
import busImage from '../assets/bus.jpg';
import tripImage from '../assets/trip.jpg';
import testimonialImage from '../assets/testimonial.jpg';

function Home() {
  return (
    <div className={styles.homeContainer}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to <span>BusMaster</span></h1>
          <p>Your reliable partner for seamless bus and trip management.</p>
          <Link to="/book-trip" className={styles.ctaButton}>Book a Trip</Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className={styles.features}>
        <h2>Our Services</h2>
        <div className={styles.featuresGrid}>
          
          {/* Feature 1 */}
          <div className={styles.featureCard}>
            <img src={busImage} alt="Manage Buses" />
            <h3>Manage Buses</h3>
            <p>Easily add, update, and monitor your fleet in real-time.</p>
          </div>
          
          {/* Feature 2 */}
          <div className={styles.featureCard}>
            <img src={tripImage} alt="Plan Trips" />
            <h3>Plan Trips</h3>
            <p>Organize trips efficiently with our intuitive scheduling tools.</p>
          </div>
          
          {/* Feature 3 */}
          <div className={styles.featureCard}>
            <img src={testimonialImage} alt="Customer Support" />
            <h3>24/7 Support</h3>
            <p>Our support team is available around the clock to assist you.</p>
          </div>
          
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.steps}>
          
          {/* Step 1 */}
          <div className={styles.step}>
            <h3>1. Sign Up</h3>
            <p>Create an account to get started with our services.</p>
          </div>
          
          {/* Step 2 */}
          <div className={styles.step}>
            <h3>2. Add Your Fleet</h3>
            <p>Input details about your buses and manage them effortlessly.</p>
          </div>
          
          {/* Step 3 */}
          <div className={styles.step}>
            <h3>3. Plan Trips</h3>
            <p>Schedule trips, assign buses, and monitor progress in real-time.</p>
          </div>
          
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <div className={styles.testimonialCard}>
          <img src={testimonialImage} alt="Client Testimonial" />
          <p>"BusMaster has transformed the way we manage our fleet. Highly recommended!"</p>
          <h4>— Jane Doe, Transit Manager</h4>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className={styles.callToAction}>
        <h2>Ready to streamline your bus and trip management?</h2>
        <Link to="/signup" className={styles.ctaButton}>Get Started</Link>
      </section>
      
    </div>
  );
}

export default Home;
