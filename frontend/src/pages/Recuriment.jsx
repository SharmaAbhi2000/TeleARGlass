import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Upload,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Award,
  Star,
  Feather,
} from "lucide-react";
import axios from "axios";

const quizQuestions = [
  {
    question: "What does AI stand for?",
    options: [
      "Automated Intelligence",
      "Artificial Intelligence",
      "Actual Integration",
    ],
    correctAnswer: "Artificial Intelligence",
  },
  // {
  //   question: 'Which language is commonly used for frontend development?',
  //   options: ['Python', 'JavaScript', 'C++'],
  //   correctAnswer: 'JavaScript',
  // },
  // {
  //   question: 'What does HTML stand for?',
  //   options: [
  //     'Hyper Text Markup Language',
  //     'High Text Machine Language',
  //     'Hyperlinks and Text Markup Language',
  //   ],
  //   correctAnswer: 'Hyper Text Markup Language',
  // },
  // {
  //   question: 'Which company developed the React library?',
  //   options: ['Google', 'Facebook', 'Microsoft'],
  //   correctAnswer: 'Facebook',
  // },
  // {
  //   question: 'Which tag is used to insert a line break in HTML?',
  //   options: ['<br>', '<lb>', '<break>'],
  //   correctAnswer: '<br>',
  // },
  // {
  //   question: 'What is the default port for HTTP?',
  //   options: ['80', '443', '21'],
  //   correctAnswer: '80',
  // },
  // {
  //   question: 'Which symbol is used to denote an id in CSS?',
  //   options: ['.', '#', '*'],
  //   correctAnswer: '#',
  // },
  // {
  //   question: 'What does JSON stand for?',
  //   options: [
  //     'JavaScript Object Notation',
  //     'Java Simple Object Notation',
  //     'JavaScript Output Name',
  //   ],
  //   correctAnswer: 'JavaScript Object Notation',
  // },
  // {
  //   question: 'Which keyword is used to declare a constant in JavaScript?',
  //   options: ['let', 'const', 'var'],
  //   correctAnswer: 'const',
  // },
  // {
  //   question: 'Which of these is NOT a JavaScript framework?',
  //   options: ['Angular', 'Django', 'Vue'],
  //   correctAnswer: 'Django',
  // },
];

const Recruitment = () => {
  const [step, setStep] = useState("form");
  const [answers, setAnswers] = useState(
    new Array(quizQuestions.length).fill("")
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    gender: "",
    address: "",
    aadhar: "",
    contact: "",
    email: "",
    resume: null,
  });

  const handleQuizChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = value;
    setAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) correctCount++;
    });
    const scorePercent = (correctCount / quizQuestions.length) * 100;
    setScore(scorePercent);

    if (scorePercent >= 60) {
      setStep("success");
    } else {
      setStep("fail");
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume" && files) {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStep("quiz");
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/application/form`,
      { formData }
    );
  };

  const resetQuiz = () => {
    setStep("quiz");
    setAnswers(new Array(quizQuestions.length).fill(""));
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-violet-50">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-6">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            ALL <span className="text-teal-600">RECRUITMENT</span>
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Join our team of TeleARGlass experts
          </p>
        </div>

        {/* Quiz Step */}
        {step === "quiz" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">
                    {currentQuestion + 1}
                  </span>
                </div>
                Technical Assessment
              </h2>
              <div className="text-gray-600 text-sm">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestion + 1) / quizQuestions.length) * 100
                  }%`,
                }}
              ></div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-relaxed">
                {quizQuestions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map(
                  (option, index) => (
                    <label
                      key={option}
                      className={`group block p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        answers[currentQuestion] === option
                          ? "bg-teal-50 border-2 border-teal-500 shadow-sm"
                          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={option}
                          checked={answers[currentQuestion] === option}
                          onChange={() => handleQuizChange(option)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                            answers[currentQuestion] === option
                              ? "border-teal-500 bg-teal-500"
                              : "border-gray-300 group-hover:border-gray-400"
                          }`}
                        >
                          {answers[currentQuestion] === option && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-gray-800 font-medium">
                          {option}
                        </span>
                      </div>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  currentQuestion === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 shining-button shining-gray"
                }`}
              >
                Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={!answers[currentQuestion]}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  !answers[currentQuestion]
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md shining-button shining-teal"
                }`}
              >
                {currentQuestion === quizQuestions.length - 1
                  ? "Submit Quiz"
                  : "Next"}
              </button>
            </div>
          </div>
        )}

        {/* Fail Step */}
        {step === "fail" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Assessment Incomplete
            </h2>
            <p className="text-gray-600 mb-2">Score: {Math.round(score)}%</p>
            <p className="text-gray-600 mb-6">
              You need at least 60% to proceed. Please review and try again.
            </p>
            <button
              onClick={resetQuiz}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-200 flex items-center justify-center mx-auto shining-button shining-teal"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Assessment
            </button>
          </div>
        )}

        {/* Form Step */}
        {step === "form" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="text-center mb-6">
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="fullName"
                    required
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    name="birthDate"
                    required
                    value={formData.birthDate}
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleFormChange}
                    className="w-full pl-4 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="contact"
                    required
                    placeholder="Contact Number"
                    pattern="\d{10}"
                    maxLength={10}
                    value={formData.contact}
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="aadhar"
                    required
                    placeholder="Aadhar Number (12 digits)"
                    pattern="\d{12}"
                    maxLength={12}
                    value={formData.aadhar}
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <textarea
                  name="address"
                  required
                  placeholder="Full Address"
                  value={formData.address}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Resume Upload
                </label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFormChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 file:bg-teal-600 file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:mr-3 file:cursor-pointer hover:file:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Upload your resume in PDF, DOC, or DOCX format
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-200 shadow-sm hover:shadow-md shining-button shining-teal"
              >
                Submit Application
              </button>
            </form>
          </div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for your interest. We'll review your application and
              get back to you soon.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-500">Application ID</p>
              <p className="font-mono text-sm text-gray-800">
                #APP-{Date.now().toString().slice(-6)}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-200 shining-button shining-teal"
            >
              Submit Another Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recruitment;
