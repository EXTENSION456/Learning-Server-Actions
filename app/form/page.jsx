import { Users } from "@/components/users";
import FormComponent from "@/components/form";

const Form = () => {
  return (
    <div className="w-full mx-0 flex justify-center min-h-screen items-start bg-black gap-10">
      <FormComponent />

      <Users />
    </div>
  );
};

export default Form;
