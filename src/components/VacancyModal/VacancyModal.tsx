import React, { useEffect } from "react";
import classes from "./VacancyModal.module.scss";
import type { Vacancy, VacancyModalComponentProps } from "./VacancyModal.type";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

export const VacancyModal: React.FC<VacancyModalComponentProps> = ({
  isOpen,
  onClose,
  vacancy,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: "",
      position: "",
      salary: "",
      status: "",
      note: "",
    },
  });

  useEffect(() => {
    if (vacancy) {
      reset(vacancy);
    } else {
      reset({
        company: "",
        position: "",
        salary: "",
        status: "",
        note: "",
      });
    }
  }, [vacancy, reset]);

  const onSubmit = (data: Vacancy) => {
    console.log("Submitted data:", data);
    onSave(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={vacancy ? "Edit Vacancy" : "Add Vacancy"}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "8px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
      className={classes.container}
    >
      <h2>{vacancy ? "Edit Vacancy" : "Add Vacancy"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Company:</label>
          <input
            {...register("company", { required: "Company name is required" })}
          />
          {errors.company && <p>{errors.company.message}</p>}
        </div>
        <div>
          <label>Position:</label>
          <input
            {...register("position", { required: "Position is required" })}
          />
          {errors.position && <p>{errors.position.message}</p>}
        </div>
        <div>
          <label>Salary:</label>
          <input {...register("salary", { required: "Salary is required" })} />
          {errors.salary && <p>{errors.salary.message}</p>}
        </div>
        <div>
          <label>Status:</label>
          <select {...register("status", { required: "Status is required" })}>
            <option value="">Select status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && <p>{errors.status.message}</p>}
        </div>
        <div>
          <label>Note:</label>
          <textarea {...register("note")} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};
