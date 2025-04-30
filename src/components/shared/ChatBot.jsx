import { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v2.4/inject.js';
    script.async = true;

    document.body.appendChild(script);

    window.botpressWebChat.init({
      botId: "f5e01c62-99f9-42c7-87c1-520416570642",
      hostUrl: "https://cdn.botpress.cloud/webchat/v2.4",
      messagingUrl: "https://messaging.botpress.cloud",
      clientId: "f5e01c62-99f9-42c7-87c1-520416570642",
      lazySocket: true,
      botName: "WhatsViz Assistant",
      stylesheet: "https://cdn.botpress.cloud/webchat/v2.4/assets/modules/channel-web/default.css",
      enableReset: true,
      showPoweredBy: false,
      containerWidth: "400px",
      layoutWidth: "100%",
    });
  }, []);

  return null;
};

export default ChatBot;
