import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiAlertTriangle } from "react-icons/fi";

interface CustomErrorProps {
  message: string;
}

const CustomError: React.FC<CustomErrorProps> = ({ message }) => {
  return (
    <div className="w-full flex justify-center">
      <Alert variant="destructive" className="md:w-1/2">
        <AlertTitle className="flex items-center gap-2 text-lg">
          <FiAlertTriangle size={18} />
          Heads up!
        </AlertTitle>
        <AlertDescription className="mt-4">{message}</AlertDescription>
      </Alert>
    </div>
  );
};

export default CustomError;
