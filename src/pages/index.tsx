import { Profile } from '../components/Profile'
import { Experiencebar } from '../components/ExperienceBar'

import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Experiencebar />

      <section>
        <div>
          <Profile />
        </div>
        <div></div>
      </section>
    </div>
  )
}
