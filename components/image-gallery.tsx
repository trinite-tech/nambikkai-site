"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAllImages } from '@/lib/api'

interface StrapiImage {
  id: number
  name: string
  alternativeText: string
  url: string
  width: number
  height: number
  mime: string
  size: number
  createdAt: string
}

export function ImageGallery() {
  const [images, setImages] = useState<StrapiImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        const fetchedImages = await getAllImages()
        setImages(Array.isArray(fetchedImages) ? fetchedImages : [])
      } catch (err) {
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Strapi Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 aspect-video rounded-lg"></div>
              <div className="mt-2 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Strapi Images</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Strapi Images ({images.length} total)
      </h2>
      
      {images.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No images found in Strapi CMS</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
              <div className="relative aspect-video">
                <Image
                  src={image.url}
                  alt={image.alternativeText}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate" title={image.name}>
                  {image.name}
                </h3>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <p>Size: {Math.round(image.size / 1024)}KB</p>
                  <p>Dimensions: {image.width}×{image.height}</p>
                  <p>Type: {image.mime}</p>
                  <p>Uploaded: {new Date(image.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}