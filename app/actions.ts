"use server";

const API_KEY = process.env.BREVO_API_KEY as string; // Store API key in .env
const LIST_ID = 3; // ID of the list where you want to store emails

export const addToBrevoList = async (formData: FormData) => {
  const email = formData.get("email") as string;

  const url = 'https://api.brevo.com/v3/contacts';

  const requestBody = {
    email: email,
    listIds: [LIST_ID],
    emailBlacklisted: false,
    smsBlacklisted: false,
    updateEnabled: false,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'api-key': API_KEY, // Authorization header with the API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody), // Send the contact data as a JSON payload
    });

    if (!response.ok) {
      throw new Error(`Failed to add email to Brevo: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Email added successfully:', data);
  } catch (error) {
    console.error('Error adding email:', error);
  }
};
