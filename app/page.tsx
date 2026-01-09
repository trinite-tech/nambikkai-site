"use client";
interface HomepageData {
  title: string
  description: string
}

import { DynamicHomepage } from "@/components/dynamic-homepage-new";
import { useEffect, useState } from "react";

const mockData = {
  title: "Tamil News Website",
  description: "Latest Tamil news and updates"
};

export default function Home() {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homepage?populate=*`
        );
        
        if (res.ok) {
          const json = await res.json();
          setHomepageData(json.data);
        } else {
          setHomepageData(mockData);
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        setHomepageData(mockData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DynamicHomepage data={homepageData} />
  );
}
