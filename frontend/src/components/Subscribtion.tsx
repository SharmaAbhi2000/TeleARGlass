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
    <div className=" py-2  px-4">
      <div className="max-w-7xl mx-auto">
        {/* Pricing Cards */}
        <div className=" w-full flex justify-center items-center  ">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative w-full lg:w-96  items-center bg-blue-800/50 backdrop-blur-sm rounded-2xl p-8   transition-all duration-300 hover:scale-105 ${
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
                {/* <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} mb-4`}
                >
                  <div className="text-white">{iconMap[plan.icon]}</div>
                </div> */}
                {/* <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3> */}
                <p className="text-gray-200 text-md">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-purple-400">
                    ₹{Number(String(plan.price)[0])} Cr
                  </span>
                  <span className="text-purple-400 ml-2">
                    /{billingCycle === "monthly" ? "year" : "10 year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-green-400 text-sm mt-2">
                    Save ₹{plan.monthlyPrice * 12 - plan.yearlyPrice} annually
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleSubscribe(plan)}
                onMouseEnter={() => setSelectedPlan(plan.id)}
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold text-white transition-all duration-300"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
