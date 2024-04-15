import { Paper, Box, Typography, colors } from "@mui/material";
// import image from '../assets/image.gif'
import bar from '../assets/bar.gif'


const Test  = () => {
  return (
    <>
   <Box
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: { xs: "220px", md: "320px" }, // Responsive height
          backgroundPosition: "bottom",
          width: "100%",
          
          background:
            `url("${bar}")`,
          }}
          ></Box>
          <Paper sx={{backgroundColor: 'transparent' , ml:{xs: 0, sm:1, md:3, lg:5}, mt:1}} elevation={0}>
            <Typography variant="h4">BUGLAND Smart Support </Typography>
            <Typography color={colors.grey[400]}variant="h6">Ihr zuverlässiger Partner für ein nahtloses Kundenerlebnis</Typography>
            <Typography sx={{mt:5}}variant="body1">Willkommen bei BUGLAND Smart Support! Wir verstehen die Herausforderungen, die ein schnell wachsendes Start-up wie BUGLAND Ltd. im Kundensupport erlebt. Mit unserer maßgeschneiderten App bieten wir eine ganzheitliche Lösung, um die Kommunikation mit Ihren Kunden zu verbessern, den Support-Prozess zu optimieren und die Kundenzufriedenheit zu steigern.

</Typography>
          </Paper>

    </>
  )
};

export default Test 
