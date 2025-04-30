
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SignupButtonProps {
  className?: string;
}

const SignupButton = ({ className }: SignupButtonProps) => {
  return (
    <Button asChild className={`button-gradient ${className || ""}`}>
      <Link to="/signup">Sign up</Link>
    </Button>
  );
};

export default SignupButton;
