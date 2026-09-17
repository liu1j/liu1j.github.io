// Set a public HTTPS form-submission endpoint (e.g. https://formspree.io/f/YOUR_ID).
// Never put mailbox passwords, API secrets, or private email credentials here.
// Until configured, the UI explicitly disables sending and never claims to save a message.
// Hosted reCAPTCHA is controlled by Formspree Settings > Spam protection.
// Native POST lets Formspree display its verification page; keep CAPTCHA enabled there.
window.SITE_CONTACT = {
 endpoint: 'https://formspree.io/f/xvkgokgl',
 submissionsEnabled: true,
 submissionMode: 'hosted-captcha'
};
