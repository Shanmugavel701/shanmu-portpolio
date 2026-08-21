import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  MessageSquare,
  Bot,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Volume2,
  VolumeX,
} from "lucide-react";
import { contact, services } from "@/data/site";
import { speakFemaleVoice, setVoiceMuted } from "@/lib/speech";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  quickReplies?: string[] | undefined;
  isLeadForm?: boolean | undefined;
  leadCaptured?: boolean | undefined;
}

const KNOWLEDGE_BASE: { keywords: string[]; response: string; quickReplies?: string[] }[] = [
  {
    keywords: ["hi", "hello", "hey", "start", "help", "who"],
    response:
      "Hello! 👋 I'm Shanmu's AI Assistant. Shanmu is a Website Developer & Digital Growth Specialist based in Coimbatore, Tamil Nadu, India. How can I help you scale your business today?",
    quickReplies: [
      "💻 Website & WordPress Development",
      "🛍️ E-Commerce & Landing Pages",
      "📈 SEO & Digital Marketing",
      "💰 Get a Project Quote",
    ],
  },
  {
    keywords: ["services", "what you do", "offer", "help", "work"],
    response:
      "Shanmu specializes in revenue-focused digital services:\n\n• **WordPress & Business Website Development**: Ultra-fast, SEO-optimized custom websites\n• **E-Commerce & Landing Pages**: High-converting WooCommerce stores & sales funnels\n• **Brand Identity & UI/UX**: Distinctive visual design in Figma\n• **Video Editing**: High-engagement short-form reels & promotional videos\n• **Digital Marketing & SEO**: Full-funnel search rankings and lead engines\n\nWhich service does your business need?",
    quickReplies: [
      "💻 WordPress Development",
      "🛍️ E-Commerce Store",
      "🚀 SEO & Lead Generation",
      "🎨 Brand & UI/UX Design",
    ],
  },
  {
    keywords: ["website", "web", "development", "wordpress", "landing page", "ecommerce", "woocommerce", "redesign", "speed"],
    response:
      "We build custom WordPress websites, WooCommerce stores, and high-converting landing pages engineered for sub-1.5s load times, Google Core Web Vitals, and maximum lead conversion. We don't use bloated pre-made templates.\n\nWould you like a custom quote or website audit?",
    quickReplies: ["📋 Get a Website Quote", "🌟 View Case Studies", "💬 Chat on WhatsApp"],
  },
  {
    keywords: ["price", "cost", "pricing", "rate", "quote", "estimate", "budget", "how much"],
    response:
      "Every project is tailored to your business scope and revenue goals. High-converting landing pages and business websites are competitively priced, while full e-commerce stores and custom platforms are quoted after understanding your exact requirements.\n\nLet's capture a few project details so Shanmu can provide an exact estimate!",
    quickReplies: ["📝 Share Project Details", "💬 Chat on WhatsApp", "📅 Book a Call"],
  },
  {
    keywords: ["location", "coimbatore", "chennai", "bangalore", "tamil nadu", "india", "dubai", "uae", "usa", "uk", "where"],
    response:
      "Shanmu is based in **Coimbatore, Tamil Nadu, India**, and works with clients across Chennai, Bangalore, Mumbai, and internationally in the UAE (Dubai), the USA, the UK, and Singapore. All project delivery and communication is handled seamlessly online.",
    quickReplies: ["💬 WhatsApp Now", "📝 Get a Project Quote", "📧 Send an Email"],
  },
  {
    keywords: ["marketing", "growth", "lead", "ads", "seo", "social"],
    response:
      "Our SEO and digital marketing systems have generated over ₹2Cr+ in client revenue. We focus on ranking for high-intent commercial keywords, technical SEO, and building high-converting paid & organic funnels.",
    quickReplies: ["🚀 Scale My Search Rankings", "📞 Schedule Consultation", "💬 WhatsApp Chat"],
  },
  {
    keywords: ["about", "experience", "who is", "shanmu", "background"],
    response:
      "Shanmu (Shanmugavel) is a Website Developer & Digital Growth Specialist with 5+ years of experience, 20+ high-ticket clients, and ₹2Cr+ in revenue generated. He is also the founder of digital platforms Shadivi and VelzX.",
    quickReplies: ["🌟 View Case Studies", "📝 Start a Project", "💬 Contact Directly"],
  },
  {
    keywords: ["contact", "email", "phone", "whatsapp", "call", "reach"],
    response:
      "You can connect directly with Shanmu via WhatsApp (+91 7010146105), email (shanmugavelnkt@gmail.com), or by leaving your project brief right here. What works best for you?",
    quickReplies: ["💬 WhatsApp Now", "📝 Leave Project Info", "📧 Send an Email"],
  },
];

function getBotAnswer(userInput: string): { text: string; quickReplies?: string[] | undefined; isLeadForm?: boolean | undefined } {
  const query = userInput.toLowerCase();

  if (
    query.includes("quote") ||
    query.includes("estimate") ||
    query.includes("start a project") ||
    query.includes("share project") ||
    query.includes("lead info")
  ) {
    return {
      text: "Great! Let's get some basic details so Shanmu can prepare a tailored strategy and quote for you. Please fill in the quick form below:",
      isLeadForm: true,
    };
  }

  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((k) => query.includes(k))) {
      return { text: item.response, quickReplies: item.quickReplies };
    }
  }

  return {
    text: "Thanks for asking! Shanmu specializes in high-converting websites, custom WordPress, brand identity, and digital growth marketing. Would you like to share your project requirements or connect directly on WhatsApp?",
    quickReplies: ["📝 Get a Project Estimate", "💬 Chat on WhatsApp", "🌟 Explore Services"],
  };
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "👋 Hi there! I'm Shanmu's AI Assistant. How can I help you build or scale your digital brand today?",
      timestamp: "Just now",
      quickReplies: [
        "🚀 How can Shanmu help me?",
        "💻 Website Development",
        "💰 Get Project Estimate",
        "📞 Book a Consultation",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [leadForm, setLeadForm] = useState({
    name: "",
    contactInfo: "",
    service: "Website Development",
    details: "",
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasWelcomed = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);

      // Speak female voice greeting when user opens the assistant
      if (!hasWelcomed.current && !isMuted) {
        hasWelcomed.current = true;
        speakFemaleVoice("Welcome to Shanmu's Assistant! How can I help you scale your business today?");
      }
    }
  }, [isOpen, messages, isTyping, isMuted]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsgId = Date.now().toString();
    const userMsg: Message = {
      id: userMsgId,
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const { text: botReply, quickReplies, isLeadForm } = getBotAnswer(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botReply,
        timestamp: "Just now",
        quickReplies,
        isLeadForm,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // Voice Assistant speech in female voice
      if (!isMuted) {
        speakFemaleVoice(botReply);
      }
    }, 700);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.contactInfo) return;

    setLeadSubmitted(true);

    const waText = encodeURIComponent(
      `Hello Shanmu! I submitted a project inquiry via your website AI Assistant.\n\n*Name:* ${leadForm.name}\n*Contact:* ${leadForm.contactInfo}\n*Service:* ${leadForm.service}\n*Details:* ${leadForm.details || "Let's discuss"}`,
    );

    const botConfirmMsg: Message = {
      id: Date.now().toString(),
      sender: "bot",
      text: `🎉 Thank you, **${leadForm.name}**! Your project details have been received. Shanmu will connect with you shortly.\n\nYou can also click below to open WhatsApp with your details pre-filled for an instant reply!`,
      timestamp: "Just now",
      leadCaptured: true,
      quickReplies: ["💬 Open WhatsApp Chat Now", "🔄 Ask Another Question"],
    };

    setMessages((prev) => [...prev, botConfirmMsg]);

    // Voice Assistant speech confirmation
    if (!isMuted) {
      speakFemaleVoice(`Thank you ${leadForm.name}! Your project details have been received. Shanmu will connect with you shortly.`);
    }
  };

  const handleQuickReply = (reply: string) => {
    if (reply === "💬 Open WhatsApp Chat Now" || reply === "💬 Chat on WhatsApp" || reply === "💬 WhatsApp Now") {
      const waText = encodeURIComponent(
        `Hi Shanmu, I visited your portfolio website and would like to discuss a project.`,
      );
      window.open(`https://wa.me/917010146105?text=${waText}`, "_blank");
      return;
    }

    if (reply === "🔄 Ask Another Question" || reply === "Restart") {
      setMessages([
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "What else would you like to know about Shanmu's work or services?",
          timestamp: "Just now",
          quickReplies: [
            "🚀 How can Shanmu help me?",
            "💻 Website Development",
            "💰 Get Project Estimate",
            "📞 Book a Consultation",
          ],
        },
      ]);
      setLeadSubmitted(false);
      return;
    }

    if (reply === "📧 Send an Email") {
      window.location.href = `mailto:${contact.email}?subject=Project%20Inquiry%20from%20Portfolio`;
      return;
    }

    handleSendMessage(reply);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Subtle Greeting Bubble when closed */}
        {!isOpen && hasUnread && (
          <div
            onClick={() => setIsOpen(true)}
            className="animate-bounce group flex cursor-pointer items-center gap-2.5 rounded-full border border-gold/40 bg-deep/95 px-4 py-2 text-xs font-poppins font-medium text-cream shadow-xl backdrop-blur-md transition-all duration-300 hover:border-gold hover:scale-105"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Need a quote or idea? <span className="text-gold font-semibold">Ask AI</span></span>
            <X
              className="h-3.5 w-3.5 opacity-60 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setHasUnread(false);
              }}
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          aria-expanded={isOpen}
          className="group relative flex h-13 w-13 items-center justify-center rounded-full border border-gold/50 bg-gradient-to-tr from-[#0b2619] via-[#123826] to-[#0b2619] text-gold shadow-[0_8px_25px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-110 hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] active:scale-95"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-cream transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <>
              <Sparkles className="h-6 w-6 text-gold animate-pulse" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-deep bg-emerald-500" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Shanmu AI Assistant"
          className="fixed bottom-24 right-4 sm:right-6 z-50 flex w-[calc(100vw-2rem)] sm:w-[390px] flex-col overflow-hidden rounded-3xl border border-gold/30 bg-[#0c2418]/95 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl font-poppins text-cream animate-in fade-in zoom-in-95 duration-200"
          style={{ height: "min(580px, calc(100dvh - 7rem))" }}
        >
          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-cream/15 bg-gradient-to-r from-[#091f14] via-[#0f2e1e] to-[#091f14] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <Bot className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-deep bg-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-white tracking-wide">Shanmu AI</h3>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[0.62rem] font-medium text-emerald-300">
                    Online
                  </span>
                </div>
                <p className="text-[0.72rem] text-cream/65">Voice &amp; Growth Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Voice Mute / Unmute Button */}
              <button
                type="button"
                onClick={() => {
                  const nextMuted = !isMuted;
                  setIsMuted(nextMuted);
                  setVoiceMuted(nextMuted);
                  if (!nextMuted) {
                    speakFemaleVoice("Voice enabled. Welcome to Shanmu's assistant!", true);
                  }
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                  isMuted
                    ? "text-cream/40 hover:text-cream bg-white/5"
                    : "text-gold bg-gold/15 hover:bg-gold/25 shadow-xs"
                }`}
                aria-label={isMuted ? "Enable Voice Assistant" : "Mute Voice Assistant"}
                title={isMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 animate-pulse" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-cream/60 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-cream/10">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold border border-gold/30">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl px-4 py-3 text-xs sm:text-[0.82rem] leading-relaxed shadow-sm ${
                    m.sender === "user"
                      ? "rounded-tr-none bg-gold text-ink font-medium"
                      : "rounded-tl-none border border-cream/10 bg-white/[0.07] text-cream/90 backdrop-blur-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Inline Lead Capture Form */}
                  {m.isLeadForm && !leadSubmitted && (
                    <form onSubmit={handleLeadSubmit} className="mt-3.5 space-y-2.5 border-t border-cream/15 pt-3">
                      <div>
                        <label className="block text-[0.68rem] text-cream/75 mb-1 font-medium">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className="w-full rounded-lg border border-cream/20 bg-black/30 px-3 py-1.5 text-xs text-white placeholder:text-cream/40 focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[0.68rem] text-cream/75 mb-1 font-medium">
                          Email or WhatsApp *
                        </label>
                        <input
                          type="text"
                          required
                          value={leadForm.contactInfo}
                          onChange={(e) => setLeadForm({ ...leadForm, contactInfo: e.target.value })}
                          placeholder="you@company.com or Phone"
                          className="w-full rounded-lg border border-cream/20 bg-black/30 px-3 py-1.5 text-xs text-white placeholder:text-cream/40 focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[0.68rem] text-cream/75 mb-1 font-medium">Service Needed</label>
                        <select
                          value={leadForm.service}
                          onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                          className="w-full rounded-lg border border-cream/20 bg-[#091f14] px-2.5 py-1.5 text-xs text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Website Development">Website Development</option>
                          <option value="WordPress Development">WordPress Development</option>
                          <option value="E-Commerce Store">E-Commerce Store</option>
                          <option value="Website Redesign & Speed">Website Redesign &amp; Speed</option>
                          <option value="Brand Identity & Design">Brand Identity &amp; Design</option>
                          <option value="Video Editing">Video Editing</option>
                          <option value="Digital Marketing & SEO">Digital Marketing &amp; SEO</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[0.68rem] text-cream/75 mb-1 font-medium">Project Brief</label>
                        <textarea
                          rows={2}
                          value={leadForm.details}
                          onChange={(e) => setLeadForm({ ...leadForm, details: e.target.value })}
                          placeholder="Tell us about your project or goals"
                          className="w-full resize-none rounded-lg border border-cream/20 bg-black/30 px-3 py-1.5 text-xs text-white placeholder:text-cream/40 focus:border-gold focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-gold py-2.5 text-xs font-semibold text-ink shadow-md transition-all hover:bg-[#e5c158] active:scale-98"
                      >
                        Submit Project Request <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  )}

                  {/* Quick Action Buttons */}
                  {m.quickReplies && m.quickReplies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-cream/10 pt-2.5">
                      {m.quickReplies.map((qr) => (
                        <button
                          key={qr}
                          type="button"
                          onClick={() => handleQuickReply(qr)}
                          className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.7rem] font-medium text-gold transition-all hover:bg-gold hover:text-ink active:scale-95 text-left"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-cream/60 text-xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-gold border border-gold/30">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="flex gap-1 rounded-full bg-white/5 px-3 py-1.5 border border-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce" />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ / Services Bar */}
          <div className="border-t border-cream/10 bg-black/20 px-3 py-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[0.68rem] text-cream/75">
              <span className="shrink-0 text-gold font-medium">Quick:</span>
              <button
                type="button"
                onClick={() => handleSendMessage("💻 Tell me about Website Development")}
                className="shrink-0 rounded-md bg-white/5 px-2 py-0.5 hover:bg-gold/20 hover:text-gold transition-colors"
              >
                Website Dev
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("🛍️ E-Commerce & WooCommerce")}
                className="shrink-0 rounded-md bg-white/5 px-2 py-0.5 hover:bg-gold/20 hover:text-gold transition-colors"
              >
                E-Commerce
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("💰 How much does a website cost?")}
                className="shrink-0 rounded-md bg-white/5 px-2 py-0.5 hover:bg-gold/20 hover:text-gold transition-colors"
              >
                Pricing
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("📍 Where are you located?")}
                className="shrink-0 rounded-md bg-white/5 px-2 py-0.5 hover:bg-gold/20 hover:text-gold transition-colors"
              >
                Location
              </button>
            </div>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 border-t border-cream/15 bg-gradient-to-r from-[#091f14] via-[#0f2e1e] to-[#091f14] p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about website, pricing, SEO..."
              className="flex-1 rounded-xl border border-cream/20 bg-black/30 px-3.5 py-2.5 text-xs text-white placeholder:text-cream/45 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-ink transition-transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
