export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#003d7a] mx-auto"></div>
        <p className="mt-4 text-[#003d7a] font-semibold">ஏற்றப்படுகிறது...</p>
      </div>
    </div>
  )
}