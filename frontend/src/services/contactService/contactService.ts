export type ContactMessagePayload = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

type ContactMessageErrorResponse = {
  errors?: string[];
};

export async function sendContactMessage(payload: ContactMessagePayload): Promise<void> {
  const response: Response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/mail`,
    {
      body: JSON.stringify(payload),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      method: 'POST'
    }
  );

  if (response.ok) return;
  
  const data: ContactMessageErrorResponse = await response.json();
  const errorMessage = (Array.isArray(data.errors) && data.errors.length) 
    ? data.errors.join(' ') 
    : 'Something went wrong.';
  throw new Error(errorMessage);
}
