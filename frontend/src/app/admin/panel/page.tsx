import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Result {
  name: string;
  votes: number;
}

export default async function AdminPanelPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("admin-token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  let results: Result[] = [];
  const error = "";

  try {
    const res = await fetch("http://localhost:4000/results", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // para evitar cache si usás SSR
    });

    if (!res.ok) {
      throw new Error("Falló la carga");
    }

    results = await res.json();
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = (() => {
        try {
          const parsed = JSON.parse(error.request.response);
          return parsed.message || "Error desconocido";
          toast.error(parsed.message || "Error desconocido");
        } catch {
          return "Error desconocido";
        }
      })();
      error = errorMessage;
    }
    error = "Error al cargar los resultados";
  }

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
