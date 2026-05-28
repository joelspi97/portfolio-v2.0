export type ContactMessagePayload = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

type ContactMessageResponse = {
  errorMessage?: string;
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
  const data: ContactMessageResponse = await response.json();

  if (!response.ok) throw new Error(data.errorMessage ?? 'Something went wrong.');
}
