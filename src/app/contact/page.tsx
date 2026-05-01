"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-offwhite py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ocean mb-4">Contact Us</h1>
            <p className="text-ocean/70 text-lg">We'd love to hear from you. Get in touch with our team.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            {/* Contact Info */}
            <div className="w-full md:w-1/3">
              <h2 className="font-serif text-2xl font-bold text-ocean mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="text-gold mt-1 mr-4" size={24} />
                  <div>
                    <h3 className="font-bold text-ocean mb-1">Our Location</h3>
                    <p className="text-ocean/70">123 Coastal Road, Marina Beach<br />Chennai, Tamil Nadu 600004<br />India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-gold mt-1 mr-4" size={24} />
                  <div>
                    <h3 className="font-bold text-ocean mb-1">Phone</h3>
                    <p className="text-ocean/70">+91 98765 43210<br />Mon-Sat, 9am - 6pm</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-gold mt-1 mr-4" size={24} />
                  <div>
                    <h3 className="font-bold text-ocean mb-1">Email</h3>
                    <p className="text-ocean/70">hello@freshco.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-2/3">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-sand/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl -mt-10 -mr-10"></div>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <h3 className="font-serif text-2xl text-ocean mb-2">Message Sent!</h3>
                    <p className="text-ocean/70">Thank you for reaching out. We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-ocean/80 mb-2">Name</label>
                        <input required type="text" className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm text-ocean/80 mb-2">Email</label>
                        <input required type="email" className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="Your email address" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-ocean/80 mb-2">Subject</label>
                      <input required type="text" className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="How can we help?" />
                    </div>
                    <div>
                      <label className="block text-sm text-ocean/80 mb-2">Message</label>
                      <textarea required rows={5} className="w-full bg-offwhite border border-sand/50 rounded px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Write your message here..."></textarea>
                    </div>
                    <button type="submit" className="bg-ocean text-gold px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-ocean-light transition-colors shadow-md">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
