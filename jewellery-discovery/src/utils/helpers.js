export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0)

export const slugToTitle = (slug = '') =>
  slug
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')

export const getMomentBySlug = (moments, slug) =>
  moments.find((moment) => moment.slug === slug) || moments[0]