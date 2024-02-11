'use-client';

import { SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Search() {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder='Busque por uma barbearia...' />
      <Button>
        <SearchIcon size={18} />
      </Button>
    </div>
  );
}
