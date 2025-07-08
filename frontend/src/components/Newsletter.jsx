import React, { useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-teal-50 via-cyan-50 to-violet-50 text-gray-900">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block p-2 bg-teal-100 rounded-full mb-2">
              <svg
                className="w-6 h-6 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
          </div>
          <h2 className="text-3xl font-bold text-teal-700 mb-4">
            Stay Updated with our new Tele products
          </h2>
          <p className="text-cyan-700 mb-8">
            We thrive by continuous improvement at TeleARGlass by Innovation &
            Sustainability. That We apply in New TeleProducts with performance
            as per current Teleconsumers needs.
          </p>

          {submitted ? (
            <div className="bg-emerald-100 text-emerald-800 p-4 rounded-lg">
              <p className="font-medium">Thank you for subscribing!</p>
              <p className="text-sm mt-1">
                We've sent a confirmation email to {email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-grow px-4 py-3 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-teal-600 hover:bg-teal-700 px-6 py-3 sm:whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                By subscribing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
