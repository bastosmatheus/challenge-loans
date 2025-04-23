import { z } from 'zod';
import { states } from 'src/utils/states';

export const verifyPossibleLoansSchema = z.object({
  name: z.string(),
  age: z.number().min(1, { message: 'Informe uma idade válida' }),
  location: z
    .string()
    .refine((value: string) => states.includes(value.toUpperCase()), {
      message:
        'Estado inválido, use uma sigla de estado brasileiro válida. EX: SP, RJ',
    }),
  income: z.number().min(1, { message: 'Informe um salário válido' }),
  cpf: z.string().length(14, {
    message: 'O CPF deve ter 14 digitos (incluindo ponto (.) e hífen (-))',
  }),
});

export type VerifyPossibleLoansDto = z.infer<typeof verifyPossibleLoansSchema>;
