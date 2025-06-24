import { useContext, useEffect, useState } from "react";
import { Check, Star, Zap, Shield, Crown } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
const iconMap = {
  Crown: <Crown className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />
};
export default function Subscribtion() {
  const navigate = useNavigate();
    const {addToCart,products} = useContext(ShopContext);
    const ppf = products.filter((e: any) => e.subscribtion === true);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [plans, setPlans] = useState(null);

 
  useEffect(() => {
    if (ppf) {
      setPlans(ppf);
    }
  }, [products]);

 if (plans == null) {
   return <p>comming soon</p>;
 }
  const handleSubscribe = (planId:any) => {
    // In a real app, this would integrate with your payment processor
    console.log(planId._id);
    addToCart(planId._id, 1);
    navigate('/cart');
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-blue-700 to-emerald-600 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Premium Plans</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock the full potential of our platform with premium features
            designed to accelerate your success
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-slate-800 rounded-lg p-1 flex items-center">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                billingCycle === "yearly"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "border-purple-500 shadow-2xl shadow-purple-500/20"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} mb-4`}
                >
                  <div className="text-white">
                    {iconMap[plan.icon]}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">
                    ${billingCycle === "monthly" ? plan.price : plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-green-400 text-sm mt-2">
                    Save ${plan.monthlyPrice * 12 - plan.yearlyPrice} annually
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {JSON.parse(plan.features).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleSubscribe(plan)}
                onMouseEnter={() => setSelectedPlan(plan.id)}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl"
                    : "bg-slate-700 hover:bg-slate-600 border border-slate-600"
                }`}
              >
                {plan.popular ? "Start Free Trial" : "Get Started"}
              </button>

              {plan.popular && (
                <p className="text-center text-gray-400 text-xs mt-3">
                  14-day free trial • No credit card required
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
