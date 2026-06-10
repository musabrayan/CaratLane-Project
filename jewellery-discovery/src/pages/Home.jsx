import { moments } from '../data/moments'
import { useStores } from '../hooks/useStores'
import { featuredStory } from '../data/moments'
import { Hero } from '../components/home/Hero'
import MomentsMarquee from '../components/home/MomentsMarquee'
import MomentsGrid from '../components/home/MomentsGrid'
import FeaturedStory from '../components/home/FeaturedStory'
import ExperienceFlow from '../components/home/ExperienceFlow'
import StoreExperience from '../components/home/StoreExperience'
import Loader from '../components/ui/Loader'

export const Home = () => {
  const { stores, loading } = useStores()

  if (loading) {
    return <Loader />
  }

  return (
    <div className="grid gap-4">
      <Hero moment={moments[0]} />
      <MomentsMarquee />
      <MomentsGrid moments={moments} />
      <FeaturedStory story={featuredStory} moment={moments[0]} />
      <ExperienceFlow />
      <StoreExperience stores={stores} />
    </div>
  )
}

export default Home