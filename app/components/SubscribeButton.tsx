"use client"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useEffect } from "react";

export function SubmitEmail({ email }: { email: string }) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (pending) {
      const timer = setTimeout(() => {
        toast("✅ Subscribed.");
      }, 500);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [pending]);

  return (
    <>
      {pending ? (
        <Button disabled className="absolute right-0 py-[19px] top-[1px] px-5 rounded-lg">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Subscribing...
        </Button>
      ) : (
        <Button
          type="submit"
          className="absolute right-0 text-base py-[19px] top-[1px] px-5 rounded-lg"
        >
          Subscribe
        </Button>
      )}
    </>
  );
}
