
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LoginButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

const LoginButton = ({ className, variant = "ghost" }: LoginButtonProps) => {
  return (
    <Button asChild variant={variant} className={className}>
      <Link to="/login">Login</Link>
    </Button>
  );
};

export default LoginButton;
