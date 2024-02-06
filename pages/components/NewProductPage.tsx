import Style from "@/styles/Newproduct.module.css";
import Info from "@/public/icons8-info-48 (1).png";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Button,
  Card,
  Label,
  TextInput,
  Select,
  Textarea,
} from "flowbite-react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import Delete from "@/public/icons8-delete-64.png";
import { number, string, z, ZodType } from "zod";
type ProductValue = {
  Product: {
    ProductName: string;
    Select_lang: string;
    Brand: string;
    Price: number;
    Description: string;
  }[];
};
const sigma: ZodType<ProductValue> = z.object({
  Product: z.array(
    z.object({
      ProductName: string().min(1, { message: "productname is required" }),
      Select_lang: string().min(1, { message: "select language is required" }),
      Brand: string().min(1, { message: "brand is required" }),
      Price: number({ invalid_type_error: "Price Required" }).min(1, {
        message: "price is required",
      }),
      Description: string().min(10, { message: "min 10 character required" }),
    })
  ),
});
export default function NeWProductPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    reset,
  } = useForm<ProductValue>({ resolver: zodResolver(sigma) });
  const { fields, append, remove } = useFieldArray({
    name: "Product",
    control,
  });
  const onSubmit = (data: ProductValue) => console.log(data);
  const reset1 = (index: number) => {
    resetField(`Product.${index}.ProductName`);
    resetField(`Product.${index}.Select_lang`);
    resetField(`Product.${index}.Brand`);
    resetField(`Product.${index}.Price`);
    resetField(`Product.${index}.Description`);
  };
  return (
    <>
      <div className={Style.main}>
        <div className={Style.formInput1}>
          <Button
            color="blue"
            onClick={() =>
              append({
                ProductName: "",
                Select_lang: "",
                Brand: "",
                Price: 0,
                Description: "",
              })
            }
          >
            Add Product
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div className={Style.form} key={field.id}>
              <div className={Style.formInput}>
                <div className={Style.formInputdiv}>
                  <div className={Style.inputtext}>
                    <Label htmlFor="ProductName" value="ProductName" />
                  </div>
                  <TextInput
                    id="ProductName"
                    className={Style.input1}
                    type="text"
                    {...register(`Product.${index}.ProductName`)}
                    helperText={
                      <>
                        <span
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            color: "#DC2626",
                          }}
                        >
                          {errors.Product?.[index]?.ProductName?.message}
                        </span>
                      </>
                    }
                  />
                </div>
                <div className={Style.formInputdiv}>
                  <div className={Style.inputtext}>
                    <Label htmlFor="SelectLanguage" value="Select Language" />
                    <Image src={Info} alt="vb" className={Style.imga} />
                  </div>
                  <Select
                    className={Style.input1}
                    id="SelectLanguage"
                    {...register(`Product.${index}.Select_lang`)}
                    helperText={
                      <>
                        <span
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            color: "#DC2626",
                          }}
                        >
                          {errors.Product?.[index]?.Select_lang?.message}
                        </span>
                      </>
                    }
                  >
                    <option></option>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Odia</option>
                    <option>Telugu</option>
                  </Select>
                </div>
              </div>
              <div className={Style.formInput}>
                <div className={Style.formInputdiv}>
                  <div className={Style.inputtext}>
                    <Label htmlFor="Brand" value="Brand" />
                  </div>
                  <TextInput
                    id="Brand"
                    className={Style.input1}
                    type="text"
                    {...register(`Product.${index}.Brand`)}
                    helperText={
                      <>
                        <span
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            color: "#DC2626",
                          }}
                        >{errors.Product?.[index]?.Brand?.message}</span>
                      </>
                    }
                  />
                </div>
                <div className={Style.formInputdiv}>
                  <div className={Style.inputtext}>
                    <Label htmlFor="Price" value="Price" />
                  </div>
                  <TextInput
                    id="Price"
                    type="number"
                    className={Style.input1}
                    {...register(`Product.${index}.Price`, {
                      valueAsNumber: true,
                    })}
                    helperText={
                      <>
                        <span
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            color: "#DC2626",
                          }}
                        >{errors.Product?.[index]?.Price?.message}</span>
                      </>
                    }
                  />
                </div>
              </div>
              <div className={Style.description}>
                <div className={Style.descriptiontext}>
                  <Label htmlFor="comment" value="Description" />
                </div>
                <Textarea
                  id="comment"
                  placeholder="Leave a comment..."
                  rows={4}
                  {...register(`Product.${index}.Description`)}
                  className={Style.desinp}
                  helperText={
                    <>
                      <span
                        style={{
                          marginTop: "0.5rem",
                          fontSize: "0.875rem",
                          lineHeight: "1.25rem",
                          color: "#DC2626",
                        }}
                      >{errors.Product?.[index]?.Description?.message}</span>
                    </>
                  }
                />
              </div>
              <div className={Style.buttondiv}>
                <Button color="failure" onClick={() => remove(index)}>
                  <Image className={Style.delete} src={Delete} alt="" /> Delete
                </Button>
                <Button color="warning" onClick={() => reset1(index)}>
                  Reset
                </Button>
                <Button
                  color="blue"
                  onClick={() =>
                    append({
                      ProductName: "",
                      Select_lang: "",
                      Brand: "",
                      Price: 0,
                      Description: "",
                    })
                  }
                >
                  Add more Product
                </Button>
              </div>
            </div>
          ))}
          <div className={Style.formInput}>
            <Button type="submit">Submit</Button>
            <Button color="warning" onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
