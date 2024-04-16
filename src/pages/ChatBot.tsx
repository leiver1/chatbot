import { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { responses } from "../Bot/responses";
import "./typingDots.css";
interface KeyboardEvent {
  key: string;
}
const ChatBot = () => {
  const [initialBotText, setInitialBotText] = useState<string[]>([]);
  const [isTyping, setTyping] = useState<boolean>(true);

  const robotorIcons = [
    "mdi:robot",
    "mdi:robot-industrial-outline",
    "mdi:robot-angry-outline",
    "mdi:robot-confused-outline",
    "mdi:robot-dead-outline",
    "mdi:robot-excited-outline",
    "mdi:robot-happy-outline",
    "mdi:robot-love-outline",
  ];

  const handleRandomIcons = (): string => {
    const random = Math.floor(Math.random() * robotorIcons.length);
    return robotorIcons[random];
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
    icon: handleRandomIcons(),
    text: "",
  });


 

  useEffect(() => {
    const isTypingInterval = setTimeout(() => {
      console.log("not typing anymore");
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
      console.log(isTyping);
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
    } else {
      console.log("nothing");
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Enter") {
        content.text && handleResponse();
        localStorage.setItem("chat", JSON.stringify(chats));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [content, chats]);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("chat", JSON.stringify(chats));
      chatEndRef.current?.scrollIntoView();
    }
  }, [chats]);

  const falsyResponses = [
    "Das habe ich nicht verstanden.",
    "Entschuldige. Darauf habe ich keine Antwort. Könntest du das anders formulieren. ",
    "Ich weiss nicht was du meinst.",
  ];

  const getRandomFalsyResponse = (): string => {
    const random = Math.floor(Math.random() * falsyResponses.length);
    return falsyResponses[random];
  };

  const handleResponse = (): void => {
    if (content.text) {
      const userMessage = content.text.trim();
      let botMessage: string;

      if (responses[userMessage]) {
        botMessage = responses[userMessage];
      } else {
        botMessage = getRandomFalsyResponse();
      }

      setChats((prevChats) => [
        ...prevChats,
        { role: "me", icon: "mdi:account-outline", text: userMessage },
        { role: "bot", icon: handleRandomIcons(), text: botMessage },
      ]);

      setContent({
        role: "",
        icon: handleRandomIcons(),
        text: "",
      });
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
    '&::-webkit-scrollbar': {
      display: 'none', // Versteckt die Scrollbar in Webkit-Browsern
    },
    scrollbarWidth: 'none', // Versteckt die Scrollbar in Firefox
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
                <Typography>{chat.text}</Typography>
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
