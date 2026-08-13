import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './About.css';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="page-wrapper">
      <SEO title="About Us" description="Learn about Nexus PC — Pakistan's trusted source for premium PC components and custom builds." />
      <Navbar />
      <div className="page-content">
        <div className="container about-container">
          <div className="about-hero">
            <p className="about-tag">About Us</p>
            <h1 className="about-title">We Build<br />Dreams</h1>
            <p className="about-subtitle">
              Nexus PC is Pakistan's trusted destination for premium PC components. From processors to peripherals, we curate only the best hardware for gamers, creators, and professionals.
            </p>
          </div>

          <div className="about-stats">
            {[
              { num: '500+', label: 'Products', desc: 'Curated selection of premium hardware' },
              { num: '2K+', label: 'Happy Customers', desc: 'And growing every day' },
              { num: '24/7', label: 'Support', desc: "We're always here to help" },
            ].map((s, i) => (
              <div key={i} className="about-stat card">
                <p className="stat-num">{s.num}</p>
                <p className="stat-label">{s.label}</p>
                <p className="stat-desc">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="about-content card">
            <h2>Our Mission</h2>
            <p>
              To make premium PC building accessible to everyone in Pakistan. We believe every gamer, every creator, and every professional deserves access to top-tier hardware at competitive prices.
            </p>
            <h2>Why Choose Us?</h2>
            <ul>
              <li>✓ Authentic products with warranty</li>
              <li>✓ Competitive pricing across Pakistan</li>
              <li>✓ Fast and reliable shipping</li>
              <li>✓ Expert tech support and guidance</li>
              <li>✓ Custom PC build service</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
