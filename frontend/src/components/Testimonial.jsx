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
    <section className="py-16 bg-gradient-to-b from-teal-50 via-cyan-50 to-violet-50 text-gray-900">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-700 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-cyan-700 max-w-2xl mx-auto">
            Don't just take our word for it – here's what customers think about
            their TechHub experience.
          </p>
        </div>

        <div className="flex min-w-40 justify-center items-center  gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="inline-block w-5 h-5 text-yellow-400 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-cyan-800 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                {/* <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-teal-400"
                /> */}
                <div>
                  <p className="font-medium text-teal-800">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-violet-600">{testimonial.role}</p>
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
