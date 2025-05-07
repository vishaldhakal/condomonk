import Image from "next/image";

const BestExperience = () => {
  return (
    <section className=" pb-16 md:py-24  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-20 items-center">
          {/* Left side - Device Images */}
          <div className="relative">
            <img
              src="/condomonk-mockup.png"
              alt="Condomonk App Interface"
              className="w-full h-auto scale-150 transform"
              priority
            />
          </div>

          {/* Right side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              A best-in-class experience
            </h2>
            <p className="text-md text-gray-600 max-w-md mb-7 mt-2 leading-normal">
              The Condomonk platform offers a seamless homebuying and pre
              construction search experience.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Advanced Filters",
                  description: "Refine your search with precision",
                  icon: "✓",
                },
                {
                  title: "Personalized Recommendations",
                  description: "Find homes tailored to your needs",
                  icon: "✓",
                },
                {
                  title: "Real-Time Alerts",
                  description: "Stay updated on pricing and availability",
                  icon: "✓",
                },
                {
                  title: "Virtual Tours & Online Applications",
                  description: "Explore and secure your home effortlessly",
                  icon: "✓",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full text-white bg-green-500">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestExperience;
