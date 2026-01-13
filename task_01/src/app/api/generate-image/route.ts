import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { poem } = await request.json()

    if (!poem) {
      return NextResponse.json(
        { error: 'Poem is required' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    // 根据诗歌生成图像提示
    const promptCompletion = await zai.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: '你是一位专业的图像提示词设计师。请根据提供的诗歌创作一个详细、描述性的英文图像提示词，用于AI图像生成。提示词应该描述诗歌中的意境、色彩、氛围和主要元素。只返回图像提示词，不要任何其他内容。'
        },
        {
          role: 'user',
          content: `根据这首诗创作一个图像生成提示词：\n${poem}`
        }
      ],
      thinking: { type: 'disabled' }
    })

    const prompt = promptCompletion.choices[0]?.message?.content || 'Beautiful landscape painting'

    // 使用生成的提示词创建图像
    const response = await zai.images.generations.create({
      prompt: prompt,
      size: '1344x768'
    })

    const imageBase64 = response.data[0].base64
    const imageDataUrl = `data:image/png;base64,${imageBase64}`

    return NextResponse.json({ image: imageDataUrl, prompt })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}
