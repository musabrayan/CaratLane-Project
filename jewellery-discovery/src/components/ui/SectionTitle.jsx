export const SectionTitle = ({ eyebrow, title, description, align = 'left' }) => (
  <div className={`section-title section-title-${align}`.trim()}>
    {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
    <h2>{title}</h2>
    {description ? <p className="section-description">{description}</p> : null}
  </div>
)

export default SectionTitle