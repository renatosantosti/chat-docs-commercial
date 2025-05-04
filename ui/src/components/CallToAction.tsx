import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold">
          Ready to chat with your PDFs?
        </h2>
        <p className="mt-4 text-xl max-w-2xl mx-auto opacity-90">
          Join thousands of users who are already saving time and gaining
          insights with Chat Docs!.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8"
          >
            <Link to="/signup">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
