import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { poem, words } = await request.json()

    if (!poem) {
      return NextResponse.json(
        { error: 'Poem is required' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: '你是一位优秀的诗人。请根据提供的诗歌创作一首风格相似但内容不同的新诗。保持原有的意境和韵味，但用不同的词语和表达方式。只返回诗歌内容，不要任何解释或标题。'
        },
        {
          role: 'user',
          content: `请基于原诗创作一首风格相似的新诗。原诗使用的汉字包括：${words ? words.join('、') : '未提供'}\n\n原诗：\n${poem}`
        }
      ],
      thinking: { type: 'disabled' }
    })

    const newPoem = completion.choices[0]?.message?.content || ''

    return NextResponse.json({ poem: newPoem })
  } catch (error) {
    console.error('Error remixing poem:', error)
    return NextResponse.json(
      { error: 'Failed to remix poem' },
      { status: 500 }
    )
  }
}
