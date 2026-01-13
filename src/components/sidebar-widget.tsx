"use client"

import { TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"

interface SidebarWidgetProps {
  title: string
  type: "trending" | "archive" | "categories"
  items?: { label: string; count?: number; href?: string }[]
}

export function SidebarWidget({ title, type, items = [] }: SidebarWidgetProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
      <div className="bg-[#e60000] text-white px-4 py-3 flex items-center gap-2">
        {type === "trending" && <TrendingUp size={20} />}
        {type === "archive" && <Calendar size={20} />}
        <h3 className="font-bold text-sm">{title}</h3>
      </div>
      <div className="p-4">
        {type === "trending" && (
          <ol className="space-y-3">
            {items.map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#e60000] text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <Link
                  href={item.href || "#"}
                  className="text-sm font-semibold text-[#003d7a] hover:text-[#e60000] transition line-clamp-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        )}
        {type === "categories" && (
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href || "#"}
                  className="text-sm text-[#003d7a] hover:text-[#e60000] transition font-semibold flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">{item.count || 0}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
