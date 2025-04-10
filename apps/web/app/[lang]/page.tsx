'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Github, Settings, Zap, Star, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';
import { useDictionary } from '@/hooks/use-dictionary';
import { useParams } from 'next/navigation';
import Loading from '@/app/loading';
import { Dashboard } from '@/components/pages/dashboard/dashboard';

export default function Home() {
  const { lang } = useParams();
  const { dictionary } = useDictionary(lang as string);

  if (!dictionary) return <Loading />;

  return <Dashboard dictionary={dictionary} />;
}
