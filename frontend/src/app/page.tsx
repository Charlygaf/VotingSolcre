"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Vote, Voter } from "../../types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  voterId: z.string().min(1, "Campo requerido"),
  candidateId: z.string().min(1, "Selecciona un candidato"),
});

export default function HomePage() {
  const [candidates, setCandidates] = useState<Voter[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    axios.get("http://localhost:4000/candidates").then((res) => {
      setCandidates(res.data);
    });
  }, []);

  const onSubmit = async (data: Vote) => {
    try {
      await axios.post("http://localhost:4000/vote", {
        voterId: data.voterId,
        candidateId: data.candidateId,
      });

      toast(<div>
        <h1 className="text-lg font-bold">Voto enviado</h1>
        <p>Gracias por participar en la votación</p>
      </div>)
      setValue("candidateId", "");
      reset();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {const errorMessage = (() => {
        try {
          const parsed = JSON.parse(error.request.response);
          return parsed.message || "Error desconocido";
        } catch {
          return "Error desconocido";
        }
      })();
      
      toast(<div>
        <h1 className="text-lg font-bold">Error al enviar voto </h1>
        <p>{errorMessage}</p>
      </div> );
        console.error(error);
      }
      console.error(error);
      setValue("candidateId", "");
      reset();
    }
  };

  return (
    <div className="flex justify-center mt-20 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Votación</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="voterId" style={{ fontFamily: "Open Sans" }}>
                Cédula de Identidad
              </Label>
              <Input id="voterId" {...register("voterId")} />
              {errors.voterId && (
                <p className="text-sm text-red-500">{errors.voterId.message}</p>
              )}
            </div>

            <div className="space-y-1 w-full">
              <Label htmlFor="candidateId">Seleccionar candidato</Label>
              <Select
                value={watch("candidateId") || ""}
                onValueChange={(value) => setValue("candidateId", value)}
              >
                <SelectTrigger className="w-full">
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
                <p className="text-sm text-red-500">
                  {errors.candidateId.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Votar
            </Button>
          </form>

       
        </CardContent>
      </Card>
    </div>
  );
}
