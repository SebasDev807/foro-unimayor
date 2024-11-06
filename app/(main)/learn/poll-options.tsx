"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PollOptions() {
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {pollOptions.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handlePollOptionChange(index, e.target.value)}
          placeholder={`Opción ${index + 1}`}
          className="w-full p-2 border rounded"
        />
      ))}
      {pollOptions.length < 4 && (
        <Button
          type="button"
          onClick={addPollOption}
          variant="primary"
          size="sm"
        >
          Añadir opción
        </Button>
      )}
    </div>
  );
}
