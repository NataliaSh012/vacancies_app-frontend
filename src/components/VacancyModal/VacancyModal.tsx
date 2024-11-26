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
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      company: "",
      position: "",
      salary: "",
      status: "",
      note: "",
    },
    mode: "onChange",
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
    reset()
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={vacancy ? "Edit Vacancy" : "Add Vacancy"}
      overlayClassName={classes.overlay}
      className={classes.container}
    >
      <h2 className={classes.title}>
        {vacancy ? "Edit Vacancy" : "Add Vacancy"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form_field}>
          <label>Company:</label>
          <input
            {...register("company", { required: "Company name is required" })}
          />
          {errors.company && <p>{errors.company.message}</p>}
        </div>
        <div className={classes.form_field}>
          <label>Position:</label>
          <input
            {...register("position", { required: "Position is required" })}
          />
          {errors.position && <p>{errors.position.message}</p>}
        </div>
        <div className={classes.form_field}>
          <label>Salary:</label>
          <input {...register("salary", { required: "Salary is required" })} />
          {errors.salary && <p>{errors.salary.message}</p>}
        </div>
        <div className={classes.form_field}>
          <label>Status:</label>
          <select {...register("status", { required: "Status is required" })}>
            <option value="">Select status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && <p>{errors.status.message}</p>}
        </div>
        <div className={classes.form_field}>
          <label>Note:</label>
          <textarea {...register("note")} />
        </div>
        <div className={classes.actions}>
          <button type="submit" disabled={!isValid || isSubmitting}>
            Save
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
