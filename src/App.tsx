/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Code2, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  Layout, 
  ShoppingBag, 
  MessageSquare, 
  Star, 
  ArrowRight, 
  CheckCircle2,
  Menu,
  X,
  Instagram,
  Twitter,
  Linkedin,
  Github
} from "lucide-react";
import { useState, useEffect, ReactNode, useRef } from "react";

const WHATSAPP_NUMBER = "+923117504081";
const EMAIL_ADDRESS = "aiwithqammar@gmail.com";

const getWhatsAppLink = (message?: string) => {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const PricingCard = ({ 
  title, 
  price, 
  originalPrice, 
  features, 
  highlighted = false, 
  tag 
}: { 
  title: string; 
  price: string; 
  originalPrice?: string; 
  features: string[]; 
  highlighted?: boolean; 
  tag?: string;
}) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -10 }}
    className={`bg-glass p-8 rounded-3xl relative overflow-hidden flex flex-col h-full transition-all duration-300 ${highlighted ? "neon-border-purple scale-105 z-10" : "border border-white/10"}`}
  >
    {tag && (
      <div className="absolute top-0 right-0 bg-neon-purple text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
        {tag}
      </div>
    )}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex items-baseline gap-2 mb-6">
      <span className={`text-4xl font-bold ${highlighted ? "text-neon-purple" : "text-white"}`}>{price}</span>
      {originalPrice && <span className="text-gray-500 line-through text-sm">{originalPrice}</span>}
    </div>
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${highlighted ? "text-neon-purple" : "text-neon-blue"}`} />
          {feature}
        </li>
      ))}
    </ul>
    <a 
      href={getWhatsAppLink(`I'll Buy this ${title} package`)}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-full py-4 font-bold rounded-xl text-center transition-all ${highlighted ? "bg-neon-purple text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]" : "bg-white/10 text-white hover:bg-white/20"}`}
    >
      Order Now
    </a>
  </motion.div>
);

const NavItem = ({ href, children, onClick }: { href: string; children: ReactNode; onClick?: () => void }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
  >
    {children}
  </a>
);

const SectionHeading = ({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) => (
  <div className={`mb-16 ${centered ? "text-center" : ""}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`h-1 bg-neon-blue mt-6 ${centered ? "mx-auto" : ""}`} 
    />
  </div>
);

const ServiceCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -10 }}
    className="bg-glass p-8 rounded-2xl hover:neon-border transition-all duration-300 group"
  >
    <div className="w-12 h-12 bg-neon-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-neon-blue/20 transition-colors">
      <Icon className="w-6 h-6 text-neon-blue" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const ProjectCard = ({ title, category, image }: { title: string; category: string; image: string }) => (
  <motion.div 
    variants={itemVariants}
    className="relative group overflow-hidden rounded-2xl aspect-video"
  >
    <img 
      src={image} 
      alt={title} 
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
      <span className="text-neon-blue text-xs font-bold uppercase tracking-widest mb-2">{category}</span>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, role, content, rating }: { name: string; role: string; content: string; rating: number }) => (
  <motion.div 
    variants={itemVariants}
    className="bg-glass p-8 rounded-2xl border border-white/5"
  >
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-neon-blue text-neon-blue" />
      ))}
    </div>
    <p className="text-gray-300 italic mb-6">"{content}"</p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center font-bold text-neon-purple">
        {name[0]}
      </div>
      <div>
        <h4 className="font-bold text-sm">{name}</h4>
        <p className="text-gray-500 text-xs">{role}</p>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const whyChooseUsRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const glowY1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  const { scrollYProgress: whyChooseUsProgress } = useScroll({
    target: whyChooseUsRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(whyChooseUsProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Adsterra Banner 160x300 Script Injection
    try {
      (window as any).atOptions = {
        'key' : '49c8003a843ebd4050f438c5cce7dfac',
        'format' : 'iframe',
        'height' : 300,
        'width' : 160,
        'params' : {}
      };
      
      const script = document.createElement("script");
      script.src = "https://valuationappeared.com/49c8003a843ebd4050f438c5cce7dfac/invoke.js";
      script.async = true;
      document.getElementById("ad-banner-160x300")?.appendChild(script);
    } catch (e) {
      console.error("Adsterra Script Error:", e);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Background Glows with Parallax */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <motion.div 
          style={{ y: glowY1 }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          style={{ y: glowY2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-purple/10 blur-[120px] rounded-full" 
        />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-blue rounded-lg flex items-center justify-center">
              <Code2 className="text-black w-5 h-5" />
            </div>
            <span>Code Craft <span className="text-neon-blue">Studio</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavItem href="#services">Services</NavItem>
            <NavItem href="#portfolio">Portfolio</NavItem>
            <NavItem href="#pricing">Pricing</NavItem>
            <NavItem href="#testimonials">Reviews</NavItem>
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-neon-blue text-black font-bold rounded-full text-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <NavItem href="#services" onClick={() => setIsMenuOpen(false)}>Services</NavItem>
                <NavItem href="#portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</NavItem>
                <NavItem href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</NavItem>
                <NavItem href="#testimonials" onClick={() => setIsMenuOpen(false)}>Reviews</NavItem>
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-neon-blue text-black font-bold rounded-xl text-center"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-neon-blue/10 text-neon-blue text-xs font-bold rounded-full border border-neon-blue/20 mb-6 tracking-widest uppercase">
              Premium Web Solutions
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9]">
              We Build Websites That <br />
              <span className="text-neon-blue text-glow-blue italic">Grow Your Business</span> 🚀
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Affordable, modern, and high-converting websites designed to turn visitors into loyal customers. Let's craft your digital success story.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={getWhatsAppLink("I want to discuss a project with Code Craft Studio")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 bg-neon-blue text-black font-bold rounded-full text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center gap-2 group"
              >
                Order Now on WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <a 
                  href="https://valuationappeared.com/rcur994uzw?key=8e15e0d336bcc3ecbb4da53b80e7fab4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-10 py-5 bg-white/5 text-neon-blue font-bold rounded-full text-lg hover:bg-white/10 transition-all border border-neon-blue/30 flex items-center justify-center gap-2 group animate-pulse"
                >
                  Claim Special Bonus 🎁
                </a>
                <span className="text-[10px] text-gray-600 uppercase tracking-widest text-center">Sponsored Offer</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Our Expert Services" 
            subtitle="We provide end-to-end web development solutions tailored to your business goals."
          />
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <ServiceCard 
              icon={Layout} 
              title="Custom Business Websites" 
              description="Unique designs that reflect your brand identity and professional values."
            />
            <ServiceCard 
              icon={ShoppingBag} 
              title="E-commerce Stores" 
              description="Powerful online stores with seamless checkout and inventory management."
            />
            <ServiceCard 
              icon={Zap} 
              title="Landing Pages" 
              description="High-converting single pages designed for maximum marketing impact."
            />
            <ServiceCard 
              icon={ShieldCheck} 
              title="Fast & Secure" 
              description="Optimized for speed and protected with the latest security standards."
            />
            <ServiceCard 
              icon={Smartphone} 
              title="Mobile Responsive" 
              description="Flawless performance across all devices, from phones to desktops."
            />
            <ServiceCard 
              icon={MessageSquare} 
              title="SEO Optimized" 
              description="Built with search engines in mind to help you rank higher and get found."
            />
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Our Recent Work" 
            subtitle="Explore some of the digital experiences we've crafted for our clients."
          />
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ProjectCard 
              title="Luxe Real Estate" 
              category="Business" 
              image="https://picsum.photos/seed/realestate/800/600"
            />
            <ProjectCard 
              title="Zenith Fashion Store" 
              category="E-commerce" 
              image="https://picsum.photos/seed/fashion/800/600"
            />
            <ProjectCard 
              title="TechFlow SaaS" 
              category="Landing Page" 
              image="https://picsum.photos/seed/tech/800/600"
            />
            <ProjectCard 
              title="Gourmet Kitchen" 
              category="Restaurant" 
              image="https://picsum.photos/seed/food/800/600"
            />
            <ProjectCard 
              title="FitLife Pro" 
              category="Fitness" 
              image="https://picsum.photos/seed/fitness/800/600"
            />
            <ProjectCard 
              title="Creative Pulse" 
              category="Portfolio" 
              image="https://picsum.photos/seed/creative/800/600"
            />
          </motion.div>
          {/* Native Banner Ad Container */}
          <div className="mt-20 flex justify-center">
            <div id="container-fae1bd2fb67d00cb1294eedde47642be" className="w-full max-w-4xl min-h-[100px] border border-white/5 rounded-xl overflow-hidden bg-white/5 p-4 text-center text-xs text-gray-500">
              <span className="mb-2 block uppercase tracking-widest font-bold text-gray-700">Recommended for you</span>
              {/* Adsterra script will inject here */}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyChooseUsRef} className="py-24 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <SectionHeading 
              title="Why Choose Code Craft Studio?" 
              subtitle="We don't just build websites; we build growth engines for your business."
              centered={false}
            />
            <div className="flex gap-8 items-start">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6 flex-grow"
              >
                {[
                  { title: "High-Quality Design", desc: "Pixel-perfect aesthetics that wow your visitors." },
                  { title: "Fast Delivery", desc: "We respect your time and deliver projects on schedule." },
                  { title: "Affordable Pricing", desc: "Premium quality that doesn't break the bank." },
                  { title: "Client Satisfaction Guarantee", desc: "We work until you are 100% happy with the result." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={itemVariants}
                    className="flex gap-4"
                  >
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-neon-blue" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Sidebar Ad Banner */}
              <div className="hidden xl:block w-[160px] flex-shrink-0">
                <div className="sticky top-24 border border-white/10 rounded-xl overflow-hidden bg-white/5 min-h-[300px]" id="ad-banner-160x300">
                  <div className="text-[10px] text-gray-600 text-center py-1 bg-white/5 uppercase font-bold tracking-widest">Sponsored</div>
                  {/* Adsterra script will inject here */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <motion.div 
              style={{ y: imageY }}
              className="absolute inset-0 bg-neon-blue/20 blur-[100px] rounded-full" 
            />
            <motion.img 
              style={{ y: imageY }}
              src="https://plain-eeur-prod-public.komododecks.com/202604/15/VlybCEWPKkfp1YSZ8fBQ/image.png" 
              alt="Our Team" 
              className="relative z-10 rounded-3xl neon-border"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Simple, Transparent Pricing" 
            subtitle="Get a professional website at an unbeatable price."
          />
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            <PricingCard 
              title="Starter Package"
              price="Rs. 18,000"
              features={[
                "Basic Modern Design",
                "Mobile Responsive",
                "Up to 2 Pages",
                "Basic SEO Setup",
                "Contact Form",
                "Fast Loading"
              ]}
            />
            <PricingCard 
              title="Standard Package"
              price="Rs. 20,000"
              features={[
                "Custom Design",
                "Mobile Responsive",
                "Up to 3 Pages",
                "SEO Optimization",
                "Contact Form Integration",
                "Fast Loading Speed",
                "15 Days Free Support"
              ]}
            />
            <PricingCard 
              title="Professional Package"
              price="Rs. 25,000"
              tag="Limited Time Offer 🔥"
              highlighted={true}
              features={[
                "Custom Modern Design",
                "Mobile Responsive",
                "Up to 5 Pages",
                "Full SEO Optimization",
                "Contact Form Integration",
                "1 Month Free Support",
                "Fast Loading Speed"
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="What Our Clients Say" 
            subtitle="Don't just take our word for it. Here's what business owners think of us."
          />
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <TestimonialCard 
              name="Sarah Johnson" 
              role="Founder, Luxe Real Estate" 
              content="Code Craft Studio transformed our online presence. Our new website is stunning and has significantly increased our leads."
              rating={5}
            />
            <TestimonialCard 
              name="Michael Chen" 
              role="CEO, TechFlow SaaS" 
              content="The speed and professionalism of this agency are unmatched. They delivered a high-converting landing page in record time."
              rating={5}
            />
            <TestimonialCard 
              name="Emma Williams" 
              role="Owner, Gourmet Kitchen" 
              content="I love my new restaurant website! It's so easy for customers to browse our menu and book tables. Highly recommended!"
              rating={5}
            />
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-neon-blue/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Start Your Business Online Today 🚀</h2>
            <p className="text-gray-400 text-xl mb-12">
              Join 50+ successful businesses that trust Code Craft Studio for their digital growth.
            </p>
            <a 
              href={getWhatsAppLink("I'm ready to start my business online today!")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-5 bg-neon-blue text-black font-bold rounded-full text-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all"
            >
              Order Now on WhatsApp
              <ArrowRight className="w-6 h-6" />
            </a>
            
            {/* Revenue Boost: Extra Smartlink below major button */}
            <div className="mt-12 group">
              <a 
                href="https://valuationappeared.com/rcur994uzw?key=8e15e0d336bcc3ecbb4da53b80e7fab4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 text-sm hover:text-neon-blue transition-colors underline decoration-dotted"
              >
                Check out exclusive web templates from our partners
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-neon-blue rounded-lg flex items-center justify-center">
                  <Code2 className="text-black w-5 h-5" />
                </div>
                <span>Code Craft <span className="text-neon-blue">Studio</span></span>
              </a>
              <p className="text-gray-500 max-w-sm mb-8">
                We are a premium web development agency dedicated to building fast, secure, and beautiful websites that drive results.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue/20 hover:text-neon-blue transition-all"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue/20 hover:text-neon-blue transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue/20 hover:text-neon-blue transition-all"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue/20 hover:text-neon-blue transition-all"><Github className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-gray-500">
                <li className="flex items-center gap-2 italic">
                  <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-neon-blue transition-colors">
                    {EMAIL_ADDRESS}
                  </a>
                </li>
                <li className="flex items-center gap-2 italic">
                  <a href={`tel:${WHATSAPP_NUMBER}`} className="hover:text-neon-blue transition-colors">
                    {WHATSAPP_NUMBER}
                  </a>
                </li>
                <li>
                  <a 
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-blue font-bold hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Code Craft Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-8 h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </motion.a>
    </div>
  );
}
