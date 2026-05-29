export type ContactMessagePayload = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

type ContactMessageErrorResponse = {
  errors?: string[];
};

async function parseContactMessageErrorResponse(response: Response): Promise<ContactMessageErrorResponse> {
  try {
    const data: unknown = await response.json();
    return typeof data === 'object' && data !== null ? data : {};
    
  } catch {
    return {};
  }
}

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
  
  const data = await parseContactMessageErrorResponse(response);
  const errorMessage = (Array.isArray(data.errors) && data.errors.length) 
    ? data.errors.join(' ') 
    : 'Something went wrong.';
  throw new Error(errorMessage);
}
