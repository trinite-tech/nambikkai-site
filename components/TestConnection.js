// Test Strapi connection
import { useEffect, useState } from 'react';
import { getArticles, getCategories } from '../lib/strapi';

export default function TestConnection() {
  const [status, setStatus] = useState('Testing...');
  
  useEffect(() => {
    async function testAPI() {
      try {
        const articles = await getArticles(1);
        const categories = await getCategories();
        
        if (articles.data || categories.data) {
          setStatus('✅ Connected to Strapi CMS');
        } else {
          setStatus('❌ No data received');
        }
      } catch (error) {
        setStatus(`❌ Connection failed: ${error.message}`);
      }
    }
    
    testAPI();
  }, []);
  
  return <div>{status}</div>;
}