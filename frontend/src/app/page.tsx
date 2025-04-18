'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Vote, Voter } from '../../types';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  voterId: z.string().min(1, 'Campo requerido'),
  candidateId: z.string().min(1, 'Selecciona un candidato'),
});

export default function HomePage() {
  const [candidates, setCandidates] = useState<Voter[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    axios.get('http://localhost:4000/candidates').then((res) => {
      setCandidates(res.data);
    });
  }, []);

  const onSubmit = async (data: Vote) => {
    try {
      await axios.post('http://localhost:4000/vote', {
        voterId: data.voterId,
        candidateId: data.candidateId,
      });
      setMessage({ type: 'success', text: '✅ Voto registrado correctamente' });
    } catch (error) {
      const errorMessage =
        (error as { message: string })?.message || '❌ Error inesperado';
      setMessage({ type: 'error', text: errorMessage });
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Votación</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="voterId">Cédula de Identidad</Label>
              <Input id="voterId" {...register('voterId')} />
              {errors.voterId && (
                <p className="text-sm text-red-500">{errors.voterId.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="candidateId">Seleccionar candidato</Label>
              <Select onValueChange={(value) => setValue('candidateId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un candidato" />
                </SelectTrigger>
                <SelectContent>
                  {candidates.map((c) => (
                    <SelectItem key={c.document} value={c.document}>
                      {c.name} {c.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.candidateId && (
                <p className="text-sm text-red-500">{errors.candidateId.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Votar
            </Button>
          </form>

          {message && (
            <Alert variant={message.type === 'success' ? 'default' : 'destructive'} className="mt-4">
              <AlertTitle>{message.type === 'success' ? 'Éxito' : 'Error'}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <div className="pt-6 text-center">
            <a href="/admin/login" className="text-blue-600 underline text-sm">
              Acceder como administrador
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
