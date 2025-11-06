import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, photos } = await request.json()

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8309074311:AAHqFUzmqSmMTa1NQBERxSjy1YVmaqG3pV4"
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "7455485161"

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: "Telegram bot не настроен. Добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в переменные окружения." },
        { status: 500 },
      )
    }

    // Отправка текстового сообщения
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Telegram API error:", errorData)
      throw new Error("Ошибка отправки в Telegram")
    }

    if (photos && photos.length > 0) {
      for (const photoBase64 of photos) {
        // Конвертируем base64 в blob
        const base64Data = photoBase64.split(",")[1]
        const byteCharacters = atob(base64Data)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: "image/jpeg" })

        // Отправляем фото через FormData
        const formData = new FormData()
        formData.append("chat_id", TELEGRAM_CHAT_ID)
        formData.append("photo", blob, "photo.jpg")

        const photoUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`
        const photoResponse = await fetch(photoUrl, {
          method: "POST",
          body: formData,
        })

        if (!photoResponse.ok) {
          console.error("Error sending photo to Telegram")
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return NextResponse.json({ error: "Не удалось отправить сообщение" }, { status: 500 })
  }
}
