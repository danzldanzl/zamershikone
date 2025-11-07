"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader2, Upload, X, Plus } from "lucide-react"

interface Room {
  id: string
  name: string
  area: string
  perimeter: string
  canvas: string
  comment: string
  photos: File[]
}

interface MainFormData {
  address: string
  phone: string
  installDate: string
  installPrice: string
}

export default function MeasurementForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [mainData, setMainData] = useState<MainFormData>({
    address: "",
    phone: "",
    installDate: "",
    installPrice: "",
  })

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "",
      area: "",
      perimeter: "",
      canvas: "",
      comment: "",
      photos: [],
    },
  ])

  const handleMainDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMainData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoomChange = (roomId: string, field: keyof Room, value: string) => {
    setRooms((prev) => prev.map((room) => (room.id === roomId ? { ...room, [field]: value } : room)))
  }

  const handleRoomPhotoChange = (roomId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files)
      setRooms((prev) =>
        prev.map((room) => (room.id === roomId ? { ...room, photos: [...room.photos, ...newPhotos] } : room)),
      )
    }
  }

  const removeRoomPhoto = (roomId: string, photoIndex: number) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, photos: room.photos.filter((_, i) => i !== photoIndex) } : room,
      ),
    )
  }

  const addRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name: "",
      area: "",
      perimeter: "",
      canvas: "",
      comment: "",
      photos: [],
    }
    setRooms((prev) => [...prev, newRoom])
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let message = `📋 *Новый замер*\n\n`

      message += `📍 *Адрес:* ${mainData.address}\n`
      message += `📞 *Телефон:* ${mainData.phone}\n`

      if (mainData.installDate && mainData.installDate.trim()) {
        message += `📅 *Дата монтажа:* ${mainData.installDate}\n`
      }

      if (mainData.installPrice && mainData.installPrice.trim()) {
        message += `💰 *Сумма монтажа:* ${mainData.installPrice}\n`
      }

      const allPhotos: File[] = []

      for (const room of rooms) {
        if (room.name || room.area || room.perimeter || room.canvas) {
          message += `\n🏠 *Комната "${room.name || "Без названия"}"*\n`

          if (room.area && room.area.trim()) {
            message += `📐 Площадь: ${room.area} м²\n`
          }

          if (room.perimeter && room.perimeter.trim()) {
            message += `📏 Периметр: ${room.perimeter} м.п.\n`
          }

          if (room.canvas && room.canvas.trim()) {
            message += `🎨 Полотно: ${room.canvas}\n`
          }

          if (room.comment && room.comment.trim()) {
            message += `💬 Комментарий: ${room.comment}\n`
          }

          if (room.photos.length > 0) {
            message += `📸 Фото: ${room.photos.length} шт.\n`
            allPhotos.push(...room.photos)
          }
        }
      }

      const photosBase64 = await Promise.all(allPhotos.map((photo) => fileToBase64(photo)))

      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          photos: photosBase64,
        }),
      })

      if (!response.ok) {
        throw new Error("Ошибка отправки")
      }

      toast({
        title: "Успешно отправлено!",
        description: "Данные замера отправлены в Telegram",
      })

      setMainData({
        address: "",
        phone: "",
        installDate: "",
        installPrice: "",
      })
      setRooms([
        {
          id: "1",
          name: "",
          area: "",
          perimeter: "",
          canvas: "",
          comment: "",
          photos: [],
        },
      ])
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить данные. Попробуйте снова.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-4 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Основная информация */}
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-2xl font-semibold text-foreground">Основная информация</h2>

              <div className="space-y-3 md:space-y-4">
                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="address" className="text-sm md:text-base">
                    Адрес заказчика *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={mainData.address}
                    onChange={handleMainDataChange}
                    required
                    placeholder="Введите адрес"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="phone" className="text-sm md:text-base">
                    Номер телефона *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={mainData.phone}
                    onChange={handleMainDataChange}
                    required
                    placeholder="+375 (__) ___-__-__"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="installDate" className="text-sm md:text-base">
                    Дата монтажа
                  </Label>
                  <Input
                    id="installDate"
                    name="installDate"
                    type="date"
                    value={mainData.installDate}
                    onChange={handleMainDataChange}
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="installPrice" className="text-sm md:text-base">
                    Сумма монтажа
                  </Label>
                  <Input
                    id="installPrice"
                    name="installPrice"
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    value={mainData.installPrice}
                    onChange={handleMainDataChange}
                    placeholder="0.00"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>
              </div>
            </div>

            {rooms.map((room, index) => (
              <div key={room.id} className="space-y-3 md:space-y-4 border-t-2 border-border pt-4 md:pt-6">
                <h2 className="text-lg md:text-2xl font-semibold text-foreground">Комната {index + 1}</h2>

                <div className="space-y-3 md:space-y-4">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor={`roomName-${room.id}`} className="text-sm md:text-base">
                      Название комнаты
                    </Label>
                    <Input
                      id={`roomName-${room.id}`}
                      value={room.name}
                      onChange={(e) => handleRoomChange(room.id, "name", e.target.value)}
                      placeholder="Например: Спальня, Кухня"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor={`area-${room.id}`} className="text-sm md:text-base">
                      Площадь (м²)
                    </Label>
                    <Input
                      id={`area-${room.id}`}
                      type="number"
                      step="0.01"
                      inputMode="decimal"
                      value={room.area}
                      onChange={(e) => handleRoomChange(room.id, "area", e.target.value)}
                      placeholder="0.00"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor={`perimeter-${room.id}`} className="text-sm md:text-base">
                      Периметр (м.п.)
                    </Label>
                    <Input
                      id={`perimeter-${room.id}`}
                      type="number"
                      step="0.01"
                      inputMode="decimal"
                      value={room.perimeter}
                      onChange={(e) => handleRoomChange(room.id, "perimeter", e.target.value)}
                      placeholder="0.00"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor={`canvas-${room.id}`} className="text-sm md:text-base">
                      Полотно
                    </Label>
                    <Input
                      id={`canvas-${room.id}`}
                      value={room.canvas}
                      onChange={(e) => handleRoomChange(room.id, "canvas", e.target.value)}
                      placeholder="Опишите тип полотна"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor={`roomComment-${room.id}`} className="text-sm md:text-base">
                      Комментарий
                    </Label>
                    <Textarea
                      id={`roomComment-${room.id}`}
                      value={room.comment}
                      onChange={(e) => handleRoomChange(room.id, "comment", e.target.value)}
                      placeholder="Дополнительная информация..."
                      className="text-sm md:text-base min-h-[40vh] resize-y"
                    />
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <Label htmlFor={`photos-${room.id}`} className="text-sm md:text-base">
                      Фото
                    </Label>
                    <div className="flex flex-col gap-3 md:gap-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <Input
                          id={`photos-${room.id}`}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleRoomPhotoChange(room.id, e)}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById(`photos-${room.id}`)?.click()}
                          className="w-full md:w-auto text-sm md:text-base h-9 md:h-10"
                        >
                          <Upload className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                          Добавить фото
                        </Button>
                      </div>
                      {room.photos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                          {room.photos.map((photo, photoIndex) => (
                            <div
                              key={photoIndex}
                              className="relative group rounded-lg overflow-hidden border border-border"
                            >
                              <img
                                src={URL.createObjectURL(photo) || "/placeholder.svg"}
                                alt={`Фото ${photoIndex + 1}`}
                                className="w-full h-24 md:h-32 object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeRoomPhoto(room.id, photoIndex)}
                                className="absolute top-1 right-1 md:top-2 md:right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3 md:h-4 md:w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={addRoom}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-sm md:text-base h-9 md:h-10"
                  >
                    <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Добавить комнату
                  </Button>
                </div>
              </div>
            ))}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D4A017] hover:bg-[#B8860B] text-primary-foreground text-base md:text-lg py-5 md:py-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </>
  )
}
