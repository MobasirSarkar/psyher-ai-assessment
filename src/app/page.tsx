import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Crown, Users, Sparkles, Star, ArrowRight, Check } from "lucide-react"

export default async function Home() {
  const { userId } = await auth()

  if (userId) {
    redirect("/events")
  }

  const tiers = [
    {
      name: "Free",
      icon: Users,
      color: "from-slate-500 to-slate-600",
      borderColor: "border-slate-200",
      bgColor: "bg-slate-50",
      description: "Perfect for getting started",
      features: ["Basic community events", "Monthly newsletters", "Community forum access"],
      popular: false,
    },
    {
      name: "Silver",
      icon: Star,
      color: "from-slate-400 to-slate-500",
      borderColor: "border-slate-300",
      bgColor: "bg-slate-50",
      description: "Enhanced networking opportunities",
      features: ["All Free features", "Networking events", "Workshop access", "Priority support"],
      popular: false,
    },
    {
      name: "Gold",
      icon: Crown,
      color: "from-yellow-400 to-yellow-600",
      borderColor: "border-yellow-300",
      bgColor: "bg-yellow-50",
      description: "Premium learning experiences",
      features: ["All Silver features", "Premium masterclasses", "1-on-1 mentoring", "Exclusive content"],
      popular: true,
    },
    {
      name: "Platinum",
      icon: Sparkles,
      color: "from-purple-500 to-indigo-600",
      borderColor: "border-purple-300",
      bgColor: "bg-purple-50",
      description: "Ultimate VIP experience",
      features: ["All Gold features", "VIP events", "Direct founder access", "Custom experiences"],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Exclusive Member Events
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tier Events
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Access exclusive events based on your membership tier. Join our community and unlock premium experiences
            tailored to your level.
          </p>

          {/* Tier Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {tiers.map((tier, index) => {
              const IconComponent = tier.icon
              return (
                <div
                  key={index}
                  className={`relative bg-white p-8 rounded-2xl shadow-lg border-2 ${tier.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${tier.bgColor}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Tier Name */}
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{tier.name}</h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm mb-6">{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 text-left">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/sign-up"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-[200px] justify-center"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <p className="text-slate-500 text-sm mb-8">Trusted by professionals worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">10K+ Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span className="text-sm font-medium">500+ Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                <span className="text-sm font-medium">Premium Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

