import  { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { Icon } from "@iconify/react";
import "./typingDots.css";
interface KeyboardEvent {
  key: string;
}
const ChatBot = () => {
  const [initialBotText, setInitialBotText] = useState<string[]>([]);
  const [isTyping, setTyping] = useState<boolean>(true);
  const [falsyCount, setFalsyCount] = useState(0)

  const successRobotIcons = [


    "mdi:robot-excited-outline",
    "mdi:robot-happy-outline",
    "mdi:robot-love-outline",
  ];

  const falsyRobotIcons = [
    "mdi:robot-confused-outline",
    "mdi:robot-dead-outline",
  ];

  const madRobotIcons = [
    "mdi:robot-angry-outline",
    "mdi:robot-angry",
    "mdi:emoticon-angry-outline"
  ];

  

  const handleRandomIcons = (array: string[]): string => {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  };

  const [chats, setChats] = useState<
    { role: string; icon: string; text: string }[]
  >([]);
  const [content, setContent] = useState<{
    role: string;
    icon: string;
    text: string;
  }>({
    role: "",
    icon: "",
    text: "",
  });

  useEffect(() => {
    const isTypingInterval = setTimeout(() => {

      setTyping(false);
    }, 700);

    const dotAnimation = setInterval(() => {
      setInitialBotText([...initialBotText, "."]);
    }, 500);

    return () => {
      clearInterval(isTypingInterval);
      clearInterval(dotAnimation);
    };
  }, []);

  useEffect(() => {
    if (!isTyping) {

      setInitialBotText(["Wie kann ich Ihnen weiter helfen?"]);
    }
  }, [isTyping]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setContent({
      role: "me",
      icon: "mdi:account-outline",
      text: e.target.value,
    });
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    const localstorage = localStorage.getItem("chat");
    if (localstorage) {
      const chat = JSON.parse(localstorage);
      setChats(chat);
    } 
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === "Enter" && content.text) {
    
          // localStorage.setItem("chat", JSON.stringify(chats));
          // const roboter = ["windowfly", "cleanbug", "gardenbeetle"];
          
          // let found = false;
          // for (const robot of roboter) {
          //   if (content.text.toLowerCase().includes(robot)) {
          //     localStorage.setItem("roboter", robot);
          //     found = true;
          //     break;
          //   }
          // }
          
          // if (!found) {
          //   console.log("BRUTHER URH");
          // }
          handleResponse();
        }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
        document.removeEventListener("keydown", handleKeyDown);
    };
}, [content, chats]);  // Ensure dependencies are correctly listed





  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("chat", JSON.stringify(chats));
      chatEndRef.current?.scrollIntoView();
    }
  }, [chats]);




  const handleResponse = async () => {
    setTyping(true);
    setChats((prevChats) => [
      ...prevChats,
      { role: "me", icon: "mdi:account-outline", text: content.text },
      { role: "bot", icon: "mdi:robot", text: "" },
    ]);
    
    localStorage.setItem("chat", JSON.stringify(chats));
    const roboter = ["windowfly", "cleanbug", "gardenbeetle"];
    
    let found = false;
    for (const robot of roboter) {
      if (content.text.toLowerCase().includes(robot)) {
        localStorage.setItem("roboter", robot);
        found = true;
        break;
      }
    }
    
    if (!found) {
      console.log("BRUTHER URH");
    }

    try {
      const response = await axios.post("/api/chatbot2", {
        bot: content.text,
        roboter: localStorage.getItem('roboter') && localStorage.getItem('roboter') 
      });

      const message = response.data.response;
      const success = response.data.success;


      if(!success){
        setFalsyCount(falsyCount + 1)
      }


      if (typeof message === "string") {

        setChats((prevChats) => {

          return prevChats.map((chat, index) => {
            if (index === prevChats.length - 1 && chat.role === "bot") {
              return { ...chat, icon: success ? handleRandomIcons(successRobotIcons) : falsyCount > 0 && falsyCount < 3 ? handleRandomIcons(falsyRobotIcons) : falsyCount >= 3 ? handleRandomIcons(madRobotIcons) : 'mdi:robot'  , text: message };
            }
            return chat;
          });
        });

        setContent({
          role: "",
          icon: "",
          text: "",
        });
        setTyping(false);
      } else {
        console.error("Expected string from API but got:", message);
      }
    } catch (error) {
      setTyping(false);
      console.error("Failed to get response from API:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",

          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            py: 4,
            px: { xs: 2, sm: 6, md: 10, lg: 25 },
            maxHeight: "90%",
            overflowY: "scroll",
            width: "100%",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          {chats.length <= 0 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  mb: 6,
                }}
              >
                <Paper
                  sx={{
                    borderRadius: "100px",
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon icon="mdi:robot" fontSize={24}></Icon>
                </Paper>

                {isTyping ? (
                  <Box>
                    <div className="snippet" data-title="dot-elastic">
                      <div className="stage">
                        <div className="dot-elastic"></div>
                      </div>
                    </div>
                  </Box>
                ) : (
                  <p>Wie kann ich Ihnen weiter helfen?</p>
                )}
              </Box>
            </>
          )}

          {chats.map((chat, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                mb: 6,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  flexDirection: chat.role === "me" ? "row-reverse" : "row",
                }}
              >
                <Paper
                  sx={{
                    borderRadius: "100px",
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon icon={chat.icon} fontSize={24}></Icon>
                </Paper>

                {isTyping &&
                chat.role === "bot" &&
                index === chats.length - 1 ? (
                  <Box>
                    <div className="snippet" data-title="dot-elastic">
                      <div className="stage">
                        <div className="dot-elastic"></div>
                      </div>
                    </div>
                  </Box>
                ) : (
                  <Typography>{chat.text}</Typography>
                )}
              </Box>
            </Box>
          ))}
          <div ref={chatEndRef}></div>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", sm: "95%", md: "80%" },
            p: { xs: 0, sm: 2 },
            position: "relative",
          }}
        >
          <Paper elevation={0} sx={{ borderRadius: { xs: 0, sm: 2 } }}>
            <TextField
              autoFocus
              helperText="Schaue unter Help nach häufig gestellten Fragen"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
              value={content.text}
              autoComplete="off"
              sx={{ width: "100%" }}
              label="How can I help you?"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="mdi:robot"></Icon>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleResponse()}>
                      <Icon icon="mdi:send"></Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ChatBot;
