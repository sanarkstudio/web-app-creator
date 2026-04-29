import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

const UnderConstructionModal = () => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader className="items-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Construction className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          <DialogTitle className="text-xl">Sitio en Construcción</DialogTitle>
          <DialogDescription className="text-base leading-relaxed pt-2">
            Estamos trabajando para ofrecerte la mejor experiencia.
            Pronto tendrás acceso completo a todos nuestros servicios.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Button onClick={() => setOpen(false)} className="w-full">
            Explorar de todos modos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnderConstructionModal;
