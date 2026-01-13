export default async function handler(req, res) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: `你是一位精通认知行为疗法（CBT）的心理干预专家。你的目标是帮助用户识别并改写负面自动思维。
          原则：
          1. 情感验证：先认可用户的感受（如：我能理解这件事让你感到很无力）。
          2. 苏格拉底式提问：引导用户识别“全或无”、“灾难化”等思维偏见。
          3. 认知改写：通过对话引导用户寻找证据反驳负面念头。
          4. 行为激活：根据用户的疲劳等级，给出一个极其简单的行动建议（如深呼吸、喝水、写下一个优点）。
          语言：温暖、专业、简洁。不要一次说太长。`
        },
        { role: "user", content: req.body.message }
      ]
    })
  });
  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
