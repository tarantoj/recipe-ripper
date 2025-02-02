import { FormButton } from "@/components/submit-recipe-url";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export const runtime = "edge";

export default function Home() {
  return (
    <Form className="flex" action="/recipe">
      <Input type="url" name="url" />
      <FormButton />
    </Form>
  );
}
