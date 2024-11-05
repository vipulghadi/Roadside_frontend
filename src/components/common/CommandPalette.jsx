
import { Command,CommandList,CommandInput,CommandEmpty,CommandGroup,CommandItem,CommandSeparator } from '../ui/command';
const CommandPalette = () => {
  return (
    <Command  className="p-3 border">
      <CommandInput placeholder="Serach any Food Item." />
      <CommandList>
        {/* Displayed if no results are found */}
        <CommandEmpty>No results found.</CommandEmpty>

        
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          
        </CommandGroup>

    
    
      </CommandList>
    </Command>
  );
};

export default CommandPalette;
