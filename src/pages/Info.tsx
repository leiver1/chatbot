import { Paper, Box, Typography } from "@mui/material";

const Info = () => {
  return (
    <>
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap"
        }}
      >
        <Paper>
          <Box>
            <Typography variant="h5">BUGLAND Ltd.</Typography>
            <Typography gutterBottom variant="h6">Unternehmensprofil</Typography>
          </Box>

          <Box>
            <Typography variant="body1">
              BUGLAND Ltd. ist ein innovatives Start-up, das sich auf
              Smart-Home-Technologien für Haus und Garten spezialisiert hat. Das
              Unternehmen wurde 2018 gegründet und hat seitdem signifikante
              Umsatzzuwächse verzeichnet. Die herausragenden Produkte des
              Unternehmens sind: Cleanbug: Ein programmierbarer Saug- und
              Wischroboter, der in der Lage ist, Treppen zu steigen. Windowfly:
              Ein autonomes Reinigungsgerät, das Fenster selbstständig putzt.
              Gardenbeetle: Ein autonomer Rasenmäher, der auch Unkraut entfernt.
              Die Produkte sind sowohl für den Privatgebrauch als auch für
              professionelle Reinigungs- und Gartenpflegebetriebe konzipiert und
              bieten eine hohe Funktionalität.
            </Typography>
          </Box>
        </Paper>
        <Paper>
          <Box>
            <Typography variant="h5">Herausforderungen</Typography>
            <Typography gutterBottom variant="h6">Hello world</Typography>
          </Box>

          <Box>
            <Typography variant="body1">
              Trotz des Erfolgs der Produkte hat BUGLAND Ltd. in letzter Zeit vermehrt mit Supportanfragen und Kundenbeschwerden zu kämpfen. Häufige Probleme sind:
              Fehlfunktionen bei der Konfiguration und Programmierung der Geräte.
              Technische Probleme, wie der Cleanbug, der beim Treppensteigen abstürzt und zerbricht, oder die Windowfly, die sich am Fenster festsaugt und beschädigt.
              Schwierigkeiten bei der Reparatur, da nur Originalersatzteile verwendet werden können.
              Unzufriedenheit der Kunden mit dem Support und der Bearbeitung ihrer Anliegen.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Info;
