"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { SubmitEmail } from "./SubscribeButton";
import { addToBrevoList } from "../actions";

export const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  return (
    <div>
      <form
        action={addToBrevoList}
        className="w-full flex relative max-w-[400px] mx-auto mt-6"
      >
        <Input
          className="border-2 rounded-lg !text-base !py-[18px] border-black"
          placeholder="Enter Your Email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Correcting here
        />

        <SubmitEmail/>
      </form>
    </div>
  );
};
