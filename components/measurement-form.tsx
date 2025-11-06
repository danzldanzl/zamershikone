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
import { Loader2, Upload, X } from "lucide-react"

interface FormData {
  address: string
  phone: string
  area: string
  perimeter: string
  canvas: string
  chandelierPlatforms: string
  lightPlatforms: string
  lights: string
  lightType: string
  trackType: string
  trackMeters: string
  additionalCorners: string
  pipesProcessing: string
  beamInstallation: string
  curtainRodBase: string
  hiddenCurtainRodType: string
  hiddenCurtainRodMeters: string
  hiddenCurtainRodOffset: string
  pk15Plastic: string
  pk15Metal: string
  curtainRod2Row: string
  curtainRod2RowQty: string
  curtainRod3Row: string
  curtainRod3RowQty: string
  curtainRodRoundings: string
  blenda: string
  floatingWatt: string
  floatingQty: string
  lightLineWidth: string
  lightLineWatt: string
  lightLineQty: string
  shadowProfile: string
  separatorProfile: string
  separatorProfileQty: string
  wallProfile: string
  insert: string
  insertColor: string
  comment: string
}

export default function MeasurementForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photos, setPhotos] = useState<File[]>([])
  const [formData, setFormData] = useState<FormData>({
    address: "",
    phone: "",
    area: "",
    perimeter: "",
    canvas: "",
    chandelierPlatforms: "",
    lightPlatforms: "",
    lights: "",
    lightType: "",
    trackType: "",
    trackMeters: "",
    additionalCorners: "",
    pipesProcessing: "",
    beamInstallation: "",
    curtainRodBase: "",
    hiddenCurtainRodType: "",
    hiddenCurtainRodMeters: "",
    hiddenCurtainRodOffset: "",
    pk15Plastic: "",
    pk15Metal: "",
    curtainRod2Row: "",
    curtainRod2RowQty: "",
    curtainRod3Row: "",
    curtainRod3RowQty: "",
    curtainRodRoundings: "",
    blenda: "",
    floatingWatt: "",
    floatingQty: "",
    lightLineWidth: "",
    lightLineWatt: "",
    lightLineQty: "",
    shadowProfile: "",
    separatorProfile: "",
    separatorProfileQty: "",
    wallProfile: "",
    insert: "",
    insertColor: "",
    comment: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files)
      setPhotos((prev) => [...prev, ...newPhotos])
    }
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let message = `📋 *Новый замер*\n\n`

      // Основная информация (обязательные поля)
      message += `📍 *Адрес:* ${formData.address}\n`
      message += `📞 *Телефон:* ${formData.phone}\n`
      message += `📐 *Площадь:* ${formData.area} м²\n`
      message += `📏 *Периметр:* ${formData.perimeter} м.п.\n`
      message += `🎨 *Полотно:* ${formData.canvas}\n`

      // Собираем дополнительную информацию только из заполненных полей
      const additionalInfo: string[] = []

      if (formData.chandelierPlatforms && formData.chandelierPlatforms !== "0") {
        additionalInfo.push(`💡 Платформы под люстру: ${formData.chandelierPlatforms} шт.`)
      }
      if (formData.lightPlatforms && formData.lightPlatforms !== "0") {
        additionalInfo.push(`💡 Платформы под светильники: ${formData.lightPlatforms} шт.`)
      }
      if (formData.lights && formData.lights !== "0") {
        let lightInfo = `💡 Светильники: ${formData.lights} шт.`
        if (formData.lightType) {
          lightInfo += ` (${formData.lightType})`
        }
        additionalInfo.push(lightInfo)
      }
      if (formData.trackMeters && formData.trackMeters !== "0") {
        let trackInfo = `🛤 Треки: ${formData.trackMeters} м.п.`
        if (formData.trackType) {
          trackInfo += ` (${formData.trackType})`
        }
        additionalInfo.push(trackInfo)
      }
      if (formData.additionalCorners && formData.additionalCorners !== "0") {
        additionalInfo.push(`📐 Дополнительные углы: ${formData.additionalCorners} шт.`)
      }
      if (formData.pipesProcessing && formData.pipesProcessing !== "0") {
        additionalInfo.push(`🔧 Обработка труб/вытяжки: ${formData.pipesProcessing} шт.`)
      }
      if (formData.beamInstallation && formData.beamInstallation !== "0") {
        additionalInfo.push(`🪵 Монтаж бруса: ${formData.beamInstallation} м.п.`)
      }
      if (formData.curtainRodBase && formData.curtainRodBase !== "0") {
        additionalInfo.push(`📏 Закладные под карниз: ${formData.curtainRodBase} м.п.`)
      }
      if (formData.hiddenCurtainRodMeters && formData.hiddenCurtainRodMeters !== "0") {
        let hiddenInfo = `🎭 Скрытый карниз: ${formData.hiddenCurtainRodMeters} м.п.`
        if (formData.hiddenCurtainRodType) {
          hiddenInfo += ` (${formData.hiddenCurtainRodType})`
        }
        if (formData.hiddenCurtainRodOffset && formData.hiddenCurtainRodOffset !== "0") {
          hiddenInfo += `, отступ ${formData.hiddenCurtainRodOffset} см`
        }
        additionalInfo.push(hiddenInfo)
      }
      if (formData.pk15Plastic && formData.pk15Plastic !== "0") {
        additionalInfo.push(`📏 Карниз ПК-15 пластик: ${formData.pk15Plastic} м.п.`)
      }
      if (formData.pk15Metal && formData.pk15Metal !== "0") {
        additionalInfo.push(`📏 Карниз ПК-15 металл: ${formData.pk15Metal} м.п.`)
      }
      if (formData.curtainRod2RowQty && formData.curtainRod2RowQty !== "0") {
        additionalInfo.push(`📏 Карниз 2-х рядный: ${formData.curtainRod2RowQty} м.п.`)
      }
      if (formData.curtainRod3RowQty && formData.curtainRod3RowQty !== "0") {
        additionalInfo.push(`📏 Карниз 3-х рядный: ${formData.curtainRod3RowQty} м.п.`)
      }
      if (formData.curtainRodRoundings && formData.curtainRodRoundings !== "0") {
        additionalInfo.push(`🔄 Закругления для карниза: ${formData.curtainRodRoundings} пар`)
      }
      if (formData.blenda && formData.blenda !== "0") {
        additionalInfo.push(`📏 Бленда: ${formData.blenda} м.п.`)
      }
      if (formData.floatingQty && formData.floatingQty !== "0") {
        let floatingInfo = `✨ Парящий: ${formData.floatingQty} м.п.`
        if (formData.floatingWatt) {
          floatingInfo += ` (${formData.floatingWatt})`
        }
        additionalInfo.push(floatingInfo)
      }
      if (formData.lightLineQty && formData.lightLineQty !== "0") {
        let lightLineInfo = `💡 Световая линия: ${formData.lightLineQty} м.п.`
        const details: string[] = []
        if (formData.lightLineWidth) details.push(formData.lightLineWidth)
        if (formData.lightLineWatt) details.push(formData.lightLineWatt)
        if (details.length > 0) {
          lightLineInfo += ` (${details.join(", ")})`
        }
        additionalInfo.push(lightLineInfo)
      }
      if (formData.shadowProfile && formData.shadowProfile !== "0") {
        additionalInfo.push(`🌑 Теневой профиль: ${formData.shadowProfile} м.п.`)
      }
      if (formData.separatorProfileQty && formData.separatorProfileQty !== "0") {
        let separatorInfo = `➗ Разделительный профиль: ${formData.separatorProfileQty} м.п.`
        if (formData.separatorProfile) {
          separatorInfo += ` (${formData.separatorProfile})`
        }
        additionalInfo.push(separatorInfo)
      }
      if (formData.wallProfile && formData.wallProfile !== "0") {
        additionalInfo.push(`🧱 Профиль стеновой: ${formData.wallProfile} м.п.`)
      }
      if (formData.insert && formData.insert !== "0") {
        let insertInfo = `🎨 Вставка: ${formData.insert} м.п.`
        if (formData.insertColor) {
          insertInfo += `, цвет: ${formData.insertColor}`
        }
        additionalInfo.push(insertInfo)
      }

      // Добавляем дополнительную информацию, если есть заполненные поля
      if (additionalInfo.length > 0) {
        message += `\n*Дополнительная информация:*\n`
        message += additionalInfo.join("\n") + "\n"
      }

      if (formData.comment && formData.comment.trim()) {
        message += `\n💬 *Комментарий:*\n${formData.comment}\n`
      }

      if (photos.length > 0) {
        message += `\n📸 *Фото:* ${photos.length} шт.\n`
      }

      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          photos: photos.map((photo) => photo.name),
        }),
      })

      if (!response.ok) {
        throw new Error("Ошибка отправки")
      }

      toast({
        title: "Успешно отправлено!",
        description: "Данные замера отправлены в Telegram",
      })

      // Очистка формы
      setFormData({
        address: "",
        phone: "",
        area: "",
        perimeter: "",
        canvas: "",
        chandelierPlatforms: "",
        lightPlatforms: "",
        lights: "",
        lightType: "",
        trackType: "",
        trackMeters: "",
        additionalCorners: "",
        pipesProcessing: "",
        beamInstallation: "",
        curtainRodBase: "",
        hiddenCurtainRodType: "",
        hiddenCurtainRodMeters: "",
        hiddenCurtainRodOffset: "",
        pk15Plastic: "",
        pk15Metal: "",
        curtainRod2Row: "",
        curtainRod2RowQty: "",
        curtainRod3Row: "",
        curtainRod3RowQty: "",
        curtainRodRoundings: "",
        blenda: "",
        floatingWatt: "",
        floatingQty: "",
        lightLineWidth: "",
        lightLineWatt: "",
        lightLineQty: "",
        shadowProfile: "",
        separatorProfile: "",
        separatorProfileQty: "",
        wallProfile: "",
        insert: "",
        insertColor: "",
        comment: "",
      })
      setPhotos([])
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
                    value={formData.address}
                    onChange={handleInputChange}
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
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+375 (__) ___-__-__"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="area" className="text-sm md:text-base">
                    Площадь (м²) *
                  </Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    step="0.01"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="perimeter" className="text-sm md:text-base">
                    Периметр (м.п.) *
                  </Label>
                  <Input
                    id="perimeter"
                    name="perimeter"
                    type="number"
                    step="0.01"
                    value={formData.perimeter}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="canvas" className="text-sm md:text-base">
                    Полотно *
                  </Label>
                  <Input
                    id="canvas"
                    name="canvas"
                    value={formData.canvas}
                    onChange={handleInputChange}
                    required
                    placeholder="Опишите тип полотна"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-2xl font-semibold text-foreground">Дополнительная информация</h2>

              <div className="space-y-3 md:space-y-4">
                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="chandelierPlatforms" className="text-sm md:text-base">
                    Платформы под люстру (шт.)
                  </Label>
                  <Input
                    id="chandelierPlatforms"
                    name="chandelierPlatforms"
                    type="number"
                    value={formData.chandelierPlatforms}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="lightPlatforms" className="text-sm md:text-base">
                    Платформы под светильники (шт.)
                  </Label>
                  <Input
                    id="lightPlatforms"
                    name="lightPlatforms"
                    type="number"
                    value={formData.lightPlatforms}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm md:text-base">Светильники (шт.) + Тип светильника</Label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <Input
                      id="lights"
                      name="lights"
                      type="number"
                      value={formData.lights}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                    <Input
                      id="lightType"
                      name="lightType"
                      value={formData.lightType}
                      onChange={handleInputChange}
                      placeholder="Название типа"
                      className="col-span-2 text-sm md:text-base h-9 md:h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm md:text-base">Треки (м.п.) + Тип трека</Label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <Input
                      id="trackMeters"
                      name="trackMeters"
                      type="number"
                      step="0.01"
                      value={formData.trackMeters}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                    <Input
                      id="trackType"
                      name="trackType"
                      value={formData.trackType}
                      onChange={handleInputChange}
                      placeholder="накладной/встроенный"
                      className="col-span-2 text-sm md:text-base h-9 md:h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="additionalCorners" className="text-sm md:text-base">
                    Дополнительные углы (шт.)
                  </Label>
                  <Input
                    id="additionalCorners"
                    name="additionalCorners"
                    type="number"
                    value={formData.additionalCorners}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="pipesProcessing" className="text-sm md:text-base">
                    Обработка труб/вытяжки (шт.)
                  </Label>
                  <Input
                    id="pipesProcessing"
                    name="pipesProcessing"
                    type="number"
                    value={formData.pipesProcessing}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="beamInstallation" className="text-sm md:text-base">
                    Монтаж бруса (м.п.)
                  </Label>
                  <Input
                    id="beamInstallation"
                    name="beamInstallation"
                    type="number"
                    step="0.01"
                    value={formData.beamInstallation}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="curtainRodBase" className="text-sm md:text-base">
                    Закладные под карниз (м.п.)
                  </Label>
                  <Input
                    id="curtainRodBase"
                    name="curtainRodBase"
                    type="number"
                    step="0.01"
                    value={formData.curtainRodBase}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm md:text-base">Скрытый карниз: Тип + Количество (м.п.)</Label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <Input
                      id="hiddenCurtainRodType"
                      name="hiddenCurtainRodType"
                      value={formData.hiddenCurtainRodType}
                      onChange={handleInputChange}
                      placeholder="с/без доворота"
                      className="col-span-2 text-sm md:text-base h-9 md:h-10"
                    />
                    <Input
                      id="hiddenCurtainRodMeters"
                      name="hiddenCurtainRodMeters"
                      type="number"
                      step="0.01"
                      value={formData.hiddenCurtainRodMeters}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="hiddenCurtainRodOffset" className="text-sm md:text-base">
                    Скрытый карниз: Отступ (см)
                  </Label>
                  <Input
                    id="hiddenCurtainRodOffset"
                    name="hiddenCurtainRodOffset"
                    type="number"
                    value={formData.hiddenCurtainRodOffset}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="pk15Plastic" className="text-sm md:text-base">
                    Карниз ПК-15 пластик (м.п.)
                  </Label>
                  <Input
                    id="pk15Plastic"
                    name="pk15Plastic"
                    type="number"
                    step="0.01"
                    value={formData.pk15Plastic}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="pk15Metal" className="text-sm md:text-base">
                    Карниз ПК-15 металл (м.п.)
                  </Label>
                  <Input
                    id="pk15Metal"
                    name="pk15Metal"
                    type="number"
                    step="0.01"
                    value={formData.pk15Metal}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm md:text-base">Карниз 2-х рядный + Количество (м.п.)</Label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <Input
                      id="curtainRod2Row"
                      name="curtainRod2Row"
                      value={formData.curtainRod2Row}
                      onChange={handleInputChange}
                      placeholder="2-х рядный"
                      className="col-span-2 text-sm md:text-base h-9 md:h-10"
                    />
                    <Input
                      id="curtainRod2RowQty"
                      name="curtainRod2RowQty"
                      type="number"
                      step="0.01"
                      value={formData.curtainRod2RowQty}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm md:text-base">Карниз 3-х рядный + Количество (м.п.)</Label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <Input
                      id="curtainRod3Row"
                      name="curtainRod3Row"
                      value={formData.curtainRod3Row}
                      onChange={handleInputChange}
                      placeholder="3-х рядный"
                      className="col-span-2 text-sm md:text-base h-9 md:h-10"
                    />
                    <Input
                      id="curtainRod3RowQty"
                      name="curtainRod3RowQty"
                      type="number"
                      step="0.01"
                      value={formData.curtainRod3RowQty}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="curtainRodRoundings" className="text-sm md:text-base">
                    Закругления для карниза (пар)
                  </Label>
                  <Input
                    id="curtainRodRoundings"
                    name="curtainRodRoundings"
                    type="number"
                    value={formData.curtainRodRoundings}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="blenda" className="text-sm md:text-base">
                    Бленда (м.п.)
                  </Label>
                  <Input
                    id="blenda"
                    name="blenda"
                    type="number"
                    step="0.01"
                    value={formData.blenda}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm md:text-base">Парящий (мощность) + Количество (м.п.)</Label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <Input
                      id="floatingWatt"
                      name="floatingWatt"
                      value={formData.floatingWatt}
                      onChange={handleInputChange}
                      placeholder="9.6 / 19.6 ват"
                      className="col-span-2 text-sm md:text-base h-9 md:h-10"
                    />
                    <Input
                      id="floatingQty"
                      name="floatingQty"
                      type="number"
                      step="0.01"
                      value={formData.floatingQty}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm md:text-base">Световая линия (ширина) + Мощность + Количество (м.п.)</Label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <Input
                      id="lightLineWidth"
                      name="lightLineWidth"
                      value={formData.lightLineWidth}
                      onChange={handleInputChange}
                      placeholder="3 см"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                    <Input
                      id="lightLineWatt"
                      name="lightLineWatt"
                      value={formData.lightLineWatt}
                      onChange={handleInputChange}
                      placeholder="19.6 / 39.2 ват"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                    <Input
                      id="lightLineQty"
                      name="lightLineQty"
                      type="number"
                      step="0.01"
                      value={formData.lightLineQty}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="shadowProfile" className="text-sm md:text-base">
                    Теневой профиль (м.п.)
                  </Label>
                  <Input
                    id="shadowProfile"
                    name="shadowProfile"
                    type="number"
                    step="0.01"
                    value={formData.shadowProfile}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm md:text-base">Разделительный профиль (тип) + Количество (м.п.)</Label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <Input
                      id="separatorProfile"
                      name="separatorProfile"
                      value={formData.separatorProfile}
                      onChange={handleInputChange}
                      placeholder="обычный/теневой"
                      className="col-span-2 text-sm md:text-base h-9 md:h-10"
                    />
                    <Input
                      id="separatorProfileQty"
                      name="separatorProfileQty"
                      type="number"
                      step="0.01"
                      value={formData.separatorProfileQty}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="wallProfile" className="text-sm md:text-base">
                    Профиль стеновой (м.п.)
                  </Label>
                  <Input
                    id="wallProfile"
                    name="wallProfile"
                    type="number"
                    step="0.01"
                    value={formData.wallProfile}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="text-sm md:text-base h-9 md:h-10"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm md:text-base">Вставка (м.п.) + Цвет вставки</Label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <Input
                      id="insert"
                      name="insert"
                      type="number"
                      step="0.01"
                      value={formData.insert}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                    <Input
                      id="insertColor"
                      name="insertColor"
                      value={formData.insertColor}
                      onChange={handleInputChange}
                      placeholder="Укажите цвет"
                      className="col-span-2 text-sm md:text-base h-9 md:h-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Комментарий */}
            <div className="space-y-1.5 md:space-y-2">
              <Label htmlFor="comment" className="text-sm md:text-base">
                Комментарий к замеру
              </Label>
              <Textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Дополнительная информация..."
                rows={4}
                className="text-sm md:text-base"
              />
            </div>

            <div className="space-y-3 md:space-y-4">
              <Label htmlFor="photos" className="text-sm md:text-base">
                Фото
              </Label>
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <Input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("photos")?.click()}
                    className="w-full md:w-auto text-sm md:text-base h-9 md:h-10"
                  >
                    <Upload className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Добавить фото
                  </Button>
                  {photos.length > 0 && (
                    <span className="text-xs md:text-sm text-muted-foreground">Загружено: {photos.length} фото</span>
                  )}
                </div>
                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border border-border">
                        <img
                          src={URL.createObjectURL(photo) || "/placeholder.svg"}
                          alt={`Фото ${index + 1}`}
                          className="w-full h-24 md:h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 md:top-2 md:right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                        <p className="text-xs text-muted-foreground p-1.5 md:p-2 truncate">{photo.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Кнопка отправки */}
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
