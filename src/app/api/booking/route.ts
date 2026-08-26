import { NextResponse } from 'next/server';

type BookingMode = 'Taxi Bestellung' | 'Preisanfrage';

type BookingPayload = {
  mode: BookingMode;
  date: string;
  time: string;
  passengers: string;
  from: string;
  to: string;
  name: string;
  email: string;
  phone: string;
  wheelchair: boolean;
  childSeat: boolean;
  message: string;
  dsgvo: boolean;
  website?: string; // honeypot
};

function isEmail(s: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);
}

/**
 * Format the booking data into a readable WhatsApp message
 */
function formatWhatsAppMessage(payload: BookingPayload): string {
  const options: string[] = [];
  if (payload.wheelchair) options.push('🦽 Rollstuhltransport');
  if (payload.childSeat) options.push('👶 Kindersitz');

  const lines = [
    `🚕 *Neue ${payload.mode}*`,
    '',
    `📅 *Datum:* ${payload.date}`,
    `🕐 *Uhrzeit:* ${payload.time}`,
    `👥 *Personen:* ${payload.passengers}`,
    '',
    `📍 *Von:* ${payload.from}`,
    `🎯 *Nach:* ${payload.to}`,
    '',
    `👤 *Name:* ${payload.name}`,
    `📧 *E-Mail:* ${payload.email}`,
    `📞 *Telefon:* ${payload.phone}`,
  ];

  if (options.length > 0) {
    lines.push('', `⚙️ *Optionen:* ${options.join(', ')}`);
  }

  if (payload.message?.trim()) {
    lines.push('', `💬 *Nachricht:*`, payload.message);
  }

  lines.push('', `⏰ *Empfangen:* ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}`);

  return lines.join('\n');
}

/**
 * Attempt to retrieve Phone Number ID using App ID and Access Token
 * NOTE: Auto-retrieval requires specific permissions and API access that may not be available.
 * It's STRONGLY RECOMMENDED to set WHATSAPP_PHONE_NUMBER_ID explicitly in environment variables.
 * 
 * To find your Phone Number ID:
 * 1. Go to Meta Business Suite (https://business.facebook.com)
 * 2. Navigate to WhatsApp Manager > Phone Numbers
 * 3. Click on your phone number
 * 4. Copy the Phone Number ID (format: 123456789012345)
 */
async function getPhoneNumberId(
  appId: string,
  accessToken: string
): Promise<string | null> {
  // Auto-retrieval is complex and unreliable due to API permission requirements.
  // The Graph API endpoints needed for auto-retrieval often require:
  // - Specific business permissions
  // - System User tokens with proper asset assignments
  // - Business verification
  
  // Instead of attempting complex auto-retrieval that will likely fail,
  // we provide clear instructions to set the Phone Number ID explicitly.
  
  console.error('[WhatsApp] ⚠️ Auto-retrieval is not available.');
  console.error('[WhatsApp] Please set WHATSAPP_PHONE_NUMBER_ID in your .env file.');
  console.error('[WhatsApp]');
  console.error('[WhatsApp] To find your Phone Number ID:');
  console.error('[WhatsApp] 1. Go to https://business.facebook.com');
  console.error('[WhatsApp] 2. Navigate to: WhatsApp Manager > Phone Numbers');
  console.error('[WhatsApp] 3. Click on your phone number');
  console.error('[WhatsApp] 4. Copy the "Phone Number ID" (numeric ID, e.g., 123456789012345)');
  console.error('[WhatsApp] 5. Add it to your .env file as: WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id');
  
  return null;
}

function buildWhatsAppRequestBody(payload: BookingPayload, recipient: string) {
  const templateName =
    process.env.WHATSAPP_TEMPLATE_NAME || 'jaspers_market_order_confirmation_v1';
  const templateLanguage = process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en_US';
  const useTemplate = process.env.WHATSAPP_USE_TEMPLATE !== 'false';

  if (useTemplate) {
    // Sandbox/default Meta template exposes 3 body text variables.
    // Map booking fields into those slots until a custom template is approved.
    return {
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'template',
      template: {
        name: templateName,
        language: { code: templateLanguage },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: payload.name },
              { type: 'text', text: `${payload.phone} | ${payload.passengers} Pers.` },
              { type: 'text', text: `${payload.date} ${payload.time} — ${payload.from} → ${payload.to}` },
            ],
          },
        ],
      },
    };
  }

  return {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipient,
    type: 'text',
    text: {
      preview_url: false,
      body: formatWhatsAppMessage(payload),
    },
  };
}

/**
 * Send a WhatsApp message using the WhatsApp Business Cloud API
 */
async function sendWhatsAppMessage(payload: BookingPayload): Promise<{ success: boolean; error?: string }> {
  let phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const ownerWhatsApp = process.env.OWNER_WHATSAPP;
  const appId = process.env.WHATSAPP_APP_ID;
  const graphVersion = process.env.WHATSAPP_GRAPH_VERSION || 'v25.0';

  // WhatsApp is REQUIRED - if credentials are missing, fail
  if (!accessToken || !ownerWhatsApp) {
    console.error('[WhatsApp] Required credentials (accessToken, ownerWhatsApp) not configured');
    return { 
      success: false, 
      error: 'WhatsApp credentials not configured. Please contact administrator.' 
    };
  }

  // Auto-retrieve Phone Number ID if not provided but App ID is available
  if (!phoneNumberId && appId) {
    console.log('[WhatsApp] Phone Number ID not provided, attempting auto-retrieval using App ID...');
    const retrievedId = await getPhoneNumberId(appId, accessToken);
    
    if (!retrievedId) {
      console.error('[WhatsApp] Could not auto-retrieve Phone Number ID');
      return { 
        success: false, 
        error: 'Could not retrieve WhatsApp Phone Number ID. Please check credentials.' 
      };
    }
    
    phoneNumberId = retrievedId;
  }

  // If we still don't have phoneNumberId, fail
  if (!phoneNumberId) {
    console.error('[WhatsApp] Phone Number ID not configured and could not be auto-retrieved');
    return { 
      success: false, 
      error: 'WhatsApp Phone Number ID is required but not available.' 
    };
  }

  // Clean the phone number (remove spaces, dashes, etc.)
  const cleanPhone = ownerWhatsApp.replace(/[\s\-\(\)]/g, '');

  try {
    const response = await fetch(
      `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildWhatsAppRequestBody(payload, cleanPhone)),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[WhatsApp] API Error:', errorData);
      
      // Handle specific error codes with helpful messages
      const errorCode = errorData?.error?.code;
      const errorMessage = errorData?.error?.message || 'WhatsApp API error';
      
      if (errorCode === 133010) {
        // Account not registered - phone number not verified
        console.error('[WhatsApp] ⚠️ Phone number is not verified/registered with WhatsApp Business API');
        console.error('[WhatsApp] The phone number must be verified in Meta Business Suite before sending messages.');
        return {
          success: false,
          error: 'WhatsApp phone number is not verified. Please verify the phone number in Meta Business Suite (WhatsApp Manager > Phone Numbers) before sending messages.'
        };
      }
      
      if (errorCode === 190) {
        // Token expired
        console.error('[WhatsApp] ⚠️ ACCESS TOKEN EXPIRED!');
        return {
          success: false,
          error: 'WhatsApp access token has expired. Please get a new access token from the owner.'
        };
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }

    const data = await response.json();
    console.log('[WhatsApp] Message sent successfully:', data?.messages?.[0]?.id);
    console.log('Whole success response:', data);
    return { success: true };
  } catch (error) {
    console.error('[WhatsApp] Error sending message:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function POST(req: Request) {
  const payload = (await req.json().catch(() => null)) as BookingPayload | null;
  if (!payload) {
    return NextResponse.json({ ok: false, message: 'Invalid JSON.' }, { status: 400 });
  }

  // Honeypot: accept but do nothing.
  if (payload.website && payload.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const required: Array<keyof BookingPayload> = [
    'mode',
    'date',
    'time',
    'passengers',
    'from',
    'to',
    'name',
    'email',
    'phone',
  ];
  for (const k of required) {
    const v = payload[k];
    if (typeof v !== 'string' || !v.trim()) {
      return NextResponse.json(
        { ok: false, message: `Missing field: ${k}` },
        { status: 400 }
      );
    }
  }
  if (!isEmail(payload.email)) {
    return NextResponse.json({ ok: false, message: 'Invalid email.' }, { status: 400 });
  }
  if (!payload.dsgvo) {
    return NextResponse.json(
      { ok: false, message: 'DSGVO consent required.' },
      { status: 400 }
    );
  }

  // Log the booking
  console.log('[booking]', payload);

  // Send WhatsApp notification to owner - THIS IS REQUIRED
  const whatsappResult = await sendWhatsAppMessage(payload);
  
  if (!whatsappResult.success) {
    console.error('[booking] ❌ WhatsApp notification FAILED - returning error to client');
    console.error('[booking] Error details:', whatsappResult.error);
    // WhatsApp is the only way to receive bookings, so we must fail if it doesn't work
    return NextResponse.json(
      { 
        ok: false, 
        message: 'Leider konnte Ihre Anfrage nicht übermittelt werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt telefonisch.' 
      },
      { status: 500 }
    );
  }

  console.log('[booking] ✅ WhatsApp notification sent successfully - returning success');

  // Optional: forward to external webhook (e.g. Make/Zapier/Slack).
  const bookingWebhookUrl = process.env.BOOKING_WEBHOOK_URL;
  if (bookingWebhookUrl) {
    const res = await fetch(bookingWebhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        source: 'taxi70-replica',
        receivedAt: new Date().toISOString(),
        booking: payload,
        whatsappSent: whatsappResult.success,
      }),
    }).catch(() => null);

    if (!res || !res.ok) {
      console.error('[booking] Webhook forwarding failed');
    }
  }

  return NextResponse.json({ ok: true });
}
