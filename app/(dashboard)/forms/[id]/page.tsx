import { getFormById } from "@/actions/form";
import { StatsCard } from "@/app/page";
import FormBuilder from "@/components/FormBuilder";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import React from "react";
import { LiaPercentageSolid } from "react-icons/lia";
import { LuView } from "react-icons/lu";
import { RiFileTransferFill } from "react-icons/ri";

async function FormDetails({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await getFormById(Number(id));
  if (!form) {
    throw new Error("Form not found!");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex items-center justify-between mx-10">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="w-full pt-8 gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-center">
        <StatsCard
          title="Total Visits"
          icon={<LuView className="text-blue-600" />}
          helperText="All time form visits"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-blue-600 w-[300px] xl:w-[350px]"
        />
        <StatsCard
          title="Total Submission"
          icon={<RiFileTransferFill className="text-green-600" />}
          helperText="All time form visits"
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-green-600 w-[300px] xl:w-[350px]"
        />
        <StatsCard
          title="Total Submission Rate"
          icon={<LiaPercentageSolid className="text-yellow-600" />}
          helperText="All time form visits"
          value={submissionRate.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-yellow-600 w-[300px] xl:w-[350px]"
        />
      </div>
      <div className="pt-10 mx-10">
        <SubmissionTable id={form.id} />
      </div>
    </>
  );
}

export default FormDetails;

function SubmissionTable({ id }: { id: number }) {
  return (
    <>
      <div className="text-2xl font-bold my-4">Submissions</div>
    </>
  );
}
