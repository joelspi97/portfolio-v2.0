import { useState, type SubmitEvent as ReactSubmitEvent, type ReactElement } from 'react';
import '../scss/components/contact-form.scss';

export function ContactForm(): ReactElement {
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userSubject, setUserSubject] = useState<string>('');
  const [userMessage, setUserMessage] = useState<string>('');

  function handleResponse(stateFunction: React.Dispatch<React.SetStateAction<boolean>>): void { 
    setLoading(false);
    stateFunction(true);

    setTimeout(() => {
      stateFunction(false);
    }, 10000);
  }

  async function handleSubmit(event: ReactSubmitEvent<HTMLFormElement>) { 
    event.preventDefault();
    
    if (loading) return;

    setLoading(true);
    setSuccess(false);
    setError(false);
    setErrorMsg(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/mail`, 
        {
          body: JSON.stringify({ userName, userEmail, userSubject, userMessage }),
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          method: 'POST'
        }
      );
      const data = await response.json();

      if (!response.ok) {
        handleResponse(setError);
        setErrorMsg(data.errorMessage);
        return;
      } 

      setUserName('');
      setUserEmail('');
      setUserSubject('');
      setUserMessage('');
      handleResponse(setSuccess);
    } catch (err) {
      handleResponse(setError);
      setErrorMsg(err.message);
    }
  }

  return (
    <form className='contact-form' onSubmit={e => handleSubmit(e)}>
      <label htmlFor='name'>Name</label>
      <input
        className='contact-form__input'
        id='name'
        name='name'
        onChange={e => setUserName(e.target.value)}
        placeholder='e.g. Jhon Doe'
        readOnly={loading} 
        required
        type='text'
        value={userName}
      />

      <label htmlFor='email'>Your email</label>
      <input
        className='contact-form__input'
        id='email'
        name='email'
        onChange={e => setUserEmail(e.target.value)}
        placeholder='example@email.com'
        readOnly={loading}
        required
        type='email'
        value={userEmail}
      />

      <label htmlFor='subject'>Subject</label>
      <input
        className='contact-form__input'
        id='subject'
        name='subject'
        onChange={e => setUserSubject(e.target.value)}
        readOnly={loading}
        required
        type='text'
        value={userSubject}
      />

      <label htmlFor='body'>Message</label>
      <textarea
        className='contact-form__input'
        id='body'
        name='body'
        onChange={e => setUserMessage(e.target.value)}
        readOnly={loading}
        required
        rows={9}
        value={userMessage}
      />

      {success && (
        <div aria-live='assertive' className='contact-form__state-msg contact-form__state-msg--success'>
          Your message has been delivered successfully!
        </div> 
      )}
        
      {error && (
        <div aria-live='assertive' className='contact-form__state-msg contact-form__state-msg--error'>
          <span className='sr-only'>Error: </span>
          {errorMsg}
        </div>
      )}
      
      {loading && (
        <div aria-live='assertive' className='contact-form__loading-spinner'>
          <span className='sr-only'>Sending message.</span>
        </div>
      )}

      <button className='portfolio-btn' disabled={loading} type='submit'>Send message</button>
    </form>
  );
}
