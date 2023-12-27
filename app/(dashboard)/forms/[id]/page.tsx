import { GetFromWithSubmissions, getFormById } from "@/actions/form";
import { StatsCard } from "@/app/page";
import FormBuilder from "@/components/FormBuilder";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import React, { ReactNode } from "react";
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

type Row = { [key: string]: string } & {
  createdAt: Date;
};

async function SubmissionTable({ id }: { id: number }) {
  const form = await GetFromWithSubmissions(id);
  if (!form) {
    throw new Error("Form not found");
  }
  const formElements = JSON.parse(form?.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    require: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          require: element.extraAttributes?.require,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({ ...content, createdAt: submission.createdAt });
  });

  return (
    <>
      <div className="text-2xl font-bold my-4">Submissions</div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.createdAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;
  return <TableCell>{node}</TableCell>;
}
