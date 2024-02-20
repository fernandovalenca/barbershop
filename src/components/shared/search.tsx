'use client';

import { SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  search: z
    .string({
      required_error: 'O campo de busca é obrigatório',
    })
    .trim()
    .min(2, 'A busca deve conter ao menos 2 caractere'),
});

export default function Search() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`barbershops?search=${values.search}`);
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center gap-2 w-full mb-4"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="">
                  <Input
                    className=""
                    placeholder="Busque por uma barbearia..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute font-normal" />
              </FormItem>
            )}
          />
          <Button type="submit">
            <SearchIcon size={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
}
