import { Box, Paper, Typography } from "@mui/material";
const Help  = () => {

  const uniqueKeys = [

    'Hallo',
    'Hi',
    'Ich habe ein Problem mit meinem Cleanbug.',
    'Ich brauche Hilfe bei der Konfiguration meines Windowfly.',
    'Können Sie mir bei der Programmierung meines Gardenbeetle helfen?',
    'Was sind die Integrationsmöglichkeiten des Chatbots in ein bestehendes technisches System?',
    'Wie kann ich Änderungen bei möglichen Antworten in das System bringen?',
    'Was muss gemacht werden, damit der Chatbot in echten Szenarien verwendet werden kann?',
    'Wie viele Fälle sollte er bearbeiten können?',
    'Wie sieht eine langfristige Trainingsstrategie aus?',
    'Der Chatbot leitet bei der nicht erfolgreichen Lösung eines Anliegens weiter zu einer/m Mitarbeiter:in oder gibt alternative Kontaktdaten an.',
    'Wie werden Qualität und Integration des verwendeten Chatbots sichergestellt?',
    'Was ist der technologische Hintergrund des verwendeten Chatbots?',
    'Wie werden die entstehenden Kosten für 10, 100 oder 1000 Anfragen pro Tag kalkuliert?',
    'Was sind die DONTs im Umgang mit Kunden im Support?',
    'Wie werden rechtliche Aspekte der Servicefälle berücksichtigt?',
    'Was beinhaltet das Service-Level-Agreement für die Kunden?',
    'Was ist die MoSCoW-Priorisierung bei den Anforderungen an den Chatbot?',
    'Was beinhaltet das Use Case Diagramm des Chatbots?'
  ];
  
  return (
  <>
  <Box sx={{p:{xs:0, sm:1, md:2, lg:4}}}>

    <Paper elevation={18}>
      <Typography variant="h4">Hilfe Center</Typography>
      <Typography gutterBottom variant="h6">Häufig gestellte Fragen</Typography>
      {
        uniqueKeys.map((response, index)=>(

          <Typography key={index}variant="body1" sx={{py:1}}>- {response}</Typography>
          ))
      }
      
    </Paper>
  </Box>
  </>
  )
};

export default Help 
