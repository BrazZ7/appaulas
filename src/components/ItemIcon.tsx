import { Newspaper, Box, Milk, FlaskConical, Cylinder, Amphora, Banana, Coffee, Scroll, Baby, Sun, ArrowUp, Cloud, CloudRain, Sprout, Waves, NotebookPen, List, Pencil, BookOpen, Eraser, Megaphone } from 'lucide-react';
const icons = {r1:Newspaper,r2:Box,r3:Milk,r4:FlaskConical,r5:Cylinder,r6:Amphora,r7:Banana,r8:Coffee,r9:Scroll,r10:Baby,a1:Sun,a2:ArrowUp,a3:Cloud,a4:CloudRain,a5:Sprout,a6:Waves,e1:NotebookPen,e2:List,e3:Pencil,e4:BookOpen,e5:Eraser,e6:Megaphone};
export function ItemIcon({id}:{id:string}) {
  const Icon=icons[id as keyof typeof icons];
  return Icon ? <Icon aria-hidden="true" className="item-art" size={28}/> : null;
}
