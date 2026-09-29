"use client";

import React, { useState } from "react";
import { CheckCircleIcon, CaretDownIcon } from "@phosphor-icons/react";

export const ContactCard = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "Custom Safari Package",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-white shadow-xl p-5 sm:p-7 lg:p-8 relative z-20 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Let's chat heading & connect text */}
        <div className="lg:col-span-4 flex flex-col justify-start pr-0 lg:pr-2">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
            Let&apos;s chat.
          </h2>

          <p className="mt-2.5 sm:mt-3 text-sm text-neutral-600 leading-relaxed">
            Have questions about our safaris, custom itineraries, or reservations?
            Drop us a line and let&apos;s connect.
          </p>
        </div>

        {/* Right Column: Form Fields */}
        <div className="lg:col-span-8">
          {isSubmitted ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-200/70 flex flex-col items-center justify-center text-center space-y-2.5">
              <CheckCircleIcon size={40} weight="fill" className="text-emerald-700" />
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Message sent!</h3>
              <p className="text-sm text-neutral-600 max-w-md">
                Thank you for reaching out, {formData.fullName || "traveler"}. Our expedition team will review your message and reply within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    subject: "Custom Safari Package",
                    message: "",
                  });
                }}
                className="mt-2 cursor-pointer text-xs font-semibold uppercase tracking-wider text-emerald-800 underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 sm:gap-y-3.5">
              {/* Full Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Maya Lin"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-800 outline-none focus:ring-1 focus:ring-black transition-colors"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@domain.com"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-800 outline-none focus:ring-1 focus:ring-black transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="phoneNumber"
                  className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1"
                >
                  Phone Number <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-800 outline-none focus:ring-1 focus:ring-black transition-colors"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col">
                <label
                  htmlFor="subject"
                  className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-800 outline-none focus:ring-1 focus:ring-black transition-colors pr-9 cursor-pointer"
                  >
                    <option value="Custom Safari Package">Custom Safari Package</option>
                    <option value="Trip Booking & Availability">Trip Booking & Availability</option>
                    <option value="Budget & Itinerary Inquiry">Budget & Itinerary Inquiry</option>
                    <option value="Private Group Expedition">Private Group Expedition</option>
                    <option value="General Question">General Question</option>
                  </select>
                  <CaretDownIcon
                    size={14}
                    weight="bold"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col sm:col-span-2">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your travel dates, preferred destinations, or any questions..."
                  className="w-full resize-none rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-800 outline-none focus:ring-1 focus:ring-black transition-colors"
                />
              </div>

              {/* Send message button */}
              <div className="sm:col-span-2 pt-1 flex justify-start">
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-colors px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-md active:scale-[0.98]"
                >
                  Send message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
