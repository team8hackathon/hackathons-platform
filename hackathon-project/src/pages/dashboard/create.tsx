import { useState, type ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";
import InputRounded from "@/components/ui/InputRounded";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import InputRadioGroup from "@/components/ui/InputRadioGroup";
import Button from "@/components/ui/Button";

const academies = [
  {
    title: "Graphic design academy",
    value: "graphicDesign",
  },
  {
    title: "UX/UI Design academy",
    value: "uxUiDesign",
  },
  {
    title: "Marketing academy",
    value: "marketing",
  },
  {
    title: "Front-end academy",
    value: "frontEnd",
  },
  {
    title: "QA academy",
    value: "qualityAssurance",
  },
  {
    title: "Full-stack academy",
    value: "fullStack",
  },
  {
    title: "Product management academy",
    value: "productManagement",
  },
];

type HackathonFormData = {
  title: string;
  application_deadline: string;
  start_date: string;
  end_date: string;
  hackathonType: string;
  description: string;
  academies: string[];
};

const DashboardCreate: NextPageWithLayout = () => {
  const [selectedAcademies, setSelectedAcademies] = useState<string[]>([]);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<HackathonFormData>();

  const onSubmit: SubmitHandler<HackathonFormData> = (data) => {
    console.log(data);
  };

  function toggleAcademy(academy: string) {
    if (selectedAcademies.includes(academy)) {
      const filteredAcadamies = selectedAcademies.filter((academyFiltered) => academy !== academyFiltered);

      setSelectedAcademies(filteredAcadamies);
    } else {
      setSelectedAcademies((prevSelectedAcadamies) => [...prevSelectedAcadamies, academy]);
    }
  }

  function toggleAcademies(academy: string) {
    if (selectedAcademies.includes(academy)) {
      const filteredAcadamies = selectedAcademies.filter((academyFiltered) => academy !== academyFiltered);

      return filteredAcadamies;
    }

    return [...selectedAcademies, academy];
  }

  return (
    <>
      <Head>
        <title>Dashboard - Create</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto flex w-11/12 max-w-4xl flex-col items-center gap-10 py-10 lg:py-20">
        <div className="flex flex-col items-center gap-4">
          <p className="text-3xl font-bold lg:text-4xl">Create a new hackathon</p>
          <p className="text-lg">Create an extraordinary hackathon experience with our creation page. Customize challenges, formats, and settings to inspire innovation and collaboration. Unleash your creativity and shape a remarkable event that cultivates talent. Get started today!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
          <div className="flex w-7/12 flex-col gap-4 pr-10">
            <div className="flex flex-col gap-1">
              <p className="font-bold">Name</p>
              <InputRounded intent={errors.title ? "error" : "primary"} {...register("title", { required: true })} withIcon={false} errorMessage="Enter a name for the event" id="nameInput" type="text" placeholder="Name of the event">
                Name
              </InputRounded>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-bold">Date</p>

              <div className="flex flex-col gap-2">
                <InputRounded intent={errors.application_deadline ? "error" : "primary"} {...register("application_deadline", { required: true })} withIcon={false} errorMessage="Enter a date for the deadline" id="deadlineInput" type="date" placeholder="Deadline for application">
                  Deadline for application
                </InputRounded>

                <InputRounded intent={errors.start_date ? "error" : "primary"} {...register("start_date", { required: true })} withIcon={false} errorMessage="Enter a date for the start of the hackathon" id="startDateInput" type="date" placeholder="Start of hackathon">
                  Start of hackathon
                </InputRounded>

                <InputRounded intent={errors.end_date ? "error" : "primary"} {...register("end_date", { required: true })} withIcon={false} errorMessage="Enter a date for the end of the hackathon" id="endDateInput" type="date" placeholder="End of hackathon">
                  End of hackathon
                </InputRounded>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold">Hackathon type</p>
              <Controller
                control={control}
                defaultValue={""}
                name="hackathonType"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputRadioGroup
                    fieldValue={value}
                    onChangeController={onChange}
                    intent={errors.hackathonType ? "error" : "primary"}
                    errorMessage="Select a hackathon type"
                    radioGroupOptions={[
                      { title: "Live", value: "live" },
                      { title: "Online", value: "online" },
                    ]}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-bold">Information about the event/client</label>
              <textarea {...register("description", { required: true })} id="informationClientInput" cols={10} rows={10} className={`resize-none rounded-lg border p-4 shadow-lg focus:outline-none focus:ring-1 ${errors.description ? "border-error-500 focus:border-error-500 focus:ring-error-500" : "focus:border-primary-100 focus:ring-primary"}`}></textarea>
              <div>{errors.description && <span className="font-medium text-red-500">Enter information about the event/client</span>}</div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-bold">Upload resources from the client (if provided)</p>
              <input type="file" />
            </div>
          </div>

          <div className="flex w-5/12 flex-col justify-between border-l-2 border-primary-50 pl-10">
            <div className="flex flex-col justify-between gap-3">
              <p className="font-bold">Select academies</p>

              <Controller
                name="academies"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <div className="flex flex-col gap-10">
                      {academies.map((academy) => (
                        <button
                          type="button"
                          onClick={() => {
                            toggleAcademy(academy.value);
                            onChange(toggleAcademies(academy.value));
                          }}
                          key={academy.value}
                          className={`flex w-full cursor-pointer justify-center rounded-lg p-3 shadow-lg transition-colors hover:bg-primary hover:text-white ${selectedAcademies.includes(academy.value) ? "bg-primary text-white" : errors.academies ? "bg-red-500 text-white" : "bg-white"}`}
                        >
                          {academy.title}
                        </button>
                      ))}
                    </div>
                  );
                }}
              />
            </div>

            <Button>Confirm</Button>
          </div>
        </form>
      </div>
    </>
  );
};

DashboardCreate.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardCreate;
