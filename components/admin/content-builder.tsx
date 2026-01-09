"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const categories = [
  { value: "world", label: "உலக செய்திகள்" },
  { value: "india", label: "இந்தியா" },
  { value: "tamilnadu", label: "தமிழ்நாடு" },
  { value: "sports", label: "விளையாட்டு" },
  { value: "tech", label: "தொழில்நுட்பம்" },
  { value: "business", label: "வணிகம்" },
  { value: "cinema", label: "பொழுதுபோக்கு" },
];

interface ArticleData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
}

export function ContentBuilder() {
  const [articleData, setArticleData] = useState<ArticleData>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            title: articleData.title,
            excerpt: articleData.excerpt,
            content: articleData.content,
            category: articleData.category,
            author: articleData.author,
            image: articleData.image,
            publishedAt: new Date().toISOString(),
          }
        }),
      });

      if (response.ok) {
        alert('கட்டுரை வெற்றிகரமாக சேர்க்கப்பட்டது!');
        setArticleData({
          title: "",
          excerpt: "",
          content: "",
          category: "",
          author: "",
          image: "",
        });
      } else {
        alert('கட்டுரை சேர்ப்பதில் பிழை ஏற்பட்டது');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('கட்டுரை சேர்ப்பதில் பிழை ஏற்பட்டது');
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#003d7a]">
          புதிய கட்டுரை உருவாக்கம்
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">தலைப்பு *</Label>
              <Input
                id="title"
                value={articleData.title}
                onChange={(e) => setArticleData({...articleData, title: e.target.value})}
                placeholder="கட்டுரையின் தலைப்பு"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">வகை *</Label>
              <Select 
                value={articleData.category} 
                onValueChange={(value) => setArticleData({...articleData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="வகையை தேர்ந்தெடுக்கவும்" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="author">ஆசிரியர் *</Label>
              <Input
                id="author"
                value={articleData.author}
                onChange={(e) => setArticleData({...articleData, author: e.target.value})}
                placeholder="ஆசிரியர் பெயர்"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">படம் URL</Label>
              <Input
                id="image"
                value={articleData.image}
                onChange={(e) => setArticleData({...articleData, image: e.target.value})}
                placeholder="/image-name.jpg அல்லது https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">சுருக்கம் *</Label>
            <Textarea
              id="excerpt"
              value={articleData.excerpt}
              onChange={(e) => setArticleData({...articleData, excerpt: e.target.value})}
              placeholder="கட்டுரையின் சுருக்கம் (2-3 வரிகள்)"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">முழு உள்ளடக்கம் *</Label>
            <Textarea
              id="content"
              value={articleData.content}
              onChange={(e) => setArticleData({...articleData, content: e.target.value})}
              placeholder="கட்டுரையின் முழு உள்ளடக்கம் (HTML tags பயன்படுத்தலாம்)"
              rows={15}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-[#e60000] hover:bg-[#cc0000]">
              கட்டுரையை வெளியிடு
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setArticleData({
                title: "",
                excerpt: "",
                content: "",
                category: "",
                author: "",
                image: "",
              })}
            >
              மீட்டமை
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}