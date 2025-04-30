
const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Create an account",
      description: "Sign up for free and get started in seconds",
    },
    {
      number: 2,
      title: "Upload your PDFs",
      description: "Securely upload your PDF documents to our platform",
    },
    {
      number: 3,
      title: "Ask questions",
      description: "Chat with your documents and get instant answers",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold gradient-text">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with PDFMindConnect in three simple steps
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white text-xl font-bold mx-auto">
                  {step.number}
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>
                {step.number < steps.length && (
                  <div className="ml-10 hidden md:block absolute top-8 left-full w-full h-0.5 bg-indigo-400 transform -translate-x-1/2 "></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
