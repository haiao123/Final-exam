import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddBlogPage() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const saveBlog = async (data) => {
        const response = await fetch('/api/supplier/suppliers', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // serialisation
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
        const result = await response.json();   // deserialise
        if (result.error) {
            alert("Error: " + result.error)
        } else {
            alert("Supplier saved")
            window.location.href = "/supplier"
        }
        console.log(result)
        setData(JSON.stringify(data))
    }

    return (
        <div style={{ margin: '1rem' }}>
            <form onSubmit={handleSubmit(saveBlog)}>
                <h1>New supplier</h1>
                <label htmlFor="Name">Name</label><br />
                <input id="Name" {...register("Name", { required: true })} placeholder="Supplier Name" /><br />
                <label htmlFor="Address">Address</label><br />
                <input id="Address" {...register("Address", { required: true })} placeholder="Supplier Address" /><br />
                <label htmlFor="phone">phone</label><br />
                <input id="phone" {...register("phone", { required: true })} placeholder="Supplier Phone" /><br />
                <p>{data}</p><br />
            </form>
        </div>
    );
}