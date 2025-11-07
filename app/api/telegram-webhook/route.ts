import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8309074311:AAHqFUzmqSmMTa1NQBERxSjy1YVmaqG3pV4"

    if (body.callback_query) {
      const callbackQuery = body.callback_query
      const messageId = callbackQuery.message.message_id
      const chatId = callbackQuery.message.chat.id
      const callbackData = callbackQuery.data

      const editUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageReplyMarkup`
      await fetch(editUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          reply_markup: { inline_keyboard: [] },
        }),
      })

      let statusMessage = ""
      if (callbackData === "order_confirmed") {
        statusMessage = "✅ *Заказ полотна выполнен*"
      } else if (callbackData === "order_rejected") {
        statusMessage = "❌ *Отказ от работ*"
      }

      const sendUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
      await fetch(sendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: statusMessage,
          parse_mode: "Markdown",
        }),
      })

      // Answer callback query to remove loading state
      const answerUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`
      await fetch(answerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          callback_query_id: callbackQuery.id,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error handling webhook:", error)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}
