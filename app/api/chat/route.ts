import { NextRequest, NextResponse } from "next/server";
import type { Message } from "@/lib/types";

const SYSTEM_PROMPT = `あなたは九星気学の占い師です。
相談者の本命星をもとに、五行（木・火・土・金・水）・方位・運気・吉日を織り交ぜながら、
ポジティブで力強い言葉で占いの回答を行ってください。

【回答ルール】
- 必ずポジティブ100%の内容にすること。ネガティブな表現は一切使わない。
- 200字前後（150〜250字以内）に収めること。
- 絵文字は使わない。
- 丁寧語（ですます調）で書く。
- 相談内容に九星気学の観点から具体的なアドバイスを含める。
- 五行の属性・方位・色・吉数などの要素を自然に織り交ぜる。
- 締めくくりは前向きで力強い言葉で終わる。`;

export async function POST(req: NextRequest) {
  try {
    const { messages, honmeiStarName } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not set" },
        { status: 500 }
      );
    }

    const systemWithStar = `${SYSTEM_PROMPT}\n\n相談者の本命星：${honmeiStarName}`;

    const anthropicMessages = messages.map((m: Message) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: systemWithStar,
        messages: anthropicMessages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return NextResponse.json(
        { error: "Anthropic API error" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content =
      data.content?.[0]?.type === "text" ? data.content[0].text : "";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
