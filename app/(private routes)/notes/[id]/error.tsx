'use client';

interface ErrorNoteProps {
  error: Error;
}

const ErrorNote = ({ error }: ErrorNoteProps) => {
  return <p>Could not fetch note details. {error.message}</p>;
};

export default ErrorNote;
