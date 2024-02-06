import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import redde from "@/public/icons8-delete-16.png"
import { z,ZodType } from "zod";
  type  Validation ={
  Product_Name:string;
  Select_lang:string;
  Brand:string;
  Price:number;
  Item_Weight:number;
  Lenght:number;
  Breadth:number;
  Width:number;
  Description:string;
  checkboxValues: string[];
  file:FileList;
  };
import {
  Label,
  TextInput,
  Select,
  Textarea,
  Checkbox,
  FileInput,
  Button,
} from "flowbite-react";
import Delete from "@/public/icons8-delete-64.png"
import Cross from "@/public/icons8-cross-50.png"
import Info from "@/public/icons8-info-48 (1).png"
import Style from "@/styles/product.module.css";
import Image from "next/image";
import { Updock } from "next/font/google";
import { File } from "buffer";

const ValidationSchema: ZodType<Validation> = z.object({
  Product_Name: z.string().min(1, { message: "Product name is required" }),
  Select_lang:z.string().min(1,{message:"select lang are required"}),
  Brand: z.string().min(1, { message: "Brand name is required" }),
  Price: z.number({invalid_type_error: "Price Required"}).min(2, { message: "Price is required" }),
  Item_Weight: z.number({invalid_type_error: "Weight required"}).min(2, { message: "Item weight is required" }),
  Lenght: z.number({invalid_type_error: "Length is required"}).min(2, { message: "Length is required" }),
  Breadth: z.number({invalid_type_error: "breadth required"}).min(2, { message: "Breadth is required" }),
  Width: z.number({invalid_type_error: "width is required"}).min(2, { message: "Width is required" }),
  Description: z.string().min(10, { message: "Description is required (min 10 characters)" }),
  checkboxValues: z.array(z.string(),{invalid_type_error: "Please select at least one checkbox."}).refine(
    data => data.length>0,
    { message: 'Please select at least one checkbox.' }
  ),
  file: z.custom<FileList>().refine(
    (fileList:any)=>fileList.length>0,
    {message:"file is required"},
  ),
});

export default function product() {
  const[FileList,setFileList]=useState([]);
  const onFileDrop= (e:any):void=>{
    e.preventDefault();
   const newfile=e.target.files[0];
   if(newfile){
    const UpadateList:any = [...FileList, newfile];
    setFileList(UpadateList);
    setValue('file', UpadateList);
    console.log(UpadateList);
   }
  }
  const ondropfile=(e:any):void=>{
    e.preventDefault();
    const newfile=e.dataTransfer.files[0];
    if(newfile){
      const UpadateList :any= [...FileList, newfile];
      setFileList(UpadateList);
      setValue('file', UpadateList);
      console.log(UpadateList);
     }
  }
  const onDragfiles = (e:any)=>{
    e.preventDefault();
  }
const {register , handleSubmit ,formState: { errors },setValue,}=useForm<Validation>({resolver: zodResolver(ValidationSchema),});
const submitData:SubmitHandler<Validation> = (data:Validation)=>{
  console.log("its worked" , data);
}
const remove1 = (index:number)=>{
 const upadtelist:any = FileList.filter((item,id:number)=>{
    return index!==id;
  })
  setValue('file', upadtelist);
  setFileList(upadtelist);
}

  return (
    <>
      <div className={Style.main}>
        <div className={Style.heading}>
          <h1 className={Style.headingtext} >Add Product</h1>
        </div>
        <form className={Style.form} onSubmit={handleSubmit(submitData)} >
          <div className={Style.formInput} >
            <div className={Style.formInputdiv}>
              <div className={Style.inputtext}>
                <Label htmlFor="ProductName" value="ProductName"/>
              </div>
              <TextInput id="ProductName" className={Style.input1} type="text" {...register("Product_Name")}
                    helperText={
                      <>
                      <span style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}>{errors.Product_Name?.message}</span>
                      </>
                   }
              />
            </div>
            <div className={Style.formInputdiv} >
              <div className={Style.inputtext} >
                <Label htmlFor="SelectLanguage"  value="Select Language" />
                <Image src={Info} alt="vb" className={Style.imga} />
             </div>
              <Select className={Style.input1} id="SelectLanguage" {...register("Select_lang")}
               helperText={
                <>
                <span style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}>{errors.Select_lang?.message}</span>
                </>
             }
              >
                <option></option>
                <option>Electronics</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
            </div>
          </div>
          <div className={Style.formInput} >
            <div className={Style.formInputdiv} >
              <div className={Style.inputtext}>
                <Label htmlFor="Brand" value="Brand" />
              </div>
              <TextInput id="Brand" className={Style.input1} {...register("Brand")} type="text"
               helperText={
                <>
                <span style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}>{errors.Brand?.message}</span>
                </>
             }
              /> 
            </div>
            <div className={Style.formInputdiv}>
              <div  className={Style.inputtext} >
                <Label htmlFor="Price" value="Price"  />
              </div>
              <TextInput id="Price" type="number" {...register("Price",{valueAsNumber:true,},)} className={Style.input1} 
               helperText={
                <>
                <span style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}>{errors.Price?.message}</span>
                </>
             }
              />
            </div>
          </div>
          <div className={Style.formInput} >
            <div className={Style.smallinput} >
              <div className={Style.smallinputtext} >
                <Label htmlFor="ItemWeight" value="Item Weight (kg)" />
              </div>
              <TextInput id="ItemWeight" type="number" {...register("Item_Weight",{valueAsNumber:true,},)}  className={Style.smallinput1} 
                helperText={
                  <>
                  <span style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}>{errors.Item_Weight?.message}</span>
                  </>
               }
              /> 
            </div>
            <div className={Style.smallinput} >
              <div className={Style.smallinputtext}>
                <Label htmlFor="Lenght" value="Lenght(cm)" />
              </div>
              <TextInput id="Lenght"  type="number" {...register("Lenght",{valueAsNumber:true,},)} className={Style.smallinput1} 
               helperText={
                <>
                <span style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}>{errors.Lenght?.message}</span>
                </>
             }
              /> 
            </div>
            <div className={Style.smallinput} >
              <div className={Style.smallinputtext}>
                <Label htmlFor="Breadth" value="Breadth(cm)" />
              </div>
              <TextInput  id="Breadth" type="number" {...register("Breadth",{valueAsNumber:true,},)} className={Style.smallinput1} 
                 helperText={
                  <>
                  <span style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}>{errors.Breadth?.message}</span>
                  </>
               }
              /> 
            </div>
            <div className={Style.smallinput} >
              <div className={Style.smallinputtext}>
                <Label htmlFor="Width"  value="Width(cm)"  />
              </div>
              <TextInput id="Width"  type="number" {...register("Width",{valueAsNumber:true,},)}  className={Style.smallinput1} 
               helperText={
                <>
                <span style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}>{errors.Width?.message}</span>
                </>
             }
             /> 
            </div>
          </div>
          <div className={Style.description} >
              <div className={Style.descriptiontext} >
                <Label htmlFor="comment" value="Description" />
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                rows={6}
                className={Style.desinp}
                {...register("Description")}
                helperText={
                  <>
                  <span style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}>{errors.Description?.message}</span>
                  </>
               }
              /> 
          </div>
      <div className={Style.cheak} >
        <h4 className={Style.cheakinp} >Selling Type</h4>
        <div className={Style.cheakitems} >
        <div className={Style.cheakitem}>
          <Checkbox id="In_store_only" value="In-store only" {...register('checkboxValues')} />
          <Label htmlFor="In_store_only">In-store only</Label>
        </div>
        <div className={Style.cheakitem} >
          <Checkbox id="Online_selling_only"  {...register('checkboxValues')} value="Online selling only" />
          <Label htmlFor="Online_selling_only">Online selling only</Label>
        </div>
        <div className={Style.cheakitem}>
          <Checkbox id="Both_in_store_and_online" value="Both in-store and onlin" {...register('checkboxValues')} />
          <Label htmlFor="Both_in_store_and_online">Both in-store and online</Label>
        </div>
        </div>
        {errors.checkboxValues&&(<p style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}><span style={{"fontWeight":500}}>Oops!</span>{errors.checkboxValues.message}</p>)} 
      </div>
      <div className={Style.dfg}>
      <h1 className={Style.productImage}>Product Images</h1>
        <div className={Style.productdiv}>
          {FileList?(
            FileList.map(
              (item:any , index:number)=>{
                return(
                  <div key={index} className={Style.arrimg}>
                  <img src={URL.createObjectURL(item)} className={Style.arrimg1} alt="mainimage" />
                  <Image src={redde} onClick={()=>remove1(index)} className={Style.tash} alt="tash"/>
                  </div>
                )
              }
            )
          ):""}
        </div>
        </div>
      <div className={Style.Dropdiv} >
        <Label
          htmlFor="dropzone-file"
          className={Style.Dropzone}
        >
          <div className={Style.Dropdiv} onDrop={ondropfile} onDragOver={onDragfiles} >
            <svg
              className={Style.Dropdiv1}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                //   strokeLineJoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className={Style.p}>
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className={Style.p1}>
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <FileInput id="dropzone-file"  className="hidden" accept=".svg, .png, .jpg, .jpeg, .gif" {...register("file")} onChange={onFileDrop} />
        </Label>
        {errors.file&&(<p style={{"marginTop":"0.5rem","fontSize":"0.875rem","lineHeight":"1.25rem","color":"#DC2626"}}>{errors.file.message}</p>)}
      </div>
      <div className={Style.buttondiv} >
        <Button type="submit"  className={Style.button1} color="blue">Upadate Product</Button>
        <Button color="failure" className={Style.button1} ><Image className={Style.delete} src={Delete} alt=""/> Delete</Button>
      </div>
      </form>
      </div>
    </>
  );
}
