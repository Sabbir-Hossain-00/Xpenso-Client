import { use } from "react"
import { Features } from "../../Components/Features/Features"
import { Hero } from "../../Components/Hero/Hero"
import { HowItWorks } from "../../Components/HowItWorks/HowItWorks"
import QuickStats from "../../Components/QuickStats/QuickStats"
import { RecentExpenses } from "../../Components/RecentExpenses/RecentExpenses"
import { AuthContext } from "../../Context/AuthContext"

export const Home = ()=>{
    const {user} = use(AuthContext)
     return(
        <main className=" bg-gray-50 pt-20">
         <section>
            <Hero/>
         </section>
         <section>
            <Features/>
         </section>
         <section>
            {
                user && <QuickStats/>
            }
         </section>
         <section>
            {
                user && <RecentExpenses/>
            }
         </section>
         <section>
            <HowItWorks/>
         </section>
        </main>
    )
}