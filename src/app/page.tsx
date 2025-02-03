import { FormButton } from "@/components/submit-recipe-url";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";


export default function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Form className="flex flex-col gap-6" action="/recipe">
          <div className="grid gap-2">
            <Label htmlFor="url">Recipe Link</Label>
            <Input
              type="url"
              id="url"
              name="url"
              required
              placeholder="https://www.recipetineats.com/dal-indian-lentil-curry/"
            />
          </div>
          <FormButton />
        </Form>
      </div>
    </div>
  );
}
