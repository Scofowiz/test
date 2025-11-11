import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, settings } = body;

    // Use provided API key or fall back to environment variable
    const apiKey = settings.apiKey || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not provided. Please add your Groq API key in settings or set GROQ_API_KEY environment variable.' },
        { status: 400 }
      );
    }

    const groq = new Groq({
      apiKey: apiKey,
    });

    // Prepare the chat completion parameters
    const chatParams: any = {
      messages: messages,
      model: settings.model,
      temperature: settings.temperature,
      top_p: settings.topP,
      max_tokens: settings.maxTokens,
    };

    // Add reasoning if enabled (for supported models)
    if (settings.enableReasoning) {
      // Note: Reasoning is model-dependent, some models may not support it
      chatParams.reasoning = true;
    }

    const chatCompletion = await groq.chat.completions.create(chatParams);

    const responseMessage = chatCompletion.choices[0]?.message?.content || 'No response';

    return NextResponse.json({
      message: responseMessage,
      usage: chatCompletion.usage,
    });
  } catch (error: any) {
    console.error('Error in chat API:', error);

    // Handle specific Groq API errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your Groq API key.' },
        { status: 401 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        error: error?.message || 'An error occurred while processing your request',
        details: error?.error?.message
      },
      { status: error?.status || 500 }
    );
  }
}
