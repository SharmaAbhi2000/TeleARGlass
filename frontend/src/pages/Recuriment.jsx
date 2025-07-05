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
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>

      {/* Feather Pattern */}
      <div className="absolute inset-0 opacity-5">
        <Feather className="absolute top-20 left-1/4 w-16 h-16 text-yellow-300 transform rotate-45" />
        <Feather className="absolute top-1/2 right-1/4 w-12 h-12 text-emerald-300 transform -rotate-12" />
        <Feather className="absolute bottom-1/3 left-1/3 w-14 h-14 text-teal-300 transform rotate-12" />
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">
             Expert Recruitment Portal
            </h1>
            <p className="text-teal-100 text-lg">
              Join our elite team of developers
            </p>
          </div>

          {/* Quiz Step */}
          {step === "quiz" && (
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">
                      {currentQuestion + 1}
                    </span>
                  </div>
                  Technical Assessment
                </h2>
                <div className="text-teal-200 text-sm">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2 mb-8">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / quizQuestions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <label
                        key={option}
                        className={`group block p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          answers[currentQuestion] === option
                            ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-2 border-emerald-400 shadow-lg"
                            : "bg-white/10 hover:bg-white/20 border-2 border-transparent hover:border-white/30"
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
                            className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                              answers[currentQuestion] === option
                                ? "border-emerald-400 bg-emerald-400"
                                : "border-white/50 group-hover:border-white"
                            }`}
                          >
                            {answers[currentQuestion] === option && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className="text-white font-medium">
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
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    currentQuestion === 0
                      ? "bg-gray-500/50 text-gray-300 cursor-not-allowed"
                      : "bg-white/20 text-white hover:bg-white/30 backdrop-blur"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion]}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                    !answers[currentQuestion]
                      ? "bg-gray-500/50 text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg hover:shadow-xl"
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
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Assessment Incomplete
              </h2>
              <p className="text-teal-100 mb-2">Score: {Math.round(score)}%</p>
              <p className="text-teal-200 mb-8">
                You need at least 60% to proceed. Please review and try again.
              </p>
              <button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Retry Assessment
              </button>
            </div>
          )}

          {/* Form Step */}
          {step === "form" && (
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Congratulations!
                </h2>
                <p className="text-teal-200">
                  Score: {Math.round(score)}% - Please complete your application
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-300" />
                    <input
                      name="fullName"
                      required
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur transition-all duration-200"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-300" />
                    <input
                      type="date"
                      name="birthDate"
                      required
                      value={formData.birthDate}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur transition-all duration-200"
                    />
                  </div>

                  <div className="relative">
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleFormChange}
                      className="w-full pl-4 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur transition-all duration-200 appearance-none"
                    >
                      <option value="" className="bg-teal-800">
                        Select Gender
                      </option>
                      <option value="Male" className="bg-teal-800">
                        Male
                      </option>
                      <option value="Female" className="bg-teal-800">
                        Female
                      </option>
                      <option value="Other" className="bg-teal-800">
                        Other
                      </option>
                    </select>
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-300" />
                    <input
                      name="contact"
                      required
                      placeholder="Contact Number"
                      pattern="\d{10}"
                      maxLength={10}
                      value={formData.contact}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur transition-all duration-200"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-300" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur transition-all duration-200"
                    />
                  </div>

                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-300" />
                    <input
                      name="aadhar"
                      required
                      placeholder="Aadhar Number (12 digits)"
                      pattern="\d{12}"
                      maxLength={12}
                      value={formData.aadhar}
                      onChange={handleFormChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-4 w-5 h-5 text-teal-300" />
                  <textarea
                    name="address"
                    required
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur transition-all duration-200 resize-none"
                  />
                </div>

                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-300" />
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFormChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white file:bg-emerald-500 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:cursor-pointer hover:file:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 via-emerald-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Submit Application
                </button>
              </form>
            </div>
          )}

          {/* Success Step */}
          {step === "success" && (
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
              <div className="relative mx-auto mb-6 w-24 h-24">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Application Submitted!
              </h2>
              <p className="text-teal-200 mb-6">
                Thank you for your interest. We'll review your application and
                get back to you soon.
              </p>
              <div className="bg-white/10 rounded-xl p-4 mb-6">
                <p className="text-sm text-teal-300">Application ID</p>
                <p className="font-mono text-lg text-white">
                  #APP-{Date.now().toString().slice(-6)}
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105"
              >
                Submit Another Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
