// Interaktives Chat-Widget für n8n, konvertiert von Ginovation - Lostknowledge (Deutsche Version - Angepasste Farben und Branding)
(function() {
   // Widget nur einmal initialisieren
   if (window.N8nChatWidgetLoaded) return;
   window.N8nChatWidgetLoaded = true;


   // Schriftart laden - Poppins für einen frischen Look
   const fontElement = document.createElement('link');
   fontElement.rel = 'stylesheet';
   fontElement.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
   document.head.appendChild(fontElement);


   // Widget-Stile mit einem komplett anderen Designansatz anwenden
   const widgetStyles = document.createElement('style');
   widgetStyles.textContent = `
       .chat-assist-widget {
           --chat-color-primary: var(--chat-widget-primary, #3985B2); /* Neue Primärfarbe */
           --chat-color-secondary: var(--chat-widget-secondary, #103A52); /* Neue Sekundärfarbe */
           --chat-color-tertiary: var(--chat-widget-tertiary, #103A52); /* Neue Tertiärfarbe (gleich der Sekundärfarbe) */
           --chat-color-light: var(--chat-widget-light, #e0f2f7); /* Hellblau/Grauton, passend zur neuen Primärfarbe */
           --chat-color-surface: var(--chat-widget-surface, #ffffff);
           --chat-color-text: var(--chat-widget-text, #1f2937);
           --chat-color-text-light: var(--chat-widget-text-light, #6b7280);
           --chat-color-border: var(--chat-widget-border, #e5e7eb);
           --chat-shadow-sm: 0 1px 3px rgba(57, 133, 178, 0.1); /* Angepasste Schattenfarbe (rgba von #3985B2) */
           --chat-shadow-md: 0 4px 6px rgba(57, 133, 178, 0.15); /* Angepasste Schattenfarbe (rgba von #3985B2) */
           --chat-shadow-lg: 0 10px 15px rgba(57, 133, 178, 0.2); /* Angepasste Schattenfarbe (rgba von #3985B2) */
           --chat-radius-sm: 8px;
           --chat-radius-md: 12px;
           --chat-radius-lg: 20px;
           --chat-radius-full: 9999px;
           --chat-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
           font-family: 'Poppins', sans-serif;
       }


       .chat-assist-widget .chat-window {
           position: fixed;
           bottom: 90px;
           z-index: 1000;
           width: 380px;
           height: 580px;
           background: var(--chat-color-surface);
           border-radius: var(--chat-radius-lg);
           box-shadow: var(--chat-shadow-lg);
           border: 1px solid var(--chat-color-light);
           overflow: hidden;
           display: none;
           flex-direction: column;
           transition: var(--chat-transition);
           opacity: 0;
           transform: translateY(20px) scale(0.95);
       }


       .chat-assist-widget .chat-window.right-side {
           right: 20px;
       }


       .chat-assist-widget .chat-window.left-side {
           left: 20px;
       }


       .chat-assist-widget .chat-window.visible {
           display: flex;
           opacity: 1;
           transform: translateY(0) scale(1);
       }


       .chat-assist-widget .chat-header {
           padding: 16px;
           display: flex;
           align-items: center;
           gap: 12px;
           background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
           color: white;
           position: relative;
       }


       .chat-assist-widget .chat-header-logo {
           width: 32px;
           height: 32px;
           border-radius: var(--chat-radius-sm);
           object-fit: contain;
           background: white;
           padding: 4px;
       }


       .chat-assist-widget .chat-header-title {
           font-size: 16px;
           font-weight: 600;
           color: white;
       }


       .chat-assist-widget .chat-close-btn {
           position: absolute;
           right: 16px;
           top: 50%;
           transform: translateY(-50%);
           background: rgba(255, 255, 255, 0.2);
           border: none;
           color: white;
           cursor: pointer;
           padding: 4px;
           display: flex;
           align-items: center;
           justify-content: center;
           transition: var(--chat-transition);
           font-size: 18px;
           border-radius: var(--chat-radius-full);
           width: 28px;
           height: 28px;
       }


       .chat-assist-widget .chat-close-btn:hover {
           background: rgba(255, 255, 255, 0.3);
           transform: translateY(-50%) scale(1.1);
       }


       .chat-assist-widget .chat-welcome {
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           padding: 24px;
           text-align: center;
           width: 100%;
           max-width: 320px;
       }


       .chat-assist-widget .chat-welcome-title {
           font-size: 22px;
           font-weight: 700;
           color: var(--chat-color-text);
           margin-bottom: 24px;
           line-height: 1.3;
       }


       .chat-assist-widget .chat-start-btn {
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 10px;
           width: 100%;
           padding: 14px 20px;
           background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
           color: white;
           border: none;
           border-radius: var(--chat-radius-md);
           cursor: pointer;
           font-size: 15px;
           transition: var(--chat-transition);
           font-weight: 600;
           font-family: inherit;
           margin-bottom: 16px;
           box-shadow: var(--chat-shadow-md);
       }


       .chat-assist-widget .chat-start-btn:hover {
           transform: translateY(-2px);
           box-shadow: var(--chat-shadow-lg);
       }


       .chat-assist-widget .chat-response-time {
           font-size: 14px;
           color: var(--chat-color-text-light);
           margin: 0;
       }


       .chat-assist-widget .chat-body {
           display: none;
           flex-direction: column;
           height: 100%;
       }


       .chat-assist-widget .chat-body.active {
           display: flex;
       }


       .chat-assist-widget .chat-messages {
           flex: 1;
           overflow-y: auto;
           padding: 20px;
           background: #f9fafb;
           display: flex;
           flex-direction: column;
           gap: 12px;
       }


       .chat-assist-widget .chat-messages::-webkit-scrollbar {
           width: 6px;
       }


       .chat-assist-widget .chat-messages::-webkit-scrollbar-track {
           background: transparent;
       }


       .chat-assist-widget .chat-messages::-webkit-scrollbar-thumb {
           background-color: rgba(57, 133, 178, 0.3); /* Angepasste Scrollbar-Farbe (rgba von #3985B2) */
           border-radius: var(--chat-radius-full);
       }


       .chat-assist-widget .chat-bubble {
           padding: 14px 18px;
           border-radius: var(--chat-radius-md);
           max-width: 85%;
           word-wrap: break-word;
           font-size: 14px;
           line-height: 1.6;
           position: relative;
           white-space: pre-line; /* Dies bewahrt Zeilenumbrüche */
       }


       .chat-assist-widget .chat-bubble.user-bubble {
           background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
           color: white;
           align-self: flex-end;
           border-bottom-right-radius: 4px;
           box-shadow: var(--chat-shadow-sm);
       }


       .chat-assist-widget .chat-bubble.bot-bubble {
           background: white;
           color: var(--chat-color-text);
           align-self: flex-start;
           border-bottom-left-radius: 4px;
           box-shadow: var(--chat-shadow-sm);
           border: 1px solid var(--chat-color-light);
       }


       /* Tipp-Animation */
       .chat-assist-widget .typing-indicator {
           display: flex;
           align-items: center;
           gap: 4px;
           padding: 14px 18px;
           background: white;
           border-radius: var(--chat-radius-md);
           border-bottom-left-radius: 4px;
           max-width: 80px;
           align-self: flex-start;
           box-shadow: var(--chat-shadow-sm);
           border: 1px solid var(--chat-color-light);
       }


       .chat-assist-widget .typing-dot {
           width: 8px;
           height: 8px;
           background: var(--chat-color-primary);
           border-radius: var(--chat-radius-full);
           opacity: 0.7;
           animation: typingAnimation 1.4s infinite ease-in-out;
       }


       .chat-assist-widget .typing-dot:nth-child(1) {
           animation-delay: 0s;
       }


       .chat-assist-widget .typing-dot:nth-child(2) {
           animation-delay: 0.2s;
       }


       .chat-assist-widget .typing-dot:nth-child(3) {
           animation-delay: 0.4s;
       }


       @keyframes typingAnimation {
           0%, 60%, 100% {
               transform: translateY(0);
           }
           30% {
               transform: translateY(-4px);
           }
       }


       .chat-assist-widget .chat-controls {
           padding: 16px;
           background: var(--chat-color-surface);
           border-top: 1px solid var(--chat-color-light);
           display: flex;
           gap: 10px;
       }


       .chat-assist-widget .chat-textarea {
           flex: 1;
           padding: 14px 16px;
           border: 1px solid var(--chat-color-light);
           border-radius: var(--chat-radius-md);
           background: var(--chat-color-surface);
           color: var(--chat-color-text);
           resize: none;
           font-family: inherit;
           font-size: 14px;
           line-height: 1.5;
           max-height: 120px;
           min-height: 48px;
           transition: var(--chat-transition);
       }


       .chat-assist-widget .chat-textarea:focus {
           outline: none;
           border-color: var(--chat-color-primary);
           box-shadow: 0 0 0 3px rgba(57, 133, 178, 0.2); /* Angepasster Fokus-Schatten (rgba von #3985B2) */
       }


       .chat-assist-widget .chat-textarea::placeholder {
           color: var(--chat-color-text-light);
       }


       .chat-assist-widget .chat-submit {
           background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
           color: white;
           border: none;
           border-radius: var(--chat-radius-md);
           width: 48px;
           height: 48px;
           cursor: pointer;
           transition: var(--chat-transition);
           display: flex;
           align-items: center;
           justify-content: center;
           flex-shrink: 0;
           box-shadow: var(--chat-shadow-sm);
       }


       .chat-assist-widget .chat-submit:hover {
           transform: scale(1.05);
           box-shadow: var(--chat-shadow-md);
       }


       .chat-assist-widget .chat-submit svg {
           width: 22px;
           height: 22px;
       }


       .chat-assist-widget .chat-launcher {
           position: fixed;
           bottom: 20px;
           height: 56px;
           border-radius: var(--chat-radius-full);
           background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
           color: white;
           border: none;
           cursor: pointer;
           box-shadow: var(--chat-shadow-md);
           z-index: 999;
           transition: var(--chat-transition);
           display: flex;
           align-items: center;
           padding: 0 20px 0 16px;
           gap: 8px;
       }


       .chat-assist-widget .chat-launcher.right-side {
           right: 20px;
       }


       .chat-assist-widget .chat-launcher.left-side {
           left: 20px;
       }


       .chat-assist-widget .chat-launcher:hover {
           transform: scale(1.05);
           box-shadow: var(--chat-shadow-lg);
       }


       .chat-assist-widget .chat-launcher svg {
           width: 24px;
           height: 24px;
       }
      
       .chat-assist-widget .chat-launcher-text {
           font-weight: 600;
           font-size: 15px;
           white-space: nowrap;
       }


       .chat-assist-widget .chat-footer {
           padding: 10px;
           text-align: center;
           background: var(--chat-color-surface);
           border-top: 1px solid var(--chat-color-light);
       }


       .chat-assist-widget .chat-footer-link {
           color: var(--chat-color-primary);
           text-decoration: none;
           font-size: 12px;
           opacity: 0.8;
           transition: var(--chat-transition);
           font-family: inherit;
       }


       .chat-assist-widget .chat-footer-link:hover {
           opacity: 1;
       }


       .chat-assist-widget .suggested-questions {
           display: flex;
           flex-direction: column;
           gap: 8px;
           margin: 12px 0;
           align-self: flex-start;
           max-width: 85%;
       }


       .chat-assist-widget .suggested-question-btn {
           background: #f3f4f6;
           border: 1px solid var(--chat-color-light);
           border-radius: var(--chat-radius-md);
           padding: 10px 14px;
           text-align: left;
           font-size: 13px;
           color: var(--chat-color-text);
           cursor: pointer;
           transition: var(--chat-transition);
           font-family: inherit;
           line-height: 1.4;
       }


       .chat-assist-widget .suggested-question-btn:hover {
           background: var(--chat-color-light);
           border-color: var(--chat-color-primary);
       }


       .chat-assist-widget .chat-link {
           color: var(--chat-color-primary);
           text-decoration: underline;
           word-break: break-all;
           transition: var(--chat-transition);
       }


       .chat-assist-widget .chat-link:hover {
           color: var(--chat-color-secondary);
           text-decoration: underline;
       }


       .chat-assist-widget .user-registration {
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           padding: 24px;
           text-align: center;
           width: 100%;
           max-width: 320px;
           display: none;
       }


       .chat-assist-widget .user-registration.active {
           display: block;
       }


       .chat-assist-widget .registration-title {
           font-size: 18px;
           font-weight: 600;
           color: var(--chat-color-text);
           margin-bottom: 16px;
           line-height: 1.3;
       }


       .chat-assist-widget .registration-form {
           display: flex;
           flex-direction: column;
           gap: 12px;
           margin-bottom: 16px;
       }


       .chat-assist-widget .form-field {
           display: flex;
           flex-direction: column;
           gap: 4px;
           text-align: left;
       }


       .chat-assist-widget .form-label {
           font-size: 14px;
           font-weight: 500;
           color: var(--chat-color-text);
       }


       .chat-assist-widget .form-input {
           padding: 12px 14px;
           border: 1px solid var(--chat-color-border);
           border-radius: var(--chat-radius-md);
           font-family: inherit;
           font-size: 14px;
           transition: var(--chat-transition);
       }


       .chat-assist-widget .form-input:focus {
           outline: none;
           border-color: var(--chat-color-primary);
           box-shadow: 0 0 0 3px rgba(57, 133, 178, 0.2); /* Angepasster Fokus-Schatten (rgba von #3985B2) */
       }


       .chat-assist-widget .form-input.error {
           border-color: #ef4444;
       }


       .chat-assist-widget .error-text {
           font-size: 12px;
           color: #ef4444;
           margin-top: 2px;
       }


       .chat-assist-widget .submit-registration {
           display: flex;
           align-items: center;
           justify-content: center;
           width: 100%;
           padding: 14px 20px;
           background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
           color: white;
           border: none;
           border-radius: var(--chat-radius-md);
           cursor: pointer;
           font-size: 15px;
           transition: var(--chat-transition);
           font-weight: 600;
           font-family: inherit;
           box-shadow: var(--chat-shadow-md);
       }


       .chat-assist-widget .submit-registration:hover {
           transform: translateY(-2px);
           box-shadow: var(--chat-shadow-lg);
       }


       .chat-assist-widget .submit-registration:disabled {
           opacity: 0.7;
           cursor: not-allowed;
           transform: none;
       }
   `;
   document.head.appendChild(widgetStyles);


   // Standardkonfiguration
   const defaultSettings = {
       webhook: {
           url: '',
           route: ''
       },
       branding: {
           logo: '',
           name: '',
           welcomeText: 'Hallo! Wie kann ich Ihnen helfen?', // DE: Willkommenstext
           responseTimeText: 'Antwort meist innerhalb weniger Minuten', // DE: Antwortzeittext
           poweredBy: {
               text: 'Ginovation - Lostknowledge', // Angepasster 'Powered by' Text
               link: 'https://1qr.nl/sh/SDpW5' // Angepasster 'Powered by' Link
           }
       },
       style: {
           primaryColor: '#3985B2', // Neue Primärfarbe (Blau)
           secondaryColor: '#103A52', // Neue Sekundärfarbe (Dunkelblau)
           position: 'right',
           backgroundColor: '#ffffff',
           fontColor: '#1f2937'
       },
       suggestedQuestions: [] // Standardmäßig leeres Array für vorgeschlagene Fragen
   };


   // Benutzereinstellungen mit Standardeinstellungen zusammenführen
   const settings = window.ChatWidgetConfig ?
       {
           webhook: { ...defaultSettings.webhook, ...window.ChatWidgetConfig.webhook },
           branding: {
               ...defaultSettings.branding,
               ...window.ChatWidgetConfig.branding,
               poweredBy: { // Sicherstellen, dass poweredBy korrekt überschrieben wird
                   ...defaultSettings.branding.poweredBy,
                   ...window.ChatWidgetConfig.branding?.poweredBy
               }
           },
           style: {
               ...defaultSettings.style,
               ...window.ChatWidgetConfig.style,
               // Neue Farben erzwingen, unabhängig von vorherigen Einstellungen
               primaryColor: window.ChatWidgetConfig.style?.primaryColor || '#3985B2',
               secondaryColor: window.ChatWidgetConfig.style?.secondaryColor || '#103A52'
           },
           suggestedQuestions: window.ChatWidgetConfig.suggestedQuestions || defaultSettings.suggestedQuestions
       } : defaultSettings;


   // Sitzungsverfolgung
   let conversationId = '';
   let isWaitingForResponse = false;


   // Widget-DOM-Struktur erstellen
   const widgetRoot = document.createElement('div');
   widgetRoot.className = 'chat-assist-widget';
  
   // Benutzerdefinierte Farben anwenden
   widgetRoot.style.setProperty('--chat-widget-primary', settings.style.primaryColor);
   widgetRoot.style.setProperty('--chat-widget-secondary', settings.style.secondaryColor);
   widgetRoot.style.setProperty('--chat-widget-tertiary', settings.style.secondaryColor); // Tertiärfarbe ist jetzt gleich der Sekundärfarbe
   widgetRoot.style.setProperty('--chat-widget-surface', settings.style.backgroundColor);
   widgetRoot.style.setProperty('--chat-widget-text', settings.style.fontColor);


   // Chat-Panel erstellen
   const chatWindow = document.createElement('div');
   chatWindow.className = `chat-window ${settings.style.position === 'left' ? 'left-side' : 'right-side'}`;
  
   // Willkommensbildschirm mit Header erstellen
   const welcomeScreenHTML = `
       <div class="chat-header">
           <img class="chat-header-logo" src="${settings.branding.logo}" alt="${settings.branding.name}">
           <span class="chat-header-title">${settings.branding.name}</span>
           <button class="chat-close-btn">×</button>
       </div>
       <div class="chat-welcome">
           <h2 class="chat-welcome-title">${settings.branding.welcomeText}</h2>
           <button class="chat-start-btn">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
               </svg>
               Chat starten
           </button>
           <p class="chat-response-time">${settings.branding.responseTimeText}</p>
       </div>
       <div class="user-registration">
           <h2 class="registration-title">Bitte geben Sie Ihre Daten ein, um den Chat zu starten</h2>
           <form class="registration-form">
               <div class="form-field">
                   <label class="form-label" for="chat-user-name">Name</label>
                   <input type="text" id="chat-user-name" class="form-input" placeholder="Ihr Name" required>
                   <div class="error-text" id="name-error"></div>
               </div>
               <div class="form-field">
                   <label class="form-label" for="chat-user-email">E-Mail</label>
                   <input type="email" id="chat-user-email" class="form-input" placeholder="Ihre E-Mail-Adresse" required>
                   <div class="error-text" id="email-error"></div>
               </div>
               <button type="submit" class="submit-registration">Zum Chat fortfahren</button>
           </form>
       </div>
   `;


   // Chat-Oberfläche ohne Duplizierung des Headers erstellen
   const chatInterfaceHTML = `
       <div class="chat-body">
           <div class="chat-messages"></div>
           <div class="chat-controls">
               <textarea class="chat-textarea" placeholder="Geben Sie hier Ihre Nachricht ein..." rows="1"></textarea>
               <button class="chat-submit">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                       <path d="M22 2L11 13"></path>
                       <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                   </svg>
               </button>
           </div>
           <div class="chat-footer">
               <a class="chat-footer-link" href="${settings.branding.poweredBy.link}" target="_blank">${settings.branding.poweredBy.text}</a>
           </div>
       </div>
   `;
  
   chatWindow.innerHTML = welcomeScreenHTML + chatInterfaceHTML;
  
   // Umschalt-Schaltfläche erstellen
   const launchButton = document.createElement('button');
   launchButton.className = `chat-launcher ${settings.style.position === 'left' ? 'left-side' : 'right-side'}`;
   launchButton.innerHTML = `
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
       </svg>
       <span class="chat-launcher-text">Brauchen Sie Hilfe?</span>`;
  
   // Elemente zum DOM hinzufügen
   widgetRoot.appendChild(chatWindow);
   widgetRoot.appendChild(launchButton);
   document.body.appendChild(widgetRoot);


   // DOM-Elemente abrufen
   const startChatButton = chatWindow.querySelector('.chat-start-btn');
   const chatBody = chatWindow.querySelector('.chat-body');
   const messagesContainer = chatWindow.querySelector('.chat-messages');
   const messageTextarea = chatWindow.querySelector('.chat-textarea');
   const sendButton = chatWindow.querySelector('.chat-submit');
  
   // Registrierungsformular-Elemente
   const registrationForm = chatWindow.querySelector('.registration-form');
   const userRegistration = chatWindow.querySelector('.user-registration');
   const chatWelcome = chatWindow.querySelector('.chat-welcome');
   const nameInput = chatWindow.querySelector('#chat-user-name');
   const emailInput = chatWindow.querySelector('#chat-user-email');
   const nameError = chatWindow.querySelector('#name-error');
   const emailError = chatWindow.querySelector('#email-error');


   // Hilfsfunktion zum Generieren einer eindeutigen Sitzungs-ID
   function createSessionId() {
       return crypto.randomUUID();
   }


   // Typisierungsanzeige-Element erstellen
   function createTypingIndicator() {
       const indicator = document.createElement('div');
       indicator.className = 'typing-indicator';
       indicator.innerHTML = `
           <div class="typing-dot"></div>
           <div class="typing-dot"></div>
           <div class="typing-dot"></div>
       `;
       return indicator;
   }


   // Funktion zum Konvertieren von URLs in Text in klickbare Links
   function linkifyText(text) {
       // URL-Muster, das http, https, ftp Links abgleicht
       const urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      
       // URLs in HTML-Links umwandeln
       return text.replace(urlPattern, function(url) {
           return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${url}</a>`;
       });
   }


   // Registrierungsformular anzeigen
   function showRegistrationForm() {
       chatWelcome.style.display = 'none';
       userRegistration.classList.add('active');
   }


   // E-Mail-Format validieren
   function isValidEmail(email) {
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       return emailRegex.test(email);
   }


   // Registrierungsformular-Einreichung verarbeiten
   async function handleRegistration(event) {
       event.preventDefault();
      
       // Fehlermeldungen zurücksetzen
       nameError.textContent = '';
       emailError.textContent = '';
       nameInput.classList.remove('error');
       emailInput.classList.remove('error');
      
       // Werte abrufen
       const name = nameInput.value.trim();
       const email = emailInput.value.trim();
      
       // Validieren
       let isValid = true;
      
       if (!name) {
           nameError.textContent = 'Bitte geben Sie Ihren Namen ein';
           nameInput.classList.add('error');
           isValid = false;
       }
      
       if (!email) {
           emailError.textContent = 'Bitte geben Sie Ihre E-Mail-Adresse ein';
           emailInput.classList.add('error');
           isValid = false;
       } else if (!isValidEmail(email)) {
           emailError.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
           emailInput.classList.add('error');
           isValid = false;
       }
      
       if (!isValid) return;
      
       // Konversation mit Benutzerdaten initialisieren
       conversationId = createSessionId();
      
       // Zuerst die Sitzung laden
       const sessionData = [{
           action: "loadPreviousSession",
           sessionId: conversationId,
           route: settings.webhook.route,
           metadata: {
               userId: email,
               userName: name
           }
       }];


       try {
           // Registrierungsformular ausblenden, Chat-Oberfläche anzeigen
           userRegistration.classList.remove('active');
           chatBody.classList.add('active');
          
           // Tipp-Anzeige anzeigen
           const typingIndicator = createTypingIndicator();
           messagesContainer.appendChild(typingIndicator);
          
           // Sitzung laden
           const sessionResponse = await fetch(settings.webhook.url, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(sessionData)
           });
          
           const sessionResponseData = await sessionResponse.json();
          
           // Benutzerinformationen als erste Nachricht senden
           const userInfoMessage = `Name: ${name}\nE-Mail: ${email}`;
          
           const userInfoData = {
               action: "sendMessage",
               sessionId: conversationId,
               route: settings.webhook.route,
               chatInput: userInfoMessage,
               metadata: {
                   userId: email,
                   userName: name,
                   isUserInfo: true
               }
           };
          
           // Benutzerinformationen senden
           const userInfoResponse = await fetch(settings.webhook.url, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(userInfoData)
           });
          
           const userInfoResponseData = await userInfoResponse.json();
          
           // Tipp-Anzeige entfernen
           messagesContainer.removeChild(typingIndicator);
          
           // Erste Bot-Nachricht mit klickbaren Links anzeigen
           const botMessage = document.createElement('div');
           botMessage.className = 'chat-bubble bot-bubble';
           const messageText = Array.isArray(userInfoResponseData) ?
               userInfoResponseData[0].output : userInfoResponseData.output;
           botMessage.innerHTML = linkifyText(messageText);
           messagesContainer.appendChild(botMessage);
          
           // Beispielvorschläge hinzufügen, falls konfiguriert
           if (settings.suggestedQuestions && Array.isArray(settings.suggestedQuestions) && settings.suggestedQuestions.length > 0) {
               const suggestedQuestionsContainer = document.createElement('div');
               suggestedQuestionsContainer.className = 'suggested-questions';
              
               settings.suggestedQuestions.forEach(question => {
                   const questionButton = document.createElement('button');
                   questionButton.className = 'suggested-question-btn';
                   questionButton.textContent = question;
                   questionButton.addEventListener('click', () => {
                       submitMessage(question);
                       // Vorschläge nach dem Klicken entfernen
                       if (suggestedQuestionsContainer.parentNode) {
                           suggestedQuestionsContainer.parentNode.removeChild(suggestedQuestionsContainer);
                       }
                   });
                   suggestedQuestionsContainer.appendChild(questionButton);
               });
              
               messagesContainer.appendChild(suggestedQuestionsContainer);
           }
          
           messagesContainer.scrollTop = messagesContainer.scrollHeight;
       } catch (error) {
           console.error('Registrierungsfehler:', error);
          
           // Tipp-Anzeige entfernen, falls vorhanden
           const indicator = messagesContainer.querySelector('.typing-indicator');
           if (indicator) {
               messagesContainer.removeChild(indicator);
           }
          
           // Fehlermeldung anzeigen
           const errorMessage = document.createElement('div');
           errorMessage.className = 'chat-bubble bot-bubble';
           errorMessage.textContent = "Entschuldigung, ich konnte keine Verbindung zum Server herstellen. Bitte versuchen Sie es später erneut.";
           messagesContainer.appendChild(errorMessage);
           messagesContainer.scrollTop = messagesContainer.scrollHeight;
       }
   }


   // Eine Nachricht an den Webhook senden
   async function submitMessage(messageText) {
       if (isWaitingForResponse) return;
      
       isWaitingForResponse = true;
      
       // Benutzerinformationen abrufen, falls verfügbar
       const email = nameInput ? nameInput.value.trim() : "";
       const name = emailInput ? emailInput.value.trim() : "";
      
       const requestData = {
           action: "sendMessage",
           sessionId: conversationId,
           route: settings.webhook.route,
           chatInput: messageText,
           metadata: {
               userId: email,
               userName: name
           }
       };


       // Benutzernachricht anzeigen
       const userMessage = document.createElement('div');
       userMessage.className = 'chat-bubble user-bubble';
       userMessage.textContent = messageText;
       messagesContainer.appendChild(userMessage);
      
       // Tipp-Anzeige anzeigen
       const typingIndicator = createTypingIndicator();
       messagesContainer.appendChild(typingIndicator);
       messagesContainer.scrollTop = messagesContainer.scrollHeight;


       try {
           const response = await fetch(settings.webhook.url, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(requestData)
           });
          
           const responseData = await response.json();
          
           // Tipp-Anzeige entfernen
           messagesContainer.removeChild(typingIndicator);
          
           // Bot-Antwort mit klickbaren Links anzeigen
           const botMessage = document.createElement('div');
           botMessage.className = 'chat-bubble bot-bubble';
           const responseText = Array.isArray(responseData) ? responseData[0].output : responseData.output;
           botMessage.innerHTML = linkifyText(responseText);
           messagesContainer.appendChild(botMessage);
           messagesContainer.scrollTop = messagesContainer.scrollHeight;
       } catch (error) {
           console.error('Fehler beim Senden der Nachricht:', error);
          
           // Tipp-Anzeige entfernen
           messagesContainer.removeChild(typingIndicator);
          
           // Fehlermeldung anzeigen
           const errorMessage = document.createElement('div');
           errorMessage.className = 'chat-bubble bot-bubble';
           errorMessage.textContent = "Entschuldigung, ich konnte Ihre Nachricht nicht senden. Bitte versuchen Sie es erneut.";
           messagesContainer.appendChild(errorMessage);
           messagesContainer.scrollTop = messagesContainer.scrollHeight;
       } finally {
           isWaitingForResponse = false;
       }
   }


   // Textfeld automatisch in der Größe anpassen, während der Benutzer tippt
   function autoResizeTextarea() {
       messageTextarea.style.height = 'auto';
       messageTextarea.style.height = (messageTextarea.scrollHeight > 120 ? 120 : messageTextarea.scrollHeight) + 'px';
   }


   // Event-Listener
   startChatButton.addEventListener('click', showRegistrationForm);
   registrationForm.addEventListener('submit', handleRegistration);
  
   sendButton.addEventListener('click', () => {
       const messageText = messageTextarea.value.trim();
       if (messageText && !isWaitingForResponse) {
           submitMessage(messageText);
           messageTextarea.value = '';
           messageTextarea.style.height = 'auto';
       }
   });
  
   messageTextarea.addEventListener('input', autoResizeTextarea);
  
   messageTextarea.addEventListener('keypress', (event) => {
       if (event.key === 'Enter' && !event.shiftKey) {
           event.preventDefault();
           const messageText = messageTextarea.value.trim();
           if (messageText && !isWaitingForResponse) {
               submitMessage(messageText);
               messageTextarea.value = '';
               messageTextarea.style.height = 'auto';
           }
       }
   });
  
   launchButton.addEventListener('click', () => {
       chatWindow.classList.toggle('visible');
   });


   // Schließen-Button-Funktionalität
   const closeButtons = chatWindow.querySelectorAll('.chat-close-btn');
   closeButtons.forEach(button => {
       button.addEventListener('click', () => {
           chatWindow.classList.remove('visible');
       });
   });
})();



