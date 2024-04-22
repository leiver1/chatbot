
import ProduktTemplate from "./ProduktTemplate";
import cleanbugImage from "../assets/images/cleanbug.webp"
import windowFlyImage from "../assets/images/windowfly.webp"
import gardenBeetleImage from "../assets/images/gardenbeetle.webp"
// import test from "../assets/bar.gif"
import {Box} from '@mui/material'

const Home  = () => {
const bugProducts = [
    {
        name: 'Cleanbug',
        icon: 'game-icons:robot-golem',
        shortDesc: 'Ein Roboter, der wischt, putzt und treppen steigt',
        longDesc: 'Der Cleanbug ist ein fortschrittlicher Reinigungsroboter, der speziell dafür entwickelt wurde, sowohl Staubsaugen als auch Wischen in einem Gerät zu kombinieren. Seine bemerkenswerte Fähigkeit, Treppen zu steigen, macht ihn zu einem unverzichtbaren Helfer im modernen Smart Home. Durch seine intuitive Bedienung und programmierbare Natur passt er sich leicht verschiedenen Wohnbedingungen an. Seine robuste Konstruktion sorgt dafür, dass er auch anspruchsvollere Reinigungsaufgaben bewältigen kann.',
        image: cleanbugImage
    },
    {
        name: 'Windowfly',
        icon: 'game-icons:tracked-robot',
        shortDesc: 'Ein selbstständiger Fensterreinigungsroboter.',
        longDesc: 'Windowfly revolutioniert die Fensterreinigung durch seine autonome Arbeitsweise. Dieser Roboter ist mit modernsten Saugtechnologien ausgestattet, die es ihm ermöglichen, sich sicher an Glasflächen zu heften und diese streifenfrei zu reinigen. Sein aerodynamisches Design ermöglicht eine effiziente Bewegung über die Fensteroberflächen, während er dank einfacher Programmierung und Bedienung eine benutzerfreundliche Erfahrung bietet.',
        image: windowFlyImage
    },
    {
        name: 'Gardenbeetle',
        icon: 'game-icons:mono-wheel-robot',
        shortDesc: ' Ein autonomer Rasenmäh- und Unkrautroboter.',
        longDesc: 'Der Gardenbeetle ist ein autonomer Gartenpflegeroboter, der das Rasenmähen und Unkrautjäten übernimmt. Er ist für den Einsatz auf unterschiedlichem Gelände konzipiert, dank seiner robusten Räder und kraftvollen Schneidwerkzeuge. Der Gardenbeetle ist eine ideale Lösung für die Pflege von Gärten aller Größen, indem er eine gleichbleibende Qualität der Gartenpflege gewährleistet und den Besitzern wertvolle Zeit erspart.',
        image: gardenBeetleImage

    },
]



  return (
    <>
    <Box sx={{display: 'flex',  alignItems: 'center',justifyContent: {xs:'center', md:'space-between'}, p:2, gap:2, flexWrap: {xs:"wrap", md:'nowrap'}}}>


        {bugProducts.map((product, index) => (
            <ProduktTemplate  key={index}  name={product.name} mdiIcon={product.icon} image={product.image} shortDesc={product.shortDesc} longDesc={product.longDesc}/>
        ))}
    
        </Box>
    </>

  )
};

export default Home 
