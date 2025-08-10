# FormSubmit Setup Guide

This guide will help you configure FormSubmit for your contact form to send emails without needing a backend server.

## ✅ Current Setup

Your contact form is already configured with FormSubmit! Here's what's currently set up:

- **Form Action**: `https://formsubmit.co/el/fuhiha`
- **Method**: POST
- **Form Fields**: Name, Email, Company, Phone, Customer Type, Message
- **Thank You Page**: Redirects to `thank-you.html` after submission

## 🔧 FormSubmit Features Enabled

### 1. Custom Thank You Page
```html
<input type="hidden" name="_next" value="https://clearvertise.com/thank-you.html">
```
- After form submission, users are redirected to your custom thank you page
- Update the URL to match your actual domain

### 2. Custom Email Subject
```html
<input type="hidden" name="_subject" value="New Contact Form Submission from Clearvertise">
```
- Sets a professional subject line for emails you receive

### 3. Captcha Disabled
```html
<input type="hidden" name="_captcha" value="false">
```
- Disables FormSubmit's default captcha for smoother user experience
- You can enable it by changing to `value="true"` if you get spam

### 4. Table Template
```html
<input type="hidden" name="_template" value="table">
```
- Formats the email as a clean table for better readability

## 📧 How It Works

1. **User fills out form** → Clicks "Send Request"
2. **Form submits to FormSubmit** → Data is processed
3. **Email sent to you** → You receive the contact details
4. **User redirected** → They see the thank you page

## 🛠️ Configuration Steps

### Step 1: Verify Your Email Address
1. Visit your FormSubmit endpoint: `https://formsubmit.co/el/fuhiha`
2. FormSubmit will ask you to verify your email address
3. Check your email and click the verification link

### Step 2: Update the Thank You URL
In `src/index.html`, update this line:
```html
<input type="hidden" name="_next" value="https://your-actual-domain.com/thank-you.html">
```
Replace `https://your-actual-domain.com` with your actual website URL.

### Step 3: Test the Form
1. Fill out your contact form
2. Submit it
3. Check if you receive the email
4. Verify the thank you page loads correctly

## 🎯 Advanced Configuration Options

### Add CC/BCC Recipients
```html
<input type="hidden" name="_cc" value="teammate@example.com">
<input type="hidden" name="_bcc" value="backup@example.com">
```

### Enable reCAPTCHA
```html
<input type="hidden" name="_captcha" value="true">
```

### Custom Autoresponse to User
```html
<input type="hidden" name="_autoresponse" value="Thank you for contacting Clearvertise! We'll get back to you within 24 hours.">
```

### Disable FormSubmit Branding
```html
<input type="hidden" name="_honey" value="">
```

## 📱 Mobile Optimization

The form is already mobile-responsive with:
- Touch-friendly inputs
- Proper viewport settings
- Accessible labels and buttons

## 🔒 Security Features

- **Spam Protection**: FormSubmit includes built-in spam filtering
- **Rate Limiting**: Prevents form spam submissions
- **Data Validation**: Server-side validation of form fields

## 🚨 Troubleshooting

### Form Not Submitting?
1. Check browser console for JavaScript errors
2. Verify FormSubmit endpoint URL is correct
3. Ensure all required fields have `required` attribute

### Not Receiving Emails?
1. Check spam/junk folder
2. Verify email address in FormSubmit endpoint
3. Confirm email verification was completed

### Thank You Page Not Loading?
1. Check the `_next` URL is correct and accessible
2. Ensure `thank-you.html` exists in your website root
3. Verify there are no JavaScript errors

## 🎉 Benefits of This Setup

- ✅ **No Backend Required**: Pure client-side solution
- ✅ **Free**: FormSubmit is free for reasonable usage
- ✅ **Reliable**: Professional email delivery service
- ✅ **Easy Setup**: No complex configuration needed
- ✅ **Mobile Friendly**: Works perfectly on all devices
- ✅ **Spam Protection**: Built-in anti-spam measures

## 🔄 Alternative Endpoints

If you need a different email address, you can:

1. **Use a direct email**: `https://formsubmit.co/youremail@example.com`
2. **Use hash endpoint**: Visit FormSubmit to get a hashed endpoint for security

## 📊 Form Analytics

FormSubmit provides basic analytics. For advanced tracking, consider adding:

```html
<!-- Google Analytics Event Tracking -->
<script>
// Add to your form submission handler
gtag('event', 'form_submit', {
  'event_category': 'contact',
  'event_label': 'contact_form'
});
</script>
```

## 🚀 Going Live

When you deploy your site:

1. Update the `_next` URL to your production domain
2. Test the form on your live site
3. Monitor email delivery for the first few submissions
4. Consider setting up email forwarding rules if needed

Your FormSubmit contact form is now ready to go! 🎉
