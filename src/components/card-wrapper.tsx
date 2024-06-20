import { CardContent, Card, CardHeader, CardFooter } from "./ui/card";
import { Header } from "./header";
import Link from "next/link";
import { Social } from "./social";
import { BackButton } from "./back-btn";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial?: boolean;
  login?: boolean;
}

export const CardWrapper = ({
  children,
  backBtnHref,
  backBtnLabel,
  headerLabel,
  headerTitle,
  login,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card>
      <CardHeader>
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <div className="w-full">
            <p className="authorize mb-4 w-full text-xs text-muted-foreground">
              Or authorize with
            </p>

            <Social />
          </div>
        </CardFooter>
      )}

      <CardFooter className="flex flex-col items-start">
        {login && (
          <span className="">
            <Link className="active-link" href="/auth/reset">
              Forgot password
            </Link>
          </span>
        )}

        <BackButton href={backBtnHref} label={backBtnLabel} />
      </CardFooter>
    </Card>
  );
};
