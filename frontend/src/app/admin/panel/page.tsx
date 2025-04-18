'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface Result {
  name: string;
  votes: number;
}

export default function AdminPanelPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    axios
      .get('http://localhost:4000/results', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          router.push('/admin/login');
        } else {
          setError('Error al cargar los resultados');
        }
      });
  }, [router]);

  return (
    <div className="flex justify-center mt-20 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Resultados de la votación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!error && results.length === 0 ? (
            <p>No hay resultados.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidato</TableHead>
                  <TableHead className="text-right">Votos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((r, index) => (
                  <TableRow key={index}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell className="text-right">{r.votes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
