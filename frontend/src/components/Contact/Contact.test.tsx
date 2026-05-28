// Treat this as behavior testing, not implementation testing.

// Renders the form fields and submit button.

// Empty submit shows required errors and does not call sendContactMessage.

// Invalid email shows:

// Email must use a valid format.
// Submit button is disabled when there are visible validation errors.

// Valid submit calls sendContactMessage with:

// {
//   name,
//   email,
//   subject,
//   message
// }
// Successful submit clears the fields and shows success message.

// Failed submit shows the thrown error message.

// While submitting, shows loading state and prevents duplicate submit.

// This is the most important test file.

import { test } from 'vitest';

test.todo('');
