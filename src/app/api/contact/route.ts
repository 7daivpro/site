import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
  const n8nAuthUser = process.env.N8N_AUTH_USER;
  const n8nAuthPass = process.env.N8N_AUTH_PASS;

  if (!n8nWebhookUrl || !n8nAuthUser || !n8nAuthPass) {
    console.error("Missing environment variables: N8N_WEBHOOK_URL, N8N_AUTH_USER, or N8N_AUTH_PASS");
    return NextResponse.json(
      { message: 'Server configuration error.' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.json();

    // Construct query parameters from the form data
    const queryParams = new URLSearchParams(formData).toString();
    const urlWithParams = `${n8nWebhookUrl}?${queryParams}`;

    const credentials = Buffer.from(`${n8nAuthUser}:${n8nAuthPass}`).toString('base64');

    const response = await fetch(urlWithParams, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`n8n webhook failed with status ${response.status}: ${errorText}`);
      return NextResponse.json(
        { message: 'Failed to submit form.' },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    return NextResponse.json(
        { message: 'Form submitted successfully!', data: responseData },
        { status: 200 }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json(
      { message: 'Internal Server Error', error: errorMessage },
      { status: 500 }
    );
  }
}
