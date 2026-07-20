"use client";

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <div className="center">
      <p>Could not fetch the list of notes. {error.message}</p>
    </div>
  );
}