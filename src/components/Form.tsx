import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Form = () => {
  type Input = {
    username: string;
    email: string;
    password: string;
    items: { item: string }[];
  };

  const form = useForm<Input>({
    defaultValues: {
      username: "andani",
      email: "andani@gmail.com",
      items: [
        {
          item: "",
        },
      ],
    },
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors , isDirty, isSubmitSuccessful, isValid} = formState;
  // const {fields, append, remove} = useFieldArray({
  //   name: "items",
  //   control
  // })

  const onSubmit = (data: Input) => {
    console.log(data);

    if (isSubmitSuccessful) {
      reset();
    }
  };

  return (
    <>
      <div className="container w-[30%] mx-auto mt-10">
        <h2 className="text-3xl mb-5 text-white">User</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group mb-4">
            <label htmlFor="username " className="text-white">
              Username
            </label>
            <br />
            <input
              type="text"
              {...register("username", {
                required: "username is required",
              })}
            />
            <p className="text-red-500">{errors.username?.message}</p>
          </div>
          <div className="form-group  mb-4">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <br />
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid pattern ",
                },
              })}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="form-group  mb-4">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <br />
            <input
              type="text"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          {/* <div className="">{
            fields.map((field, i) => {
              return <div className="form-group" key={field.id}>
                <input type="text" {...register(`items.${i}` )} />
                {
                  i > 0 && (
                    <button type="button" onClick={()=> remove(i)}>remove</button>
                  )
                }
              </div>
            })
          }</div>
          <button type="button" onClick={()=> append({item : ""})}>Add</button> */}
          <input type="submit" disabled={!isDirty || !isValid} className="bg-white" />
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};

export default Form;
