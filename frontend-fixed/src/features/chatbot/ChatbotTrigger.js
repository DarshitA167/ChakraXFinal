import React, { useEffect, useRef, useState } from "react";
import "../../styles/chatbot.css";
import videoIcon from "../../assets/chatboticon.mov";

const ChatbotTrigger = () => {
  const containerRef = useRef(null);
  const webcamRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I assist you with Chakra X?" },
  ]);
  const inputRef = useRef(null);
  const spokenRef = useRef(false);

  useEffect(() => {
    let model, webcam;
    let detectionStart = null;
    let chatbotCooldown = false;

    const init = async () => {
      try {
        model = await window.tmImage.load(
          "/static/model/model.json",
          "/static/model/metadata.json"
        );

        webcam = new window.tmImage.Webcam(180, 135, true);
        await webcam.setup();
        await webcam.play();
        webcamRef.current = webcam;

        const container = containerRef.current;
        container.innerHTML = "";
        container.appendChild(webcam.canvas);

        const canvas = webcam.canvas;
        canvas.style.borderRadius = "8px";
        canvas.style.display = "block";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.transition = "border 0.3s ease, box-shadow 0.3s ease";

        makeDraggable(container);

        const loop = async () => {
          if (chatbotVisible) {
            requestAnimationFrame(loop);
            return;
          }

          webcam.update();
          const prediction = await model.predict(webcam.canvas);
          const confused = prediction.find(p => p.className === "Confused");
          const prob = confused?.probability || 0;

          if (canvas) {
            canvas.style.border = prob > 0.8 ? "3px solid red" : "3px solid limegreen";
            canvas.style.boxShadow =
              prob > 0.8
                ? "0 0 12px rgba(255,0,0,0.8)"
                : "0 0 10px rgba(0,255,0,0.6)";
          }

          if (confused && prob > 0.8 && !chatbotCooldown) {
            if (!detectionStart) detectionStart = Date.now();

            if (Date.now() - detectionStart > 3000) {
              if (!spokenRef.current) {
                speakConfusion();
                spokenRef.current = true;
              }

              setChatbotVisible(true);
              canvas.style.display = "none";
              chatbotCooldown = true;

              setTimeout(() => {
                chatbotCooldown = false;
                detectionStart = null;
                spokenRef.current = false;
              }, 20000);
            }
          } else {
            detectionStart = null;
          }

          requestAnimationFrame(loop);
        };

        loop();
      } catch (err) {
        console.error("Error loading model or webcam:", err);
      }
    };

    init();
  }, [chatbotVisible]);

  const speakConfusion = () => {
    const message = new SpeechSynthesisUtterance(
      "We noticed you might need some help. Opening support chakra!"
    );
    message.lang = "en-US";
    message.pitch = 1;
    message.rate = 0.95;
    message.volume = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(message);
  };

  const toggleMinimize = () => {
    const canvas = webcamRef.current?.canvas;
    if (!canvas) return;
    canvas.style.display = isMinimized ? "block" : "none";
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = () => {
    const msg = inputRef.current.value.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "I'm still learning! Soon I'll guide you with Chakra X magic." },
    ]);
    inputRef.current.value = "";
  };

  const makeDraggable = (element) => {
    let isDragging = false;
    let offsetX = 0,
      offsetY = 0;

    element.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - element.getBoundingClientRect().left;
      offsetY = e.clientY - element.getBoundingClientRect().top;
      element.classList.add("dragging");
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
      element.style.right = "auto";
      element.style.bottom = "auto";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      element.classList.remove("dragging");
    });
  };

  return (
    <>
      {/* 🖥️ Webcam */}
      {!chatbotVisible && (
        <div
          id="webcam-container"
          ref={containerRef}
          className="floating-cam"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "200px",
            height: "150px",
            zIndex: 9999,
            background: "#000",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 0 12px rgba(0,0,0,0.4)",
            cursor: "grab",
          }}
        >
          <button className="minimize-btn" onClick={toggleMinimize}>
            {isMinimized ? "+" : "–"}
          </button>
        </div>
      )}

      {/* 🤖 Chatbot */}
      {chatbotVisible && (
        <div className="chatbox-container">
          <div className="chatbox-header">
  <video
    src={videoIcon}
    autoPlay
    loop
    muted
    className="chatbot-icon-inline"
  />
  <h3>Support Chakra</h3>
  <button className="chatbox-close" onClick={() => {
    setChatbotVisible(false);
    webcamRef.current?.canvas &&
      (webcamRef.current.canvas.style.display = "block");
  }}>
    ×
  </button>
</div>
          <div className="chatbox-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              ref={inputRef}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotTrigger;
