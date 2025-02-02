"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const FormButton = () => {
  const status = useFormStatus();
  return (
    <Button type="submit" disabled={status.pending}>
      {status.pending ? "Unfucking..." : "Unfuck"}
    </Button>
  );
};

export default FormButton;
