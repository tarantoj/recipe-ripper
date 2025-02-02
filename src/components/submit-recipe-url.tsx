"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Form from "next/form";

const FormButton = () => {
  const status = useFormStatus();
  return (
    <Button type="submit" disabled={status.pending}>
      {status.pending ? "Unfucking..." : "Unfuck"}
    </Button>
  );
};

const SubmitRecipeUrl = () => {
  return (
    <Form className="flex" action="/recipe">
      <Input
        type="url"
        name="url"
        // onBlur={(event) => {
        //   setUrl(event.target.value);
        // }}
      />
      <FormButton />
    </Form>
  );
};

export default SubmitRecipeUrl;
