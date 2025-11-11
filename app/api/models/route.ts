import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get API key from query params or environment
    const apiKey = request.nextUrl.searchParams.get('apiKey') || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not provided. Please add your Groq API key in settings or set GROQ_API_KEY environment variable.' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.groq.com/openai/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to fetch models');
    }

    const data = await response.json();

    // Transform the data to include useful information
    const models = data.data.map((model: any) => ({
      id: model.id,
      name: model.id,
      contextWindow: model.context_window || 8192,
      active: model.active,
      created: model.created,
      ownedBy: model.owned_by,
    }));

    return NextResponse.json({ models });
  } catch (error: any) {
    console.error('Error fetching models:', error);

    if (error?.message?.includes('401')) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your Groq API key.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error: error?.message || 'An error occurred while fetching models',
      },
      { status: 500 }
    );
  }
}
