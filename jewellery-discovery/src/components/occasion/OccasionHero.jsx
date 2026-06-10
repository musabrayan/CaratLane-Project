import { Link } from 'react-router-dom'

export const OccasionHero = ({ moment, productCount }) => {
  return (
    <section className="occasion-hero section-surface">
      <div>
        <p className="eyebrow">{moment.collectionTitle || `${moment.label} collection`}</p>
        <h1>{moment.collectionTitle || `${moment.label} Collection`}</h1>
        <p className="hero-text">{moment.collectionCopy || moment.subtitle}</p>
      </div>
      <div className="occasion-hero-meta">
        <p>{productCount} curated pieces</p>
        <Link to="/" className="button button-ghost">
          Back to home
        </Link>
      </div>
    </section>
  )
}

export default OccasionHero