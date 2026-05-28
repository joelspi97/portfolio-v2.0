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
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/mail`,
    {
      body: JSON.stringify(payload),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      method: 'POST'
    }
  );

  if (response.ok) return;
  
  const data: ContactMessageErrorResponse = await response.json();
  throw new Error(data.errors?.join(' ') ?? 'Something went wrong.');
}
