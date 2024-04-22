import { Card, Typography, CardMedia, CardHeader, Collapse,Box, IconButton, CardActions, CardContent } from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProduktTemplateProps {
    name: string;
    mdiIcon: string;
    image: string;
    shortDesc: string;
    longDesc: string;
}


const ProduktTemplate  = ({name, mdiIcon, image, shortDesc, longDesc}:ProduktTemplateProps) => {
const navigate = useNavigate()
const [isOpen, setIsOpen] = useState(false)
const toggleCollapse = () => {
    setIsOpen(!isOpen); // Wechselt den Zustand von isOpen
};


    const navigateToChat = () =>{
        if(name === 'Cleanbug'){
            localStorage.setItem('roboter', 'cleanbug')
            navigate('/chat-bot')
            
        }else if (name === 'Windowfly'){
            localStorage.setItem('roboter', 'windowfly')
            navigate('/chat-bot')
            
        }else if (name === 'Gardenbeetle'){
            localStorage.setItem('roboter', 'gardenbeetle')
            navigate('/chat-bot')

        }
    }

  return (
    <>


  <Card sx={{width: '430px',   maxWidth: '100%', overflow: 'visible', flexShrink: 0}}>
        <CardHeader avatar={<Icon fontSize="24" icon={mdiIcon}></Icon>} title={<Typography variant="h6">{name}</Typography>} subheader="der ultimative yo yo">
        </CardHeader>
        <CardMedia>
        <CardMedia sx={{objectFit: 'cover', width: '100%'}}
        component="img"
        height="100%"
        image={image}
      />
        </CardMedia>
        <CardContent>
            {shortDesc}
        </CardContent>
        <CardActions sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box>

            <IconButton onClick={navigateToChat}>
                <Icon icon="mdi:robot"></Icon>
            </IconButton>
            <IconButton>
                <Icon icon="mdi:heart"></Icon>
            </IconButton>
            </Box>
            <IconButton onClick={toggleCollapse}>
                <Icon icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}></Icon>
            </IconButton>
        </CardActions>
        <Collapse in={isOpen}>
            <Typography sx={{mb:3}} variant="h6">Beschreibung</Typography>
            <Typography variant="body1">{longDesc}</Typography>
        </Collapse>
    </Card>
    </>
  )
};

export default ProduktTemplate 
