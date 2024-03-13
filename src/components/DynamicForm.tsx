import React, { useState } from "react";

const DynamicForm = ({ fields }: any) => {
  const [formData, setFormData] = useState({});
  // console.log("fields", fields);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you can handle the submission of the form data
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(fields).map((field: any, index: any) => {
        // console.log("field", field);
        console.log(Object.entries(fields));

        if (field.type === "text" || field.type === "number") {
          return (
            <div key={index}>
              <label>{field[1]}</label>
              <input
                type={field[1]}
                id={field[1]}
                name={field[1]}
                onChange={handleChange}
              />
            </div>
          );
        } else if (field[1] === "select") {
          return (
            <div key={field.name}>
              <label>{field.label}</label>
              <select name={field.name}>
                {field.options.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        }
        {
          /* Add more conditions for different field types */
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

const CreateFrom = ({ addData }: any) => {
  const [form, setForm] = useState<any>({
    name: "",
    label: "",
    type: "text",
    options: [],
  });
  const [currentOption, setCurrentOption] = useState<any>("");

  return (
    <div>
      <label>name</label>
      <input
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        name="name"
        type="text"
        value={form.name}
      />
      <label>label</label>
      <input
        onChange={(e) => setForm({ ...form, label: e.target.value })}
        name="label"
        type="text"
        value={form.label}
      />
      <label>type</label>
      <select
        name="type"
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        value={form.type}
      >
        <option value="text">text</option>
        <option value="number">number</option>
        <option value="select">select</option>
      </select>
      {form.type === "select" && (
        <div>
          <label>options</label>
          <input
            onChange={(e) => setCurrentOption(e.target.value)}
            name="options"
            type="text"
            value={currentOption}
          />
          <button
            onClick={() => {
              setForm({ ...form, options: [...form.options, currentOption] });
              setCurrentOption("");
            }}
          >
            add option
          </button>
          <ul>
            {form.options.map((option: any, index: any) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => {
          console.log("form", form);

          addData(form);
          setForm({ name: "", label: "", type: "text", options: [] });
        }}
      >
        add
      </button>
    </div>
  );
};

// Example usage
const App1 = () => {
  const [data, setData] = useState<any>([]);

  const addData = (formData: any) => {
    setData(formData);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CreateFrom addData={addData} />
      <h1>Dynamic Form Example</h1>
      <br />
      <DynamicForm fields={data} />
    </div>
  );
};

export default App1;
