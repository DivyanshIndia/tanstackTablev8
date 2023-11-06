"use client";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Form.module.css";
import axios from "axios";

const BASE_URL =
  "https://fromandtable-default-rtdb.firebaseio.com/details.json";

const Form = ({ table, show }) => {
  const meta = table.options.meta;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const send = {
      name: data.name,
      email: data.email,
      address: data.address,
    };
    meta.addRow(send.name, send.email, send.address);

    axios.post(BASE_URL, JSON.stringify(send));
    reset();
    show(false);
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true, minLength: 3, maxLength: 20 })}
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input type="text" placeholder="Address" {...register("address")} />
        <input type="submit" value="Add data" />
        <input type="submit" value="Cancel" onClick={() => show(false)} />
      </form>
      <div className={styles.errors}>
        <small>{errors.name && "Your good name please"}</small>
        <small>{errors.email && "Please provide a valid email"}</small>
      </div>
    </div>
  );
};

export default Form;
