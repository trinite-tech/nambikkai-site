import { ImageGallery } from '@/components/image-gallery'

export default function ImagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#003d7a] mb-4">
            Strapi CMS Images
          </h1>
          <p className="text-gray-600">
            All images uploaded to the Strapi CMS on AWS EC2
          </p>
        </div>
        
        <ImageGallery />
      </div>
    </div>
  )
}