import Image from "next/image";

interface HeaderProps {
  title: string;
  label: string;
}

export const Header = ({ title, label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col gap-y-4">
      <Image src="/assets/logo.svg" alt="Logo" width={25} height={25} />

      <div className="flex flex-col gap-y-1">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};
