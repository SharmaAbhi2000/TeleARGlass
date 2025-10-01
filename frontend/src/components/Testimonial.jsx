import React from "react";
import Container from "./ui/Container";

const testimonials = [
  {
    id: 1,
    name: "Varun Yadav",
    role: "Microsoft for Startups Mentor",
    content:
     "From his words. Very Good product, he personally would like & many others “you tube skip feature” from thinking thus they do not want interruption to their core work.",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    name: "Jiten Thakkar",
    role: "Swarrnim Incubation Manager, Registered Indian Patent Agent",
    content:
    "He filed my TeleARGlass industrial design Patent in India. He said “awesome design in terms of Brain-Technology Interface Products” & I should leverage the IP rights.",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-teal-50 via-cyan-50 to-violet-50 text-gray-900">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-3">
            TeleExpert Review
          </h2>
          <p className="text-cyan-700 max-w-2xl mx-auto text-sm">
            As per Our current TeleARGlass Trials
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 max-w-md"
            >
              <div className="mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="inline-block w-4 h-4 text-yellow-400 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-cyan-800 mb-4 italic text-sm leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div>
                  <p className="font-medium text-teal-800 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-violet-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
