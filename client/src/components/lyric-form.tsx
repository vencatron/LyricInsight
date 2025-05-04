import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Search } from 'lucide-react';

const formSchema = z.object({
  lyric: z.string().min(5, {
    message: "Please enter a valid lyric (at least 5 characters).",
  }),
});

interface LyricFormProps {
  onSubmit: (lyric: string) => void;
  isLoading: boolean;
}

export default function LyricForm({ onSubmit, isLoading }: LyricFormProps) {
  const [showClearButton, setShowClearButton] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lyric: '',
    },
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.lyric);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowClearButton(e.target.value.length > 0);
  };

  const clearInput = () => {
    form.setValue('lyric', '');
    setShowClearButton(false);
  };

  return (
    <section className="mb-8 bg-white rounded-lg shadow-card p-5 md:p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="lyric"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-neutral-700">
                  Enter a Kendrick Lamar lyric
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="e.g. 'I remember you was conflicted, misusing your influence'"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                      className="w-full px-4 py-6 border border-neutral-200 focus:border-primary"
                    />
                  </FormControl>
                  {showClearButton && (
                    <button
                      type="button"
                      aria-label="Clear input"
                      onClick={clearInput}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center justify-between">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary font-medium rounded-md px-5 py-2.5 flex items-center"
            >
              <span>Decode Lyric</span>
              <Search className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-sm text-neutral-500 text-right">Powered by AI</p>
          </div>
        </form>
      </Form>
    </section>
  );
}
