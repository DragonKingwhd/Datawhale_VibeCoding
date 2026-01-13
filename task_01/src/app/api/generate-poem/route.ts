import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { words } = await request.json()

    if (!words || !Array.isArray(words) || words.length === 0) {
      return NextResponse.json(
        { error: 'Words array is required' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: '你是一位优秀的诗人。请根据提供的汉字创作一首优美的古体诗或现代诗。诗歌要意境优美，富有诗意，自然流畅。只返回诗歌内容，不要任何解释或标题。'
        },
        {
          role: 'user',
          content: `请用这些汉字创作一首诗：${words.join('、')}`
        }
      ],
      thinking: { type: 'disabled' }
    })

    const poem = completion.choices[0]?.message?.content || ''

    return NextResponse.json({ poem })
  } catch (error) {
    console.error('Error generating poem:', error)
    return NextResponse.json(
      { error: 'Failed to generate poem' },
      { status: 500 }
    )
  }
}
