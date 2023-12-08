// import { GetFormStats } from "@/actions/form";
import CreateFormButton from "@/components/CreateFormButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { RiFileTransferFill } from "react-icons/ri";
import { LiaPercentageSolid } from "react-icons/lia";

export default async function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2'">Your Builds</h2>
      <Separator className="my-6" />
      <CreateFormButton />
    </div>
  );
}

async function CardStatsWrapper() {
  // const stats = await GetFormStats();
  return (
    <StatsCards
      loading={false}
      data={{ visits: 0, submissions: 0, submissionRate: 0 }}
    />
  );
}

interface StatsCardsProps {
  // data?: Awaited<ReturnType<typeof GetFormStats>>;
  data?: any;
  loading: boolean;
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Visits"
        icon={<LuView className="text-blue-600" />}
        helperText="All time form visits"
        // value={data?.visits.toLocalString() || ""}
        value={""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total Submission"
        icon={<RiFileTransferFill className="text-green-600" />}
        helperText="All time form visits"
        // value={data?.visits.toLocalString() || ""}
        value={""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Total Submission Rate"
        icon={<LiaPercentageSolid className="text-yellow-600" />}
        helperText="All time form visits"
        // value={data?.visits.toLocalString() || ""}
        value={""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
    </div>
  );
}

function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: {
  title: string;
  icon: ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  className: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}
